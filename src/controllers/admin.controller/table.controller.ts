import Order from "../../models/schemas/order.schema";
import Table from "../../models/schemas/table.schema";

export class TableController {

    static async getAddTablePage(req: any, res: any) {
        try {
            await res.render('admin/tableManager/createTable', { text: false})
        } catch(err) {
            console.log(err.messages);
            res.render('notFound');
        }
    }

    static async getListTable(req: any, res: any) {
        try {
            let size = 3;
            let page = req.query.page ? +req.query.page : 1;
            if (req.body.size) {
                size = +req.body.size;
            } else if (req.query.limit) {
                size = +req.query.limit;
            }
            let search = await TableController.searchTable(req, res)
            const tables = await Table.find({$or: search});
            let totalPage = Math.ceil(tables.length / size);
            let offset = (page - 1) * size;
            let listTable = await Table.find({$or: search}).limit(size).skip(offset);
            await res.render('admin/tableManager/tableManager', { tables: listTable, total: tables.length, pageCurrent: page, totalPage:totalPage, limit:size })
        } catch(err) {
            console.log(err.messages);
        }
    }

    static async searchTable(req:any, res:any) {
        let queryNumber = {};
        let queryName = {};
        if(req.query.search) {
            let search = req.query.search;
            queryName = {
                name: { $regex: search } 
            }
            queryNumber = {
                numberPerson: { $regex: search }
            }
        }
        return [queryName, queryNumber];
    }

    static async addTable(req: any, res: any) {
        try {
            const { name, numberPerson, description } = req.body
            let tableSearch = await Table.findOne({ name: name })
            if (!tableSearch) {
                let tableUrl = 'table-normal.jpg';
                if (req.files) {
                    let tableImg = req.files.avatar
                    tableImg.mv('./src/public/upload/table/' + tableImg.name);
                    tableUrl = tableImg.name
                }
                let tableNew = new Table({
                    name: name,
                    numberPerson: numberPerson,
                    description: description,
                    imgUrl: tableUrl
                })
                await tableNew.save()
                res.redirect('/admin/tableManager')
            } else {
                res.render('admin/tableManager/createTable', { text: true })
            }
        } catch(err) {
            console.log(err.messages);
        }

    }

    static async getUpdateTablePage(req: any, res: any) {
        try {
            let { page, limit } = req.query;
            if (page && limit) {
                const tableSearch = await Table.findOne({ _id: req.params.id });
                if (tableSearch) {
                    res.render('admin/tableManager/updateTable', { table: tableSearch, pageCurrent: page, limit: limit })
                }
            } else {
                res.render('notFound');
            }
        } catch(err) {
            console.log(err.messages);
        }
    }

    static async updateTable(req: any, res: any) {
        try {
            let { page, limit } = req.query;
            if( page && limit) {
                const table = await Table.findOne({ _id: req.params.id });
                if (table) {
                    table.name = req.body.name;
                    table.numberPerson = req.body.numberPerson;
                    table.description = req.body.description;
                    table.condition = req.body.condition;
                    if (req.files) {
                        let tableImg = req.files.avatar;
                        tableImg.mv('./src/public/upload/table/' + tableImg.name);
                        table.imgUrl = tableImg.name;
                    }
                    await table.save();
                    return res.redirect(`/admin/tableManager?page=${page}&limit=${limit}`)
                } else res.render('notFound');
            } else {
                res.render('notFound');
            }

        } catch (err) {
            console.log(err.messages);
        }
    }

    static async deleteTable(req:any,res:any){
        try{
            await Table.deleteOne({ _id: req.params.id });
            return res.json({
                status: "success",
                message: "Table deleted successfully",
            })
        } catch(err) {
            console.log(err.messages);
        }
    }

    static async changeStatus(req, res) {
        try {
            let status = req.body.status;   
            let order = await Table.findOne({_id: req.params.id});
            if (order) {
                order.status = status;
                await order.save();
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
}