import {Request, Response} from "express";
import Vinil from "../models/vinil";


export default class VinilController {
    async getAll(req: Request, res: Response) {
        try {
            const vinis = await Vinil.find();
            res.json(vinis);
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar vinis", error });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { titulo, artista, ano, genero, formato, preco } = req.body;
            const novoVinil = new Vinil({ titulo, artista, ano, genero, formato, preco });
            console.log(novoVinil);
            await novoVinil.save();
            res.status(201).json(novoVinil);
        } catch (error) {
            res.status(500).json({ message: "Erro ao criar vinil", error });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const vinilRemovido = await Vinil.findByIdAndDelete(id);
            if (!vinilRemovido) {
                return res.status(404).json({ message: "Vinil não encontrado" });
            }
            res.json({ message: "Vinil removido com sucesso" });
        } catch (error) {
            res.status(500).json({ message: "Erro ao remover vinil", error });
        }
    }
    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { titulo, artista, ano, genero, formato, preco } = req.body;
            const vinilAtualizado = await Vinil.findByIdAndUpdate(
                id,
                { titulo, artista, ano, genero, formato, preco },
                { new: true }
            );
            if (!vinilAtualizado) {
                return res.status(404).json({ message: "Vinil não encontrado" });
            }
            res.json(vinilAtualizado);
        } catch (error) {
            res.status(500).json({ message: "Erro ao atualizar vinil", error });
        }
    }
}