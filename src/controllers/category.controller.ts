import { Request, Response } from "express";
import { CategoryService } from "../services/category.service";
export const CategoryController = {
  getAll: async (req: Request, res: Response) => {
    const data = await CategoryService.getAll();
    res.json(data);
  },

  getById: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data = await CategoryService.getById(id);
    res.json(data);
  },

  create: async (req: Request, res: Response) => {
    const data = await CategoryService.create(req.body);
    res.json(data);
  },

  update: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data = await CategoryService.update(id, req.body);
    res.json(data);
  },

  delete: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data = await CategoryService.delete(id);
    res.json(data);
  },
};