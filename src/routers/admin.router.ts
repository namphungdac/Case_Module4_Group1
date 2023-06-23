import express from "express";
import {homeController} from "../controllers/admin.controller/home.controller";
import { FoodController } from "../controllers/admin.controller/food.controller";
import blockSwitchFromCusMiddleware from "../middlewares/blockSwitchFromCus.middleware";

const adminRouter = express.Router()
adminRouter.use(blockSwitchFromCusMiddleware);
adminRouter.get('/home', homeController.getHomePage);
adminRouter.get('/createFood',FoodController.getAddFoodPage)
adminRouter.post('/createFood',FoodController.addFood)
adminRouter.get('/foodManager',FoodController.getListFoodManger)
adminRouter.get('/updateFood/:id',FoodController.getUpdateFoodPage)
adminRouter.post('/updateFood/:id',FoodController.updateFood)
adminRouter.get('/deleteFood/:id',FoodController.deleteFood)
export default adminRouter;

