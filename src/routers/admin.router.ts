import express from "express";
import {homeController} from "../controllers/admin.controller/home.controller";

const adminRouter = express.Router();
adminRouter.get('/home', homeController.getHomePage);


export default adminRouter;