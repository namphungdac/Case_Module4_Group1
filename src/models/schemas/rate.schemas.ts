import {Schema, Document, model} from "mongoose";

export interface IRate extends Document {
    comment: String;
    countDislike: Number;
    countLike: Number;
    user: Object;
    food: Object
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