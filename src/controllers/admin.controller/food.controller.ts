import FoodType from "../../models/schemas/foodType.schema";
import Food from "../../models/schemas/food.schema";

export class FoodController {

    static async getAddFoodPage(req: any, res: any) {
        try {
            const foodTypes = await FoodType.find();
            if(foodTypes){
                res.render('admin/foodManager/createFood', { text: false, foodTypes: foodTypes })
            }
        } catch (err) {
            console.log(err.messages);
        }
    }

    static async getListFoodManger(req: any, res: any) {
        try {
            let size = 3;
            let page = req.query.page ? +req.query.page : 1;

            if (req.body.size) {
                size = +req.body.size;
            } else if (req.query.limit) {
                size = +req.query.limit;
            }
            let search = await FoodController.searchFood(req, res);
            const foods = await Food.find({$or: search}).populate({ path: "type", select: "name" });
            let totalPage = Math.ceil(foods.length / size);
            let offset = (page - 1) * size;
            const listFood = await Food.find({$or: search}).populate({ path: "type", select: "name" }).limit(size).skip(offset);
            res.render('admin/foodManager/foodManager', { foods: listFood, total: foods.length, pageCurrent: page, totalPage:totalPage, limit:size })
        } catch (err) {
            console.log(err.messages);
        }
    }

    static async searchFood(req:any, res:any) {
        let queryType = {};
        let queryName = {};
        if(req.query.search) {
            let search = req.query.search;
            let foodType = await FoodType.findOne({ name: { $regex: search } });
            queryName = {
                name: { $regex: search } 
            }
            queryType = {
                type: foodType
            }
        }
        return [queryName, queryType];
    }

    static async addFood(req: any, res: any) {
        try {
            const { name, type, price, description } = req.body
            let food= await Food.findOne({ name: name })
            if (!food) {
                const foodUrl = req.body.image.slice(0, -1).split(';')
                let foodNew = new Food({
                    name: name,
                    type: type,
                    price: price,
                    description: description,
                    imgUrl: foodUrl[0]
                })
                await foodNew.save()
                res.redirect('/admin/foodManager')
            } else {
                res.render('admin/foodManager/createFood', { text: true })
            }
        } catch(err) {
            console.log(err.messages);
        }

    }

    static async getUpdateFoodPage(req: any, res: any) {
        try {
            let { page, limit } = req.query;
            if (page && limit) {
                const foodTypes = await FoodType.find();
                const foodSearch = await Food.findOne({ _id: req.params.id }).populate({ path: "type", select: "name" });
                if (foodSearch) {
                    res.render('admin/foodManager/updateFood', { food: foodSearch, foodTypes: foodTypes, pageCurrent: page, limit: limit })
                }
            } else {
                res.render('notFound');
            }
        } catch (err) {
            console.log(err.messages);
        }
    }

    static async updateFood(req: any, res: any) {
        try {
            let { page, limit } = req.query;
            if( page && limit) {
                const food = await Food.findOne({ _id: req.params.id }).populate({ path: "type", select: "name" })
                if (food) {
                    if (req.body.image) {
                    let foodUrl = req.body.image.slice(0, -1).split(';')
                        food.imgUrl = foodUrl[0]
                    }
                    food.name=req.body.name
                    food.type=req.body.type
                    food.price=req.body.price
                    food.description=req.body.description
                    await food.save();
                    return res.redirect(`/admin/foodManager?page=${page}&limit=${limit}`)
                } else res.render('notFound');
            } else {
                res.render('notFound');
            }

        } catch(err) {
            console.log(err.messages);
        }
    }

    static async deleteFood(req:any,res:any){
        try {
            await Food.deleteOne({ _id: req.params.id });
            return res.json({
                status: "success",
                message: "Food deleted successfully",
            })
        } catch(err) {
            console.log(err.messages);
        }
    }
}