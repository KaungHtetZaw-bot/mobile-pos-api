import express from "express";
import cors from "cors";
import v1Router from "./routes";

const app = express();
app.use(cors())
app.use(express.json());

app.use("/v1/api/",v1Router);

export default app;