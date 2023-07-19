import express from "express";
import { OrderController } from "../controllers/customer.controller/order.controller";
import {UserController} from "../controllers/customer.controller/user.controller";
import blockSwitchFromAdminMiddleware from "../middlewares/blockSwitchFromAdmin";


const customerRouter = express.Router();
customerRouter.use(blockSwitchFromAdminMiddleware);
customerRouter.get('/home', UserController.getHomePage);
customerRouter.get('/order', OrderController.getOrderPage);
customerRouter.post('/order', OrderController.orderTable);
customerRouter.get('/detailFood/:id', UserController.getDetailFood)
customerRouter.get('/menu', UserController.getMenuPage)
customerRouter.post('/detailFood/:id',  UserController.addRate);
customerRouter.delete('/deleteCmt/:id', UserController.deleteComment)
customerRouter.get('/editpassword',UserController.editPasswordPage)
customerRouter.post('/editpassword',UserController.editPassword)

export default customerRouter;