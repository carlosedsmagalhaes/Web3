import { Router } from "express";
import CarroPessoaController from "../controllers/CarroPessoaController";

const carroPessoaRoutes = Router();
const carroPessoaController = new CarroPessoaController();

carroPessoaRoutes.post("/", carroPessoaController.createPessoaCarro);
carroPessoaRoutes.get("/", carroPessoaController.getPessoasCarros);
carroPessoaRoutes.delete("/:id", carroPessoaController.deletePessoaCarro);

export default carroPessoaRoutes;