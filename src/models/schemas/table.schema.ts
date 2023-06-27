import {Schema, Document, model} from "mongoose";

export interface ITable extends Document {
    name: string;
    numberPerson: string;
    description: string;
    status: string;
    condition: string;
    imgUrl: string
}

const tableSchema: Schema = new  Schema<ITable>({
    name: String,
    numberPerson: String,
    description: String,
    status: {
        type: String,
        default: 'Trống'
    },
    condition: {
        type: String,
        default: 'Mới'
    },
    imgUrl: String
});

const Table = model<ITable>('Table', tableSchema);

export default Table;