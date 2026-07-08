import { Request, Response } from "express";
import { OrderItemService } from "../services/order-item.service";
export const OrderItemController = {
  getAll: async (req: Request, res: Response) => {
    const data = await OrderItemService.getAll();
    res.json(data);
  },

  getById: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data = await OrderItemService.getById(id);
    res.json(data);
  },

  create: async (req: Request, res: Response) => {
    const data = await OrderItemService.create(req.body);
    res.json(data);
  },

  update: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data = await OrderItemService.update(id, req.body);
    res.json(data);
  },

  delete: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data = await OrderItemService.delete(id);
    res.json(data);
  },
  getTopSelling: async (req: Request, res: Response) => {
    const data = await OrderItemService.getTopSelling();
    res.json(data);
  },
};