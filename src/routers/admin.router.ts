import express from "express";
import {homeController} from "../controllers/admin.controller/home.controller";
import { FoodController } from "../controllers/admin.controller/food.controller";
import { UserController } from "../controllers/admin.controller/user.controller";
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
adminRouter.get('/createUser',UserController.getCreateUserPage)
adminRouter.post('/createUser',UserController.createUser)
adminRouter.get('/listUser',UserController.getListUser)

export default adminRouter;

