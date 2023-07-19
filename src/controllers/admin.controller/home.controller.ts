import AuthController from "../auth.controller";

export class homeController {
    static async getHomePage(req: any, res: any) {
        try{
            let admin = await AuthController.getInfoUser(req, res)
        res.render('admin/home', { admin });
        }catch(err){
            console.log(err.message);
        }
    }

}