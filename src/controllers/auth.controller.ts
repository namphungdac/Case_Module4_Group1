import User from "../models/schemas/user.schema";

class AuthController {

    static getLoginPage(req: any, res: any): any {
        try {
            if (!req.isAuthenticated()) {
                res.render('auth/login');
            } else {
                if (req.user.role == "user") {
                    return res.redirect('/customer/home')
                } else {
                    return res.redirect('/admin/home')
                }
            }
        } catch (err) {
            console.log(err);

        }
    }
    static async login(req: any, res: any) {
        try {
            let user = await User.findOne(req.body);
            if (user.role === 'user') {
                res.redirect('/customer/home');
            } else {
                res.redirect('/admin/home');
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async getRegisterPage(req: any, res: any) {
        try {
            await res.render('auth/register', { text: false });
        } catch (err) {
            console.log(err);
        }
    }

    static async addUser(req: any, res: any) {
        try {
            const userExist = await User.findOne({ username: req.body.username })
            if (userExist) {
                res.render('auth/register', { text: true })
            } else {
                let newUser = new User(req.body);
                await newUser.save();
                res.redirect('/auth/login');
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async getInfoUser(req: any, res: any) {
        try {
            let id = req.user.id;
            return await User.findOne({ _id: id })
        } catch (err) {
            console.log(err);
        }
    }
}
export default AuthController;
