import express from "express";
import v1Router from "./routes";

const app = express();

app.use(express.json());

app.use("/v1/api/",v1Router);

export default app;