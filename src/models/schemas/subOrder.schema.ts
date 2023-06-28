import {Schema, Document, model} from "mongoose";

export interface ISubOrder extends Document {
    food: any;
    quantity: number
}

const subOrderSchema: Schema = new  Schema<ISubOrder>({
    food: { type: Schema.Types.ObjectId, ref: "Food" },
    quantity: Number,
});

const SubOrder = model<ISubOrder>('SubOrder', subOrderSchema);

export default SubOrder;