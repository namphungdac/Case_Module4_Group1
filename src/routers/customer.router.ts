import express from "express";
import { OrderController } from "../controllers/customer.controller/order.controller";
import {homeController} from "../controllers/customer.controller/home.controller";
import blockSwitchFromAdminMiddleware from "../middlewares/blockSwitchFromAdmin";


const customerRouter = express.Router();
customerRouter.use(blockSwitchFromAdminMiddleware);
customerRouter.get('/home', homeController.getHomePage);
customerRouter.get('/order', OrderController.getOrderPage);
customerRouter.post('/order', OrderController.orderTable);
customerRouter.get('/detailFood/:id', homeController.getDetailFood)
customerRouter.get('/menu',homeController.getMenuPage)
customerRouter.post('/detailFood/:id', homeController.addRate);
customerRouter.get('/deleteCmt/:id',homeController.deleteComment)



export default customerRouter;