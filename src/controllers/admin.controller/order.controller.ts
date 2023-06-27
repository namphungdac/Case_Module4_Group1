import Table from "../../models/schemas/table.schema";
import Order from "../../models/schemas/order.schema";

export class OrderController {
    static async getOrderList(req:any, res: any) {
        try {
            let size = 3;
            let page = req.query.page ? +req.query.page : 1;

            if (req.body.size) {
                size = +req.body.size;
            } else if (req.query.limit) {
                size = +req.query.limit;
            }
            let tables = await Table.find();
            let listOrder = await Order.find().populate({ path: "table", select: "name" }).sort({date: 1});
            let totalPage = Math.ceil(listOrder.length / size);
            let offset = (page - 1) * size;
            const orders = await Order.find().populate({ path: "table", select: "name" }).limit(size).skip(offset).sort({date: 1});
            
            res.render('admin/orderManager/orderManager', {orders, tables, total: listOrder.length, pageCurrent: page, totalPage:totalPage, limit:size})
        } catch (err) {
            console.log(err.messages);
        }
        
    }

    static async getUpdateOrderPage(req:any, res: any) {
        
    }

    static async changeTableAndStatus(req, res) {
        try {
            let table = req.body.table;
            let order = await Order.findOne({_id: req.params.id});
            if (order) {
                if (table == 'null' ) {
                    if (order.table !== null) {
                        let tableFind = await Table.findOne({_id: order.table})
                        tableFind.status = 'Trống';
                        await tableFind.save();
                        order.table = null;
                    }
                    order.status = "Đang Đợi";
                    await order.save();
                } else {
                    if (order.table !== null) {
                        let tableFind = await Table.findOne({_id: order.table})
                        tableFind.status = 'Trống';
                        tableFind.save();
                    }
                    let tableUpdate = await Table.findOne({_id: `${table}`})
                    if(tableUpdate) {
                        tableUpdate.status = 'Dùng'
                        await tableUpdate.save();
                        order.table = tableUpdate;
                    }
                    order.status = "Đang Dùng";
                    await order.save();
                }
                
                return res.json({
                    status: "success",
                    message: "Order change status success",
                })
            } else {
                res.render('notFound');
            }
        } catch (err) {
            console.log(err.messages);
        }
    }

    static async deleteOrder(req:any,res:any){
        try{
            await Order.deleteOne({ _id: req.params.id });
            return res.json({
                status: "success",
                message: "Order deleted successfully",
            })
        } catch(err) {
            console.log(err.messages);
        }
    }
}
