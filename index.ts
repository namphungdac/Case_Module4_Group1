import express from 'express';
import bodyParser from "body-parser";
import session from "express-session";
import {MongoDB} from "./src/models/data-source";
import fileUpload from "express-fileupload";
import livereload from "connect-livereload";
import { adminRouter } from './src/routers/admin.router';

const app = express();
app.set('view engine', 'ejs');
app.set ('views', './src/views');
app.use(express.static('./src/public'))
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload({
    createParentPath: true
}));
app.use(livereload());
MongoDB.connectDB()
    .then(() => console.log('DB connected!'))
    .catch((err) => console.log(err.messages));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.use('/admin',adminRouter)
app.listen(3000, 'localhost', () => {
    console.log('Server is running at http://localhost:3000');
})