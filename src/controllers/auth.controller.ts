import User from "../models/schemas/user.schema";

class AuthController {

    static getLoginPage(req: any, res: any): any {
        res.render('auth/login');
    }

    static async login(req: any, res: any) {
        let user = await User.findOne({_id: req.user._id});
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
        res.redirect('/auth/login');
    }

    static async getInfoUser(req: any, res: any) {
        let id = req.session.passport.user.id;
        return await User.findOne({_id: id})
    }
}

export default AuthController;
