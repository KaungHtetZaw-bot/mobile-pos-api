import { Request, Response } from "express";
import { OrderService } from "../services/order.service"; 

export const OrderController = {
  getAll: async (req: Request, res: Response) => {
    const data = await OrderService.getAll();
    res.json(data);
  },

  getById: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data = await OrderService.getById(id);
    res.json(data);
  },

  create: async (req: Request, res: Response) => {
    const data = await OrderService.create(req.body);
    res.json(data);
  },

  update: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data = await OrderService.update(id, req.body);
    res.json(data);
  },

  delete: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data = await OrderService.delete(id);
    res.json(data);
  },
};