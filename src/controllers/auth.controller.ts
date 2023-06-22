import User from "../models/schemas/user.schema";

class AuthController {

    static getLoginPage(req: any, res: any): any {
        res.render('auth/login');
    }

    static async login(req: any, res: any) {
        let user = await User.findOne(req.body);
        if (user.role === 'user') {
            res.redirect('/customer/home');
        } else {
            res.redirect('/admin/home');
        }
    }

    static getRegisterPage(req: any, res: any): any {
        res.render('auth/register');
    }

    static async addUser(req: any, res: any) {
        let newUser = new User(req.body);
        await newUser.save();
        res.redirect('/customer/home');
    }
}

export default AuthController;
