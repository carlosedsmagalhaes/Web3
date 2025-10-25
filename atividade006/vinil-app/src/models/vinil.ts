import mongoose, {Document, Schema} from "mongoose";

export interface IVinil extends Document {
    titulo: string;
    artista: string;
    ano: number;
    genero:string;
    formato: string;
    preco: number;
}

const LivroSchema: Schema = new Schema({
    titulo: { type: String, required: true },
    artista: { type: String, required: true },
    ano: { type: Number, required: true },
    genero: { type: String, required: true },
    formato: { type: String, required: true },
    preco: { type: Number, required: true }
});

export default mongoose.model<IVinil>('Vinil', LivroSchema);