import express from "express";
import { authenticateToken } from "./middleware/auth.middleware";
import brandRoutes from "./routes/brand.routes";
import authRoutes from "./routes/auth.routes"

const app = express();

app.use(express.json());

app.use("/v1/api/brands",authenticateToken, brandRoutes);
app.use("/v1/api", authRoutes);

export default app;