import {Schema, Document, model} from "mongoose";

export interface IOrder extends Document {
    user: object;
    table: object;
    timeOrder: Date;
    checkin: Date;
    customerName: string;

}

const orderSchema: Schema = new  Schema<IOrder>({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    table: {type: Schema.Types.ObjectId, ref: "Table"},
    timeOrder: Date,
    checkin: Date,
    customerName: String
});

const Order = model<IOrder>('Order', orderSchema);

export default Order;