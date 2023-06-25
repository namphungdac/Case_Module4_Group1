import User from "../../models/schemas/user.schema";

export class UserController {
   static async getCreateUserPage(req: any, res: any) {
      try {
         await res.render('admin/userManager/createUser')
      } catch (err) {
         res.end(err.messages)
      }
   }
   static async createUser(req: any, res: any) {
      try {
         const { username, password,phoneNumber,role } = req.body;
         let userSearch = await User.findOne({ username: username })
         if (!userSearch) {
            let avatar = 'musk.jpeg'
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
            res.render('admin/userManager/createUser')
         }
      } catch (err) {
         console.log(err.messages);
      }
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