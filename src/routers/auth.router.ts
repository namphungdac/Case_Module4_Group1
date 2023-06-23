import express from "express";
import passport from "../middlewares/auth.middleware";
import AuthController from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.get('/login', AuthController.getLoginPage);
authRouter.post('/login', passport.authenticate('local', { session: true, failureRedirect: '/auth/login' }), AuthController.login);
authRouter.get('/login/google', passport.authenticate('google', {scope: ['profile', 'email']}));
authRouter.get("/google/callback", passport.authenticate('google'), (req, res) => {
    res.redirect('/customer/home');
});

authRouter.get('/register', AuthController.getRegisterPage);
authRouter.post('/register', AuthController.addUser);

authRouter.get('/logout', (req, res, next)=>{
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/auth/login');
    });
});

export default authRouter;