import { Router, Request, Response } from "express";
import Livro from "../models/livro";

const router = Router();

router.get("/livros", async (req: Request, res: Response) => {
  try {
    const livros = await Livro.find();
    res.json(livros);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar livros", error });
  }
});

router.post("/livros", async (req: Request, res: Response) => {
  try {
    const { titulo, autor, anoPublicacao } = req.body;
    const novoLivro = new Livro({ titulo, autor, anoPublicacao });
    console.log(novoLivro);
    await novoLivro.save();
    res.status(201).json(novoLivro);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar livro", error });
  }
});

router.delete("/livros/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const livroRemovido = await Livro.findByIdAndDelete(id);
    if (!livroRemovido) {
      return res.status(404).json({ message: "Livro não encontrado" });
    }
    res.json({ message: "Livro removido com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao remover livro", error });
  }
});

router.put("/livros/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { titulo, autor, anoPublicacao } = req.body;
    const livroAtualizado = await Livro.findByIdAndUpdate(
      id,
      { titulo, autor, anoPublicacao },
      { new: true }
    );
    if (!livroAtualizado) {
      return res.status(404).json({ message: "Livro não encontrado" });
    }
    res.json(livroAtualizado);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar livro", error });
  }
});

export default router;
