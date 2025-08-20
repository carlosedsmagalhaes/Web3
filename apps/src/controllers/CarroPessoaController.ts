import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class CarroPessoaController {
  createPessoaCarro = async (req: Request, res: Response) => {
    const { pessoaId, carroId } = req.body;
    try {
      if (!pessoaId || !carroId) {
        return res
          .status(400)
          .json({ error: "ID da pessoa e do carro são obrigatórios" });
      }

      const carroPessoa = await prisma.pessoaPorCarro.create({
        data: {
          pessoaId,
          carroId,
        },
      });

      res.status(201).json(carroPessoa);
    } catch (error) {
      console.error("Erro ao criar relação entre pessoa e carro:", error);
      res
        .status(500)
        .json({ error: "Erro ao criar relação entre pessoa e carro" });
    }
  };

  getPessoasCarros = async (req: Request, res: Response) => {
    try {
      const pessoasCarros = await prisma.pessoaPorCarro.findMany({
        include: {
          pessoa: true,
          carro: true,
        },
      });
      res.status(200).json(pessoasCarros);
    } catch (error) {
      console.error("Erro ao buscar relações entre pessoas e carros:", error);
      res
        .status(500)
        .json({ error: "Erro ao buscar relações entre pessoas e carros" });
    }
  };

  deletePessoaCarro = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const carroPessoa = await prisma.pessoaPorCarro.delete({
        where: { id: Number(id) },
      });

      res.status(200).json(carroPessoa);
    } catch (error) {
      console.error("Erro ao deletar relação entre pessoa e carro:", error);
      res
        .status(500)
        .json({ error: "Erro ao deletar relação entre pessoa e carro" });
    }
  };
}

export default CarroPessoaController;
