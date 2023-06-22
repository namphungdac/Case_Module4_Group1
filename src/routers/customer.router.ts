import express from "express";
import {homeController} from "../controllers/customer.controller/home.controller";

const customerRouter = express.Router();
customerRouter.get('/home', homeController.getHomePage);


export default customerRouter;