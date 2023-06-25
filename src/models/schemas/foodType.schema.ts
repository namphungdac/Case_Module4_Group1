import {Schema, Document, model} from "mongoose";

export interface IFoodType extends Document {
    name: string;
}

const foodTypeSchema: Schema = new  Schema<IFoodType>({
    name: String
});

const FoodType = model<IFoodType>('FoodType', foodTypeSchema);

export default FoodType;