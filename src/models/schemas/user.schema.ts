import {Schema, Document, model} from "mongoose";

export interface IUser extends Document {
    userName: String;
    password: String;
    role: String;
    avatar: String;
    phoneNumber: String
}

const userSchema: Schema = new  Schema<IUser>({
    userName: String,
    password: String,
    role: String,
    avatar: String,
    phoneNumber: String
});

const User = model<IUser>('User', userSchema);

export default User;