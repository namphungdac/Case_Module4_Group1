import User from "../models/schemas/user.schema";

const blockSwitchFromCusMiddleware = async (req:any, res: any, next: any) => {
    if (req.user.role === 'admin') {
        next();
    }else {
        res.redirect('/customer/home');
    }
}

export default blockSwitchFromCusMiddleware;
