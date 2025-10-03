import express, { Request, Response } from "express";
import axios from "axios";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();
const PORT = 3000;
const API_KEY = process.env.API_KEY;

app.use(express.static(path.join(__dirname, "../views")));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../view/index.html"));
});

app.get("/convert", async (req: Request, res: Response) => {
  const { amount, from, to  } = req.query;
  if (!from || !to || !amount) {
    return res.status(400).json({ error: "Parâmetros inválidos." });
  }
  try {
    const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${from}/${to}/${amount}`;
    const response = await axios.get(url);
    const converted = response.data.conversion_result;
    console.log(converted)
    res.json({ result: `${amount} ${from} = ${converted.toFixed(2)} ${to}` });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Erro ao converter moeda." });
  }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})
