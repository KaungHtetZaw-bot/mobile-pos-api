import { Request, Response } from "express";
import { BrandService } from "../services/brand.service";

export const BrandController = {
  getAll: async (req: Request, res: Response) => {
    const data = await BrandService.getAll();
    res.json(data);
  },

  getById: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data = await BrandService.getById(id);
    res.json(data);
  },

  create: async (req: Request, res: Response) => {
    const data = await BrandService.create(req.body);
    res.json(data);
  },

  update: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data = await BrandService.update(id, req.body);
    res.json(data);
  },

  delete: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data = await BrandService.delete(id);
    res.json(data);
  },
};