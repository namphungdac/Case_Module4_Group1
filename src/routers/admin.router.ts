import { Router } from "express";
import { FoodController } from "../controllers/admincontrollers/food.controller";
export const adminRouter = Router();

adminRouter.get('/createFood',FoodController.getAddFoodPage)
adminRouter.post('/createFood',FoodController.addFood)
adminRouter.get('/foodManager',FoodController.getListFoodManger)