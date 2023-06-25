import {Schema, Document, model} from "mongoose";

export interface IFood extends Document {
    name: String;
    type: Object;
    price: Number;
    description: String;
    rate: Object|null
    imgUrl: String

}

const foodSchema: Schema = new  Schema<IFood>({
    name: String,
    type: { type: Schema.Types.ObjectId, ref: "FoodType" },
    price: Number,
    description: String,
    rate: {type: Schema.Types.ObjectId, ref: "Rate"},
    imgUrl: String
});

const Food = model<IFood>('Food', foodSchema);

export default Food;