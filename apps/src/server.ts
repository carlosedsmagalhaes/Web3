import dotenv from 'dotenv';
import express from 'express';
import carroRoutes from './routes/carroRoutes';
import pessoaRoutes from './routes/pessoaRoutes';
import carroPessoaRoutes from './routes/carroPessoaRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}.`);
});

app.use('/api/carros', carroRoutes);
app.use('/api/pessoas', pessoaRoutes);
app.use('/api/carros-pessoas', carroPessoaRoutes);

export default app;