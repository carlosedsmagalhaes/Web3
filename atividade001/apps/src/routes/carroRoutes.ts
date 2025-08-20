import { Router } from "express";
import CarroController from "../controllers/CarroController";

const carroRoutes = Router();
const carroController = new CarroController();

carroRoutes.post("/", carroController.createCarro);
carroRoutes.get("/", carroController.getCarros);
carroRoutes.get("/:id", carroController.getCarroById);
carroRoutes.put("/:id", carroController.putCarro);
carroRoutes.delete("/:id", carroController.deleteCarro);

export default carroRoutes;
