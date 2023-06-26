import AuthController from "../auth.controller";

export class homeController {

    static async getHomePage(req: any, res: any) {
        let customer = await AuthController.getInfoUser(req, res);
        res.render('customer/home', {customer});
    }

}