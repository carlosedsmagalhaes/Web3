import dotenv from 'dotenv';
import express from 'express';
import carroRoutes from './routes/carroRoutes';
import pessoaRoutes from './routes/pessoaRoutes';
import carroPessoaRoutes from './routes/carroPessoaRoutes';
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "view")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:3101.`);
});

app.use('/api/carros', carroRoutes);
app.use('/api/pessoas', pessoaRoutes);
app.use('/api/carros-pessoas', carroPessoaRoutes);

export default app;