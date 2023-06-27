
const aaa = async (req:any, res: any, next: any) => {
    console.log(11)
    if (req.isAuthenticated()) {
        console.log(12)
        res.locals.userLogin = req.user
        next();
    } else {
        console.log(13)
        res.redirect('/auth/login')
    }
}

export default aaa;
