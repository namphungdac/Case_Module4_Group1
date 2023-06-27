import {Schema, Document, model} from "mongoose";

export interface IUser extends Document {
    username: string;
    password: string;
    role: string;
    avatar: string;
    phoneNumber: string;
    google: {
        id: {
            type: string,
        },
    }
}

const userSchema: Schema = new  Schema<IUser>({
    username: String,
    password: String,
    role: {
        type: String,
        default: 'user'
    },
    avatar: {
        type: String,
        default: 'no-avatar.png'
    },
    google: {
        id: {
            type: String
        }
    },
});

const User = model<IUser>('User', userSchema);

export default User;