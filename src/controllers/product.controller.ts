import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
export const ProductController = {
  getAll: async (req: Request, res: Response) => {
    const page = req.query.page ? Number(req.query.page) : undefined
    const size = req.query.size ? Number(req.query.size) : undefined
    const data = await ProductService.getAll({page,size});
    res.json(data);
  },

  getById: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data = await ProductService.getById(id);
    res.json(data);
  },

  create: async (req: Request, res: Response) => {
    const data = await ProductService.create(req.body);
    res.json(data);
  },

  update: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data = await ProductService.update(id, req.body);
    res.json(data);
  },

  delete: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data = await ProductService.delete(id);
    res.json(data);
  },
};