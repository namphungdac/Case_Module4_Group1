import AuthController from "../auth.controller";

export class homeController {

    static async getHomePage(req: any, res: any) {
        let admin = await AuthController.getInfoUser(req, res)
        res.render('admin/home', {admin});
    }

}