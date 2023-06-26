import express from "express";
import { GeneralController } from "../controllers/general.controller";

const generalRouter = express.Router();

generalRouter.get('/', GeneralController.getHomePage);
generalRouter.get('/notFound', GeneralController.getNotFoundPage);
generalRouter.get('/menu', GeneralController.getMenuPage);

export default generalRouter;