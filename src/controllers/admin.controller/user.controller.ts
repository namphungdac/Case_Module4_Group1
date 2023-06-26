import User from "../../models/schemas/user.schema";

export class UserController {
   static async getCreateUserPage(req: any, res: any) {
      try {
         await res.render('admin/userManager/createUser',{text:false})
      } catch (err) {
         res.end(err.messages)
      }
   }
   static async createUser(req: any, res: any) {
      try {
         const { username, password,phoneNumber,role } = req.body;
         let userSearch = await User.findOne({ username: username })
         if (!userSearch) {
            let avatar = 'no-avatar.png'
            let newUser = new User({
               username: username,
               password: password,
               phoneNumber:phoneNumber,
               role: role,
               avatar: avatar
            })
            await newUser.save()
            res.redirect('/admin/listUser')
         } else {
            res.render('admin/userManager/createUser',{text:true})
         }
      } catch (err) {
         console.log(err.messages);
      }
   }
   static async getListUser(req: any, res: any) {
      try {
         const search =await UserController.searchUser(req,res)
         const ListUser = await User.find({$or:search})
         await res.render('admin/userManager/userManager', { users: ListUser, total: ListUser.length })
      } catch (err) {
         console.log(err.messages);
      }
   }
   static async searchUser(req:any, res:any) {
      
      let queryName = {};
      let queryRole={}
      if(req.query.search) {
          let search = req.query.search;

          queryName = {
              username: { $regex: search } 
          }
          queryRole={
            role:{ $regex: search } 
          }
          
      }
      return [queryName, queryRole];
  }

}