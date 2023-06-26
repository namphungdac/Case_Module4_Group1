import express from 'express';
import bodyParser from "body-parser";
import session from "express-session";
import {MongoDB} from "./src/models/data-source";
import authRouter from "./src/routers/auth.router";
import generalRouter from './src/routers/general.router';
import customerRouter from "./src/routers/customer.router";
import adminRouter from "./src/routers/admin.router";
import livereload from "connect-livereload";
import passport from "passport";
import fileUpload from "express-fileupload";

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
    cookie: { secure: false }
}));
app.use(livereload());
app.use(passport.initialize());
app.use(passport.session());

// app.get('/', (req,res) => {
//     res.render('home');
// });
// app.get('/notFound', (req,res) => {
//     res.render('notFound');
// });
app.use(generalRouter);
app.use('/auth',authRouter);
app.use((req: any, res: any, next: any)=> {
    if (req.isAuthenticated()) {
        res.locals.userLogin = req.user
        next();
    } else {
        res.redirect('/auth/login')
    }
});
app.use('/customer', customerRouter);
app.use('/admin', adminRouter);

app.use((req, res) => {
    res.redirect('/notFound');
});

app.listen(3000, 'localhost', () => {
    console.log('Server is running at http://localhost:3000');
});