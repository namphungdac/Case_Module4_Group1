import Food from "../../models/schemas/food.schema";
export class FoodController{
    static async  getAddFoodPage(req:any,res:any){
        try{
            await res.render('admin/foodManager/createFood')
        }catch(err){
            res.send("404")
        }
    }
}