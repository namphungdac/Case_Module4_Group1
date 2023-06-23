import User from "../../models/schemas/user.schema";

export class homeController {

    static async getHomePage(req: any, res: any) {
        let id = req.session.passport.user.id;
        let admin = await User.findOne({_id: id})
        res.render('admin/home', {admin});
    }

}