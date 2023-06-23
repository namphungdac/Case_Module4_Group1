import User from "../../models/schemas/user.schema";

export class UserController {
   static async getCreateUserPage(req: any, res: any) {
      try {
         await res.render('admin/userManager/createUser')
      } catch (err) {
         res.end(err.messages)
      }
   }
   static async createUser(req:any,res:any){
    
   }
   static async getListUser(req: any, res: any) {
      try {
         const ListUser = await User.find()
         await res.render('admin/userManager/userManager', { users: ListUser, total: ListUser.length })
      } catch (err) {
         console.log(err.messages);
      }
   }
   
}