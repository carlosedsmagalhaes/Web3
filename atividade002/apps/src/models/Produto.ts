import mongoose, { Document, Schema } from 'mongoose';

export interface IProduto extends Document {
    nome: string;
    preco: number;
}

const ProdutoSchema: Schema = new Schema({
    nome: { type: String, required: true },
    preco: { type: Number, required: true }
});

export default mongoose.model<IProduto>('shoppingitems', ProdutoSchema);