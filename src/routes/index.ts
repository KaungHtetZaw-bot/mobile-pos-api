import { Router } from "express";
import authRoutes from "./auth.routes";
import brandRoutes from "./brand.routes";
import productRoutes from "./product.routes";
import categoryRoutes from "./category.routes"
import orderRoutes from "./order.routes"
import orderItemroute from "./order-item.routes"
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

router.use("/", authRoutes); 

router.use("/brands", authenticateToken, brandRoutes);
router.use("/categories", authenticateToken, categoryRoutes);
router.use("/products", authenticateToken, productRoutes);
router.use("/orders", authenticateToken, orderRoutes);
router.use("/order-items", authenticateToken, orderItemroute);

export default router;