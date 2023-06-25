function submitForm() {
    document.getElementById("formSize").submit();
  }

function deleteItem(idItem, nameItem) {
    let deleteModal = document.getElementById('deleteModal');
    let confirmDeleteButton = document.getElementById('confirmDelete');
    let cancelDeleteButton = document.getElementById('cancelDelete');

    deleteModal.style.display = 'block';
    confirmDeleteButton.addEventListener('click', () => {
        const origin = location.origin;
        $.ajax({
            url: `${origin}/admin/delete${nameItem}/${idItem}`,
            method: 'GET',
            success: function (response) {
                $(`#${nameItem}-${idItem}`).remove();
                location.reload();
            }
        })
    });

    cancelDeleteButton.addEventListener('click', () => {
        deleteModal.style.display = 'none';
    });
}

function changeStatus(idItem) {
    let status = document.getElementById(`status-${idItem}`).value;
    const origin = location.origin;
    $.ajax({
        url: `${origin}/admin/changeStatus/${idItem}`,
        method: 'POST',
        data: {status: status},
        success: function (response) {
            $(`#status-${idItem}`).value = status;
        }
    })
}