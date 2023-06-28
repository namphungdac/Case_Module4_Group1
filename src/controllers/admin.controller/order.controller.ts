import Table from "../../models/schemas/table.schema";
import Order from "../../models/schemas/order.schema";
import Food from "../../models/schemas/food.schema";
import Bill from "../../models/schemas/bill.schema";
import SubOrder from "../../models/schemas/subOrder.schema";

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

    static async searchOrderByDate(req: any, res: any) {
        
    }

    static async getUpdateOrderPage(req:any, res: any) {
        try {
            let { page, limit } = req.query;
            if (page && limit) {
                const orderSearch = await Order.findOne({ _id: req.params.id });
                if (orderSearch) {
                    res.render('admin/orderManager/updateOrder', { order: orderSearch, pageCurrent: page, limit: limit })
                }
            } else {
                res.render('notFound');
            }
        } catch(err) {
            console.log(err.messages);
        } 
    }

    static async updateOrder(req: any, res: any) {
        try {
            let { page, limit } = req.query;
            if( page && limit) {
                const order = await Order.findOne({ _id: req.params.id });
                if (order) {
                    order.phone = req.body.phone;
                    order.numberPerson = req.body.numberPerson;
                    order.checkin = req.body.checkin;
                    await order.save();
                    return res.redirect(`/admin/orderManager?page=${page}&limit=${limit}`)
                } else res.render('notFound');
            } else {
                res.render('notFound');
            }

        } catch (err) {
            console.log(err.messages);
        }
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
        try {
            await Order.deleteOne({ _id: req.params.id });
            return res.json({
                status: "success",
                message: "Order deleted successfully",
            })
        } catch (err) {
            console.log(err.messages);
        }
    }

    static async getDetailOrderPage(req: any, res: any) {
        try {
            let arr = [];
            let order = await Order.findOne({_id: req.params.id});
            if (order.subOders.length !== 0) {
                for (const item of order.subOders) {
                    let subOrder = await SubOrder.findOne(item).populate({path: "food"});
                    arr.push(subOrder)
                }
            }
            
            res.render('admin/orderManager/orderDetail', {order, arr, orderID: req.params.id})
        } catch (err) {
            console.log(err.messages);
        }
    }

    static async getSelectFoodModal(req:any, res:any) {
        try {
            let foods = await Food.find();
            return res.json({
                status: "success",
                message: "Order deleted successfully",
                data: {foods}
            })
        } catch (err) {
            console.log(err.messages);
        }
    }
    
    static async selectFood(req:any, res) {
        try {
            let orderID = req.params.id;
            let foodID = req.body.food;
            let food = await Food.findOne({_id: foodID})
            let subOrder = new SubOrder({
                food,
                quantity: 0
            });
            await subOrder.save();
            let order = await Order.findOne({_id: orderID});
            order.subOders.push(subOrder);
            await order.save()

            res.redirect(`/admin/${orderID}/orderDetail`)
        } catch (err) {
            console.log(err.messages);
        }
    }

    static async changeQuantityFood(req:any, res: any) {
        try {
            let subOrderID = req.params.id;
            let quantity = req.body.quantity;
            console.log(quantity);
            
            let subOrder = await SubOrder.findOne({_id: subOrderID});

        } catch (err) {
            console.log(err.messages);
        }
    }
}
