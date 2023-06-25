import {Schema, Document, model} from "mongoose";

export interface ITable extends Document {
    name: string;
    numberPerson: string;
    description: string;
    price: number;
    status: string;
    imgUrl: string
}

const tableSchema: Schema = new  Schema<ITable>({
    name: String,
    numberPerson: String,
    description: String,
    price: Number,
    status: String,
    imgUrl: String
});

const Table = model<ITable>('Table', tableSchema);

export default Table;