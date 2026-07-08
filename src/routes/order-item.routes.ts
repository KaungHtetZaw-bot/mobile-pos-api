import { Router } from "express";
import { OrderItemController } from "../controllers/order-item.controller"; 
const router = Router();

router.get("/", OrderItemController.getAll);
router.get("/:id", OrderItemController.getById);
router.post("/", OrderItemController.create);
router.put("/:id", OrderItemController.update);
router.delete("/:id", OrderItemController.delete);
router.get("/top-selling", OrderItemController.getTopSelling);

export default router;