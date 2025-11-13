import express, {Request, Response} from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import expenseRouter from "./routes/expense";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/expense';

app.use(express.static(path.join(__dirname, "./views")));
app.use(express.json());

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB conectado'))
    .catch(err => console.log('Erro ao conectar ao MongoDB: ', err));


app.use("/api", expenseRouter);
app.get("/", (req:Request, res:Response) => {
  res.sendFile(path.join(__dirname, "./views/index.html"));
});


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
