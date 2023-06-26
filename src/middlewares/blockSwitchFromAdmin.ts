import User from "../models/schemas/user.schema";

const blockSwitchFromAdminMiddleware = async (req:any, res: any, next: any) => {
    let id = req.session.passport.user.id;
    let customer = await User.findOne({_id: id})
    if (customer.role === 'user') {
        next();
    }else {
        res.redirect('/admin/home');
    }
}

export default blockSwitchFromAdminMiddleware;