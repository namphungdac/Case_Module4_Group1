import User from "../models/schemas/user.schema";

const blockSwitchFromCusMiddleware = async (req:any, res: any, next: any) => {
    let id = req.session.passport.user.id;
    let customer = await User.findOne({_id: id})
    if (customer.role === 'admin') {
        next();
    }else {
        res.redirect('/customer/home');
    }
}

export default blockSwitchFromCusMiddleware;
