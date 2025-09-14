import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import livrosRoutes from './routes/livrosRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/crud_livros';

//Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

//Rotas
app.use('/api', livrosRoutes);


//Conectar ao MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB conectado'))
    .catch(err => console.log('Erro ao conectar ao MongoDB: ', err));


//Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em:  http://localhost:${PORT}`);
});

