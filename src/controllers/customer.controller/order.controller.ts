import Table from "../../models/schemas/table.schema";
import Order from "../../models/schemas/order.schema";
import AuthController from "../auth.controller"

export class OrderController {
    static async getOrderPage(req: any, res: any) {
        try {
            let customer = await AuthController.getInfoUser(req, res);
            let tables = await Table.find();
            res.render('customer/order', {customer, tables})
        } catch (err) {
            console.log(err.messages);
        }

    }
    static async orderTable(req: any, res: any) {
        try {
            let {customerName, phone, checkin, numberPerson, other} = req.body;
            
            let user = await AuthController.getInfoUser(req, res);
            let newOrder = new Order({
                user,
                phone,
                numberPerson,
                timeOrder: Date.now(),
                table: null,
                checkin,
                customerName,
                foods: [],
                other
            })
            
            if (newOrder) {
                await newOrder.save();
                res.redirect('/customer/order')
            } else {
                res.render('notFound');
            }
        } catch (err) {
            console.log(err.messages);
        }
    }
}