import { Request, Response } from "express";
import { SettingService } from "../services/setting.service";

export const SettingController = {
  getAll: async (req: Request, res: Response) => {
    const data = await SettingService.getAll();
    res.json(data);
  },

  update: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data = await SettingService.update(id, req.body);
    res.json(data);
  },
};