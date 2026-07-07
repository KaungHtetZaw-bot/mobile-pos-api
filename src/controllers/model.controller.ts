import { Request, Response } from "express";
import { ModelService } from "../services/model.service";
export const ModelController = {
  getAll: async (req: Request, res: Response) => {
    const data = await ModelService.getAll();
    res.json(data);
  },

  getById: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data = await ModelService.getById(id);
    res.json(data);
  },

  create: async (req: Request, res: Response) => {
    const data = await ModelService.create(req.body);
    res.json(data);
  },

  update: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data = await ModelService.update(id, req.body);
    res.json(data);
  },

  delete: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data = await ModelService.delete(id);
    res.json(data);
  },
};