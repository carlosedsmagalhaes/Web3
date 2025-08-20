import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class CarroController {
  createCarro = async (req: Request, res: Response) => {
    const { modelo, marca, ano } = req.body;
    const anoInt:number = Number(ano);
    
    try {
      const carro = await prisma.carro.create({
        data: {
          modelo,
          marca,
          ano: anoInt,
        },
      });

      res.status(201).json(carro);
    } catch (error) {
      console.error("Erro ao criar carro:", error);
      res.status(500).json({ error: "Erro ao criar carro" });
    }
  };

  getCarros = async (req: Request, res: Response) => {
    try {
      const carros = await prisma.carro.findMany();
      res.status(200).json(carros);
    } catch (error) {
      console.error("Erro ao buscar carros:", error);
      res.status(500).json({ error: "Erro ao buscar carros" });
    }
  };

  getCarroById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const carro = await prisma.carro.findUnique({
        where: { id: Number(id) },
      });

      if (!carro) {
        return res.status(404).json({ error: "Carro não encontrado" });
      }

      res.status(200).json(carro);
    } catch (error) {
      console.error("Erro ao buscar carro:", error);
      res.status(500).json({ error: "Erro ao buscar carro" });
    }
  };

  putCarro = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { modelo, marca, ano } = req.body;

    try {
      const carro = await prisma.carro.update({
        where: { id: Number(id) },
        data: { modelo, marca, ano },
      });

      res.status(200).json(carro);
    } catch (error) {
      console.error("Erro ao atualizar carro:", error);
      res.status(500).json({ error: "Erro ao atualizar carro" });
    }
  };

  deleteCarro = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      await prisma.carro.delete({
        where: { id: Number(id) },
      });

      res.status(204).send();
    } catch (error) {
      console.error("Erro ao deletar carro:", error);
      res.status(500).json({ error: "Erro ao deletar carro" });
    }
  };
}

export default CarroController;
