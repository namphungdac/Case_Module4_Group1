import AuthController from "../auth.controller";
import User from "../../models/schemas/user.schema";
import Food from "../../models/schemas/food.schema";
import FoodType from "../../models/schemas/foodType.schema";

export class homeController {
    static async getHomePage(req: any, res: any) {
        let customer = await AuthController.getInfoUser(req, res);
        const foodTypeGril = await FoodType.findOne({ name: "Món Nướng" })
        const foodTypeChay = await FoodType.findOne({ name: "Món Chay" })
        const foodTypeEu = await FoodType.findOne({ name: "Món Âu" })
        const foodTypeJav = await FoodType.findOne({ name: "Món Nhật" })
        const foodTypeDrink = await FoodType.findOne({ name: "Đồ Uống" })
        const grilFood = await Food.find({ type: foodTypeGril._id }).limit(4)
        const chayFood = await Food.find({ type: foodTypeChay._id }).limit(4)
        const euFood = await Food.find({ type: foodTypeEu._id }).limit(4)
        const javFood = await Food.find({ type: foodTypeJav._id }).limit(4)
        const drinkFood = await Food.find({ type: foodTypeDrink._id }).limit(4)
        const vietStaff = await User.findOne({username:"ViệtColor"})
        const longStaff = await User.findOne({username:"A Long"})
        const ducanhStaff = await User.findOne({username:"Đức Anh"})
        res.render('customer/home', { customer ,grils: grilFood, chays: chayFood, eus: euFood, javs: javFood, drinks: drinkFood,viet:vietStaff,long:longStaff,ducanh:ducanhStaff });
    }

}