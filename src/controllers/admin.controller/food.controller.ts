import Food from "../../models/schemas/food.schema";
export class FoodController {
    static async getAddFoodPage(req: any, res: any) {
        try {
            await res.render('admin/foodManager/createFood', { text: false })
        } catch (err) {
            res.send("404")
        }
    }
    static async getListFoodManger(req: any, res: any) {
        try {
            const listFood = await Food.find()
            await res.render('admin/foodManager/foodManager', { foods: listFood, total: listFood.length })
        } catch (err) {
            console.log(err.messages);

        }
    }
    static async addFood(req: any, res: any) {
        try {
            const { name, type, price, description } = req.body
            let foodSearch = await Food.findOne({ name: name })
            if (!foodSearch) {
                let foodUrl = '/upload/avatar.jpg';
                if (req.files) {
                    let foodImg = req.files.avatar
                    foodImg.mv('./src/public/upload/' + foodImg.name);
                    foodUrl =  foodImg.name
                }
                let foodNew = new Food({
                    name: name,
                    type: type,
                    price: price,
                    description: description,
                    imgUrl: foodUrl
                })
                await foodNew.save()
                res.redirect('/admin/foodManager')
            } else {
                res.render('admin/foodManager/createFood', { text: true })
            }
        } catch (err) {
            console.log(err.messages);

        }

    }

    static async getUpdateFoodPage(req: any, res: any) {
        try {
            const foodSearch = await Food.findOne({ _id: req.params.id })
            if (foodSearch) {
                res.render('admin/foodManager/updateFood', { food: foodSearch })
            }
        } catch (err) {
            console.log(err.messages);

        }
    }
    static async updateFood(req: any, res: any) {
        try{
            const food = await Food.findOne({ _id: req.params.id })
        food.name=req.body.name
        food.type=req.body.type
        food.price=req.body.price
        food.description=req.body.description
        if (req.files) {
             let foodImg = req.files.avatar;
            foodImg.mv('./src/public/upload/' + foodImg.name);
            food.imgUrl =  foodImg.name;
        }
        await food.save()
        if(food){
            res.redirect('/admin/foodManager')
        }
        }catch(err){
            console.log(err.messages);
            
        }
    }
    static async deleteFood(req:any,res:any){
        try{
            await Food.deleteOne({ _id: req.params.id });
            res.redirect('/admin/foodManager')
        }catch(err){
            console.log(err.messages);
        }
    }
}