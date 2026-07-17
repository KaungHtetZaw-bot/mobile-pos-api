import { Request, Response } from "express";
import { DashBoardService } from "../services/dashboard.service";

export const DashboardController = {

  getInitData: async (req: Request, res: Response) => {
    const threshold = Number(req.query.threshold) || 5;
     try {
      const [
        profit,
        stock,
        topSelling
      ] = await Promise.all([
        DashBoardService.getActualMonthlyProfit(),
        DashBoardService.getLowStock(threshold),
        DashBoardService.getTopSelling()
      ]);


      return res.json({
        profit,
        stock,
        topSelling
      });

    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Failed to load dashboard data"
      });
    }
  },

  getChartData: async (req: Request, res:Response) => {
    const data = DashBoardService.getHourlyRevenueData()
    return res.json(data)
  }

};