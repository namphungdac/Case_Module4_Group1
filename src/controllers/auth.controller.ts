import User from "../models/schemas/user.schema";

class AuthController {
    static getLoginPage(req: any, res: any): any {
        res.render('auth/login')
    }

    static getRegisterPage(req: any, res: any): any {
        res.render('auth/register');
    }

    static async addUser(req: any, res: any) {
        let newUser = new User(req.body);
        await newUser.save();
        res.redirect('/');
    }
}

export default AuthController;
