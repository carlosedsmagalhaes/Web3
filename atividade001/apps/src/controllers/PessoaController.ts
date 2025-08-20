import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class PessoaController {
  createPessoa = async (req: Request, res: Response) => {
    const { nome, email } = req.body;
    try {
      if (!nome || !email) {
        return res.status(400).json({ error: "Nome e email são obrigatórios" });
      }

      const pessoa = await prisma.pessoa.create({
        data: {
          nome,
          email,
        },
      });
      res.status(201).json(pessoa);
    } catch (error) {
      console.error("Erro ao criar pessoa:", error);
      res.status(500).json({ error: "Erro ao criar pessoa" });
    }
  };

  getPessoas = async (req: Request, res: Response) => {
    try {
      const pessoas = await prisma.pessoa.findMany();
      res.status(200).json(pessoas);
    } catch {
      res.status(500).json({ error: "Erro ao buscar pessoas" });
    }
  };

  getPessoaById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const pessoa = await prisma.pessoa.findUnique({
        where: { id: Number(id) },
      });

      if (!pessoa) {
        return res.status(404).json({ error: "Pessoa não encontrada" });
      }

      res.status(200).json(pessoa);
    } catch (error) {
      console.error("Erro ao buscar pessoa:", error);
      res.status(500).json({ error: "Erro ao buscar pessoa" });
    }
  };

  putPessoa = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nome, email } = req.body;

    try {
      const pessoa = await prisma.pessoa.update({
        where: { id: Number(id) },
        data: { nome, email },
      });

      res.status(200).json(pessoa);
    } catch (error) {
      console.error("Erro ao atualizar pessoa:", error);
      res.status(500).json({ error: "Erro ao atualizar pessoa" });
    }
  };

  deletePessoa = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {

      const pessoasCarros = await prisma.pessoaPorCarro.findFirst({
        where: { pessoaId: Number(id) },
      });

      if (pessoasCarros) {
        return res
          .status(400)
          .json({ error: "Não é possível deletar pessoa associada a um carro" });
      }

      const pessoa = await prisma.pessoa.delete({
        where: { id: Number(id) },
      });

      res.status(200).json(pessoa);
    } catch (error) {
      console.error("Erro ao deletar pessoa:", error);
      res.status(500).json({ error: "Erro ao deletar pessoa" });
    }
  };
}

export default PessoaController;
