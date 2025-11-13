import { Request, Response } from "express";
import Expense from "../models/expense";

export default class ExpenseController {
  async create(req: Request, res: Response) {
    const { description, amount, date } = req.body;

    try {
      const newExpense = new Expense({ description, amount, date });
      await newExpense.save();
      res.status(201).json(newExpense);
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar despesa", error });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const expenses = await Expense.find();
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar despesas", error });
    }
  }

  async getTotalExpenses(req: Request, res: Response) {
    try {
      const sumExpenses = await Expense.aggregate([
        { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
      ]);

      return res.json({
        totalAmount: sumExpenses[0]?.totalAmount || 0,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao calcular total de despesas", error });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { description, amount, date } = req.body;

    try {
      const updateExpense = await Expense.findByIdAndUpdate(
        id,
        { description, amount, date },
        { new: true }
      );

      if (!updateExpense) {
        return res.status(404).json({ message: "Despesa não encontrada" });
      }
      res.json(updateExpense);
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar despesa", error });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const deleteExpense = await Expense.findByIdAndDelete(id);
      if (!deleteExpense) {
        return res.status(404).json({ message: "Despesa não encontrada" });
      }
      res.json({ message: "Despesa removida com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao remover despesa", error });
    }
  }
}
