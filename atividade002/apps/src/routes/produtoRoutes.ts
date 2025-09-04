import { Router, Request, Response } from "express";
import Produto from "../models/Produto";

const router = Router();

router.get("/produtos", async (req: Request, res: Response) => {
  try {
    const produtos = await Produto.find();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar produtos", error });
  }
});

router.post("/produtos", async (req: Request, res: Response) => {
  try {
    const { nome, preco } = req.body;
    const novoProduto = new Produto({ nome, preco });
    console.log(novoProduto);
    await novoProduto.save();
    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar produto", error });
  }
});

router.delete("/produtos/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const produtoRemovido = await Produto.findByIdAndDelete(id);
    if (!produtoRemovido) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.json({ message: "Produto removido com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao remover produto", error });
  }
});

router.put("/produtos/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nome, preco } = req.body;
    const produtoAtualizado = await Produto.findByIdAndUpdate(
      id,
      { nome, preco },
      { new: true }
    );
    if (!produtoAtualizado) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.json(produtoAtualizado);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar produto", error });
  }
});

export default router;
