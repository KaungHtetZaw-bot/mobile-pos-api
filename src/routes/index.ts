import { Router } from "express";
import authRoutes from "./auth.routes";
import brandRoutes from "./brand.routes";
import productRoutes from "./product.routes";
import categoryRoutes from "./category.routes"
import orderRoutes from "./order.routes"
import orderItemRoute from "./order-item.routes"
import settingRoutes from "./setting.routes"
import { authenticateToken } from "../middleware/auth.middleware";
import { DashboardController } from "../controllers/dashboard.controller";

const router = Router();

router.use("/auth", authRoutes); 

router.use("/brands", authenticateToken, brandRoutes);
router.use("/categories", authenticateToken, categoryRoutes);
router.use("/products", authenticateToken, productRoutes);
router.use("/orders", authenticateToken, orderRoutes);
router.use("/order-items", authenticateToken, orderItemRoute);
router.use("/settings", authenticateToken,settingRoutes);
router.get("/dashboard-init-data", authenticateToken, DashboardController.getInitData);

export default router;