import {Schema, Document, model} from "mongoose";

export interface IRate extends Document {
    comment: string;
    countDislike: number;
    countLike: number;
    user: object;
    food: object
}

const rateSchema: Schema = new  Schema<IRate>({
    comment: String,
    countDislike: Number,
    countLike: Number,
    user: {type: Schema.Types.ObjectId, ref: "User"},
    food: {type: Schema.Types.ObjectId, ref: "Food"},
});

const Rate = model<IRate>('Rate', rateSchema);

export default Rate;