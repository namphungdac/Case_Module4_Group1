import Table from "../../models/schemas/table.schema";
import AuthController from "../auth.controller"

export class OrderController {
    static async getOrderPage(req: any, res: any) {
        let customer = await AuthController.getInfoUser(req, res);
        let tables = await Table.find({status: 'Trống'});
        res.render('customer/order', {customer, tables})
    }
}