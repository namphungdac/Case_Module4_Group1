import {Schema, Document, model} from "mongoose";

export interface IFood extends Document {
    name: string;
    type: string;
    price: number;
    description: string;
    rate: object;
    imgUrl: string
}

const foodSchema: Schema = new  Schema<IFood>({
    name: String,
    type: String,
    price: Number,
    description: String,
    rate: {type: Schema.Types.ObjectId, ref: "Rate"},
    imgUrl: String
});

const Food = model<IFood>('Food', foodSchema);

export default Food;