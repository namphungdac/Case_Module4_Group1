import {Schema, Document, model} from "mongoose";

export interface IOrder extends Document {
    user: Object;
    table: Object;
    timeOrder: Date;
    checkin: Date;
    typeOrder: Object
}

const orderSchema: Schema = new  Schema<IOrder>({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    table: {type: Schema.Types.ObjectId, ref: "Table"},
    timeOrder: Date,
    checkin: Date,
    typeOrder: {type: Schema.Types.ObjectId, ref: "TypeOrder"},
});

const Order = model<IOrder>('Order', orderSchema);

export default Order;