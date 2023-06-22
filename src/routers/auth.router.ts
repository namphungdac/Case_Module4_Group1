import express from "express";
import passport from "../middlewares/auth.middleware";
import AuthController from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.get('/login', AuthController.getLoginPage);
authRouter.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login'
}));
authRouter.get('/login/google', passport.authenticate('google', {scope: ['profile', 'email']}));
// Retrieve user data using the access token received
authRouter.get("/google/callback", passport.authenticate('google'), (req, res) => {
    res.redirect('/');
});

authRouter.get('/register', AuthController.getRegisterPage);
authRouter.post('/register', AuthController.addUser);

export default authRouter;