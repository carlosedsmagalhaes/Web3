import { Router } from "express";
import PessoaController from "../controllers/PessoaController";

const pessoaRoutes = Router();
const pessoaController = new PessoaController();

pessoaRoutes.post("/", pessoaController.createPessoa);
pessoaRoutes.get("/", pessoaController.getPessoas);
pessoaRoutes.get("/:id", pessoaController.getPessoaById);
pessoaRoutes.put("/:id", pessoaController.putPessoa);
pessoaRoutes.delete("/:id", pessoaController.deletePessoa);

export default pessoaRoutes;