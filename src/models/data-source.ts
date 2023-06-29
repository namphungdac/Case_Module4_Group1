import mongoose from "mongoose";

export class MongoDB {
    static async connectDB() {
        const DB_URL = 'mongodb+srv://nguyenhoangky23121997:gVN0wk4li3pPaVRK@restaurantmanager.evddd9v.mongodb.net/?retryWrites=true&w=majority/test';
        return await mongoose.connect(DB_URL);
    }
}