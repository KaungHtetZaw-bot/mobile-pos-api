import { Router } from "express";
import authRoutes from "./auth.routes";
import brandRoutes from "./brand.routes";
import modelRoutes from "./model.routes";
import itemRoutes from "./item.routes";
import categoryRoutes from "./category.routes"
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

router.use("/", authRoutes); 

router.use("/brands", authenticateToken, brandRoutes);
router.use("/models", authenticateToken, modelRoutes);
router.use("/categories", categoryRoutes);
router.use("/items", itemRoutes);

export default router;