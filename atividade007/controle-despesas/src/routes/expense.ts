import { Router } from "express";
import ExpenseController from "../controllers/expense";

const router = Router();
const controller = new ExpenseController();

router.post("/expenses", controller.create);
router.get("/expenses", controller.getAll);
router.get("/expenses/total", controller.getTotalExpenses);
router.put("/expenses/:id", controller.update);
router.delete("/expenses/:id", controller.delete);

export default router;
