import AuthController from "../auth.controller";
import User from "../../models/schemas/user.schema";
import Food from "../../models/schemas/food.schema";
import FoodType from "../../models/schemas/foodType.schema";
import Rate from "../../models/schemas/rate.schemas";

export class UserController {
    static async getHomePage(req: any, res: any) {
        try {
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
            const vietStaff = await User.findOne({ username: "ViệtColor" })
            const longStaff = await User.findOne({ username: "A Long" })
            const ducanhStaff = await User.findOne({ username: "Đức Anh" })
            res.render('customer/home', { customer, grils: grilFood, chays: chayFood, eus: euFood, javs: javFood, drinks: drinkFood, viet: vietStaff, long: longStaff, ducanh: ducanhStaff });
        } catch (err) {
            console.log(err);
        }
    }

    static async getDetailFood(req: any, res: any) {
        try {
            let listComment = await Rate.find({ food: req.params.id }).populate({
                path: "user"
            });
            const foodDetail = await Food.findOne({ _id: req.params.id })
            res.render('detailFood', { food: foodDetail, listComment })
        } catch (err) {
            console.log(err.message);
        }
    }


    static async addRate(req: any, res: any) {
        try {
            let comment = req.body.comment;
            let customer = await AuthController.getInfoUser(req, res);
            let food = await Food.findOne({ _id: req.params.id })
            let newRate = new Rate({
                comment: comment,
                user: customer,
                food: food
            });
            await newRate.save();
            res.redirect(`/customer/detailFood/${req.params.id}`);
        } catch (err) {
            console.log(err);
        }
    }

    static async getMenuPage(req: any, res: any) {
        try {
            const foodTypeGril = await FoodType.findOne({ name: "Món Nướng" })
            const foodTypeChay = await FoodType.findOne({ name: "Món Chay" })
            const foodTypeEu = await FoodType.findOne({ name: "Món Âu" })
            const foodTypeJav = await FoodType.findOne({ name: "Món Nhật" })
            const foodTypeDrink = await FoodType.findOne({ name: "Đồ Uống" })
            const grilFood = await Food.find({ type: foodTypeGril._id })
            const chayFood = await Food.find({ type: foodTypeChay._id })
            const euFood = await Food.find({ type: foodTypeEu._id })
            const javFood = await Food.find({ type: foodTypeJav._id })
            const drinkFood = await Food.find({ type: foodTypeDrink._id })
            await res.render('customer/menuFood', { grilFood, chayFood, euFood, javFood, drinkFood });
        } catch (err) {
            console.log(err.message);
        }
    }
    static async deleteComment(req: any, res: any) {
        try {
            const rate = await Rate.findOne({ _id: req.params.id })
            await Rate.deleteOne({ _id: req.params.id })
            return res.json({
                status: "success",
                message: "Comment deleted successfully",
            })
        } catch (err) {
            console.log(err.message);
        }
    }
    static async editPasswordPage(req: any, res: any) {
        try {
            let customer = await AuthController.getInfoUser(req, res);
            res.render('customer/editPassword', { customer,text:false })
        } catch (err) {
            console.log(err);
        }
    }
    static async editPassword(req: any, res: any) {
        const customer = await AuthController.getInfoUser(req,res)
        if(customer.password === req.body.oldpassword){
            if(req.body.newpassword === req.body.confirmnewpassword){
                customer.password =req.body.newpassword
                await customer.save()
                res.redirect("/auth/logout")
            }else{
                const text = "Mật khẩu mới nhập không khớp!";
                res.render('customer/editPassword',{customer,text:text})
            }
        }else{
            const text = "Mật khẩu cũ không chính xác";
            res.render('customer/editPassword',{customer,text:text})
        }
    }

}