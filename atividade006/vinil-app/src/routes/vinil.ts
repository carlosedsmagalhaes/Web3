import { Router } from "express";
import VinilController from "../controllers/vinil";

const router = Router();
const vinilController = new VinilController();

router.get("/vinil", vinilController.getAll);
router.post("/vinil", vinilController.create);
router.delete("/vinil/:id", vinilController.delete);
router.put("/vinil/:id", vinilController.update);

export default router;