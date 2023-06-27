import User from "../models/schemas/user.schema";
import Food from "../models/schemas/food.schema";
import FoodType from "../models/schemas/foodType.schema";
export class GeneralController {
    static async getHomePage(req: any, res: any) {
        if (!req.isAuthenticated()) {
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
            const vietStaff = await User.findOne({ username: "ViệtColor" })
            const longStaff = await User.findOne({ username: "A Long" })
            const ducanhStaff = await User.findOne({ username: "Đức Anh" })
            res.render('home', { grils: grilFood, chays: chayFood, eus: euFood, javs: javFood, drinks: drinkFood, viet: vietStaff, long: longStaff, ducanh: ducanhStaff })
        } else {
            if (req.user.role == "user"){
                return res.redirect('/customer/home')
            } else {
                return res.redirect('/admin/home')
            }
        }
    };
    static async getNotFoundPage(req: any, res: any) {
        await res.render('notFound');
    };

    static async getMenuPage(req: any, res: any) {
        await res.render('menuFood')
    }
    static async getDetailFood(req: any, res: any) {
        try {
            const foodDetail = await Food.findOne({ _id: req.params.id })
            res.render('detailFood', { food:foodDetail })
        } catch (err) {
            console.log(err.message);
        }
    }
}