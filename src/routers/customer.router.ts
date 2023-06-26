import express from "express";
import {homeController} from "../controllers/customer.controller/home.controller";
import blockSwitchFromAdminMiddleware from "../middlewares/blockSwitchFromAdmin";

const customerRouter = express.Router();
customerRouter.use(blockSwitchFromAdminMiddleware);
customerRouter.get('/home', homeController.getHomePage);


export default customerRouter;