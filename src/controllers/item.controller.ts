import { Request, Response } from "express";
import { ItemService } from "../services/item.service";
export const ItemController = {
  getAll: async (req: Request, res: Response) => {
    const data = await ItemService.getAll();
    res.json(data);
  },

  getById: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data = await ItemService.getById(id);
    res.json(data);
  },

  create: async (req: Request, res: Response) => {
    const data = await ItemService.create(req.body);
    res.json(data);
  },

  update: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data = await ItemService.update(id, req.body);
    res.json(data);
  },

  delete: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data = await ItemService.delete(id);
    res.json(data);
  },
};