import { Router } from "express";
import { SettingController } from "../controllers/setting.controller";

const router = Router();

router.get("/", SettingController.getAll);
router.put("/:id", SettingController.update);

export default router;