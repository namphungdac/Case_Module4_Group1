import { Router } from "express";
import { FoodController } from "../controllers/admincontrollers/food.controller";
export const adminRouter = Router();

adminRouter.get('/createFood',FoodController.getAddFoodPage)