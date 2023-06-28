import {Schema, Document, model} from "mongoose";

export interface IBill extends Document {
    order: Object;
    totalMoney: number;
    status: string
}

const billSchema: Schema = new  Schema<IBill>({
    order: { type: Schema.Types.ObjectId, ref: "Order" },
    totalMoney: Number,
    status: {
        type: String,
        default: 'Chưa Thanh Toán'
    }
});

const Bill = model<IBill>('Bill', billSchema);

export default Bill;