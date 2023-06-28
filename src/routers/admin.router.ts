import express from "express";
import {homeController} from "../controllers/admin.controller/home.controller";
import { FoodController } from "../controllers/admin.controller/food.controller";
import { UserController } from "../controllers/admin.controller/user.controller";
import { TableController } from "../controllers/admin.controller/table.controller";
import { OrderController } from "../controllers/admin.controller/order.controller";

import blockSwitchFromCusMiddleware from "../middlewares/blockSwitchFromCustomer";

const adminRouter = express.Router()
adminRouter.use(blockSwitchFromCusMiddleware);

adminRouter.get('/home', homeController.getHomePage);

// foodManager
adminRouter.get('/createFood',FoodController.getAddFoodPage)
adminRouter.post('/createFood',FoodController.addFood)
adminRouter.get('/foodManager', FoodController.getListFoodManger)
adminRouter.post('/foodManager', FoodController.getListFoodManger)
adminRouter.get('/updateFood/:id', FoodController.getUpdateFoodPage)
adminRouter.post('/updateFood/:id', FoodController.updateFood)
adminRouter.get('/deleteFood/:id', FoodController.deleteFood)

// tableManager
adminRouter.get('/addTable',TableController.getAddTablePage)
adminRouter.post('/addTable',TableController.addTable)
adminRouter.get('/tableManager',TableController.getListTable)
adminRouter.post('/tableManager',TableController.getListTable)
adminRouter.get('/updateTable/:id',TableController.getUpdateTablePage)
adminRouter.post('/updateTable/:id',TableController.updateTable)
adminRouter.get('/deleteTable/:id',TableController.deleteTable)
adminRouter.post('/changeStatus/:id',TableController.changeStatus)

// UserManager
adminRouter.get('/createUser',UserController.getCreateUserPage)
adminRouter.post('/createUser',UserController.createUser)
adminRouter.get('/listUser',UserController.getListUser)
adminRouter.get('/updateUser/:id',UserController.getUpdatePageUser)
adminRouter.post('/updateUser/:id',UserController.updateUser)

// OrderManager
adminRouter.get('/orderManager', OrderController.getOrderList)
adminRouter.get('/updateOrder/:id', OrderController.getUpdateOrderPage)
adminRouter.post('/updateOrder/:id', OrderController.updateOrder)
adminRouter.get('/deleteOrder/:id', OrderController.deleteOrder)
adminRouter.post('/changeOrder/:id', OrderController.changeTableAndStatus)
adminRouter.get('/:id/orderDetail', OrderController.getDetailOrderPage)
adminRouter.post('/:id/selectFood', OrderController.selectFood)
adminRouter.get('/selectFood', OrderController.getSelectFoodModal)
adminRouter.get('/saveSubOrder/:id', OrderController.saveSubOrder)
adminRouter.get('/createBill/:id', OrderController.createBill)
adminRouter.get('/orderDone', OrderController.getOrderDonePage)


export default adminRouter;

