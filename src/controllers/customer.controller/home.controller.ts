import AuthController from "../auth.controller";

export class homeController {

    static async getHomePage(req: any, res: any) {
        let customer = await AuthController.getInfoUser(req, res);
        console.log(customer)
        res.render('customer/home', {customer});
    }

}