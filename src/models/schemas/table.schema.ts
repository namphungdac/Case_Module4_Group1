import {Schema, Document, model} from "mongoose";

export interface ITable extends Document {
    name: String;
    numberPerson: String;
    description: String;
    price: Number;
    imgUrl: String
}

const tableSchema: Schema = new  Schema<ITable>({
    name: String,
    numberPerson: String,
    description: String,
    price: Number,
    imgUrl: String
});

const Table = model<ITable>('Table', tableSchema);

export default Table;