import User from "../models/schemas/user.schema";

const blockSwitchHomePageAfterLogin = async (req:any, res: any, next: any) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        if (req.user.role == "user"){
            res.redirect('/customer/home')
        } else {
            res.redirect('/admin/home')
        }
    }
}

export default blockSwitchHomePageAfterLogin;
