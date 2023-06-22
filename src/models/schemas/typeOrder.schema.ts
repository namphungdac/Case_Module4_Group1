import {Schema, Document, model} from "mongoose";

export interface ITypeOrder extends Document {
    name: string;
    food: object;
    price: number
}

const typeOrderSchema: Schema = new  Schema<ITypeOrder>({
    name: String,
    food: {type: Schema.Types.ObjectId, ref: "Food"},
    price: Number
});

const TypeOrder = model<ITypeOrder>('TypeOrder', typeOrderSchema);

export default TypeOrder;