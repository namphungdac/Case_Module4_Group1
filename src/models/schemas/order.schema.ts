import {Schema, Document, model} from "mongoose";

export interface IOrder extends Document {
    user: object;
    phone: string;
    table: object | null;
    numberPerson: number;
    timeOrder: Date;
    checkin: Date;
    customerName: string;
    cost: number | null;
    status: string;
    other: string
}

const orderSchema: Schema = new  Schema<IOrder>({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    phone: String,
    table: {type: Schema.Types.ObjectId, ref: "Table"},
    numberPerson: Number,
    timeOrder: Date,
    checkin: Date,
    customerName: String,
    cost: {
        type: Number,
        default: null
    },
    status: {
        type: String,
        default: 'Đang Chờ'
    },
    other: {
        type: String,
        default: ''
    }
});

const Order = model<IOrder>('Order', orderSchema);

export default Order;