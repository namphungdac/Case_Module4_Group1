
// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAKEYYWbmZjoTrJLGVOsGFD2-J9OgL1cjw",
    authDomain: "retaurent-b9061.firebaseapp.com",
    projectId: "retaurent-b9061",
    storageBucket: "retaurent-b9061.appspot.com",
    messagingSenderId: "14912348705",
    appId: "1:14912348705:web:af8146fe29ce9bf9d53960",
    measurementId: "G-Q5XVQN2HNK"
};
firebase.initializeApp(firebaseConfig);



function uploadImage(e) {
    let fbBucketName = 'images';
    let uploader = document.getElementById('uploader');
    let files = e.target.files;  
    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        let storageRef = firebase.storage().ref(`${fbBucketName}/${file.name}`);
        let uploadTask = storageRef.put(file);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            function (snapshot) {
                console.log(snapshot);
                uploader.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED:
                        break;
                    case firebase.storage.TaskState.RUNNING:
                        break;
                }
            }, function (error) {
                switch (error.code) {
                    case 'storage/unauthorized':
                        break;
                    case 'storage/canceled':
                        break;
                    case 'storage/unknown':
                        break;
                }
            }, async function () {
                let downloadURL = await uploadTask.snapshot.downloadURL;
                console.log(downloadURL);
                let imgDiv = document.getElementById('imgDiv');
                let imgElement = document.createElement('img');
                imgElement.setAttribute('height', '200px');
                imgElement.setAttribute('width', '200px');
                imgElement.setAttribute('src', downloadURL);
                imgDiv.appendChild(imgElement);
                let imageInput = document.getElementById('image');
                imageInput.value += downloadURL + ";"; check();
            });
    }
}
