import express, { Request, Response } from "express";
import axios from "axios";
import * as dotenv from "dotenv";
import path from "path";
import { WeatherResponse } from "./types/IWeather";
import { LocationResponse } from "./types/IGeo";

dotenv.config();

const app = express();
const PORT = 3000;
const API_KEY = process.env.API_KEY;

app.use(express.static(path.join(__dirname, "../view")));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../view/index.html"));
});

app.get("/climateData", async (req: Request, res: Response) => {
  const { city } = req.query;
  if (!city) {
    return res.status(400).json({ error: "Parâmetro inválido." });
  }
  try {
    const urlGeo = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
    const responseGeo = await axios.get(urlGeo);

    const locationData = responseGeo.data as LocationResponse;
    if (locationData.length === 0) {
      return res.status(404).json({ error: "Cidade não encontrada." });
    }

    const { lat, lon } = locationData[0];

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=pt_br&units=metric`;
    const response = await axios.get(url);

    if (!response.data) {
      return res
        .status(404)
        .json({ error: "Dados climáticos não encontrados." });
    }

    const climateData = response.data as WeatherResponse;
    res.json(climateData);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Erro ao buscar dados climáticos da cidade informada." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
