import mongoose, {Document, Schema} from "mongoose";

export interface ILivro extends Document {
    titulo: string;
    autor: string;
    anoPublicacao: number;
}

const LivroSchema: Schema = new Schema({
    titulo: { type: String, required: true },
    autor: { type: String, required: true },
    anoPublicacao: { type: Number, required: true }
});

export default mongoose.model<ILivro>('Livro', LivroSchema);