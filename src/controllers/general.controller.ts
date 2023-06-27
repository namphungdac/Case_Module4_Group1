
export class GeneralController {

    static getHomePage(req: any, res: any) {
        res.render('home');
    };
    static getNotFoundPage(req: any, res: any) {
        res.render('notFound');
    };

    static getMenuPage(req: any, res: any) {
        res.render('menuFood')
    }
}