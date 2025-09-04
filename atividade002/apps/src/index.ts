import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import produtoRoutes from './routes/produtoRoutes';
import dotenv from 'dotenv';

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_CONNECTION_STRING || 'mongodb://localhost:27017/shopping-list')
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

app.use("/shopping-list", produtoRoutes);

app.use(express.static(path.join(__dirname, "..", "public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.listen(process.env.PORT || 3101, () => {
    console.log(`Servidor rodando em: http://localhost:${process.env.PORT || 3101}`);
});

