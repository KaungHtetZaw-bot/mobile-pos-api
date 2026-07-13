import prisma from "../prisma/client";

export const DashBoardService = {
    getActualMonthlyProfit: async () => {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const previousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const currentResult = await prisma.$queryRaw<
            {
                revenue: number;
                cogs: number;
                grossProfit: number;
            }[]
            >`
            SELECT
                SUM(oi.total) AS revenue,
                SUM(p.purchasePrice * oi.quantity) AS cogs,
                SUM(oi.total - (p.purchasePrice * oi.quantity)) AS grossProfit
            FROM OrderItem oi
            JOIN Product p ON p.id = oi.productId
            JOIN "Order" o ON o.id = oi.orderId
            WHERE o.createdAt >= ${startOfMonth};
            `;

        const previousResult = await prisma.$queryRaw<
            {
                revenue: number;
                cogs: number;
                grossProfit: number;
            }[]
            >`
            SELECT
                SUM(oi.total) AS revenue,
                SUM(p.purchasePrice * oi.quantity) AS cogs,
                SUM(oi.total - (p.purchasePrice * oi.quantity)) AS grossProfit
            FROM OrderItem oi
            JOIN Product p ON p.id = oi.productId
            JOIN "Order" o ON o.id = oi.orderId
            WHERE o.createdAt >= ${previousMonth}
            AND o.createdAt < ${startOfMonth};
        `;
        const current = currentResult[0] || { revenue: 0, cogs: 0, grossProfit: 0 };
        const previous = previousResult[0] || { revenue: 0, cogs: 0, grossProfit: 0 };

        
        const currentMargin = current.revenue > 0 ? (current.grossProfit / current.revenue) * 100 : 0;
        const previousMargin = previous.revenue > 0 ? (previous.grossProfit / previous.revenue) * 100 : 0;

        const marginGap = currentMargin - previousMargin;
        const revenueGap = previous.revenue > 0 
        ? ((current.revenue - previous.revenue) / previous.revenue) * 100 
        : 100;
        const formattedRevenueGap = `${revenueGap >= 0 ? '+' : ''}${revenueGap.toFixed(1)}%`;
        return {
        currentMonth: {
            totalRevenue: current.revenue,
            actualGrossProfit: current.grossProfit,
            actualMargin: `${currentMargin.toFixed(1)}%`,
        },
        previousMonth: {
            totalRevenue: previous.revenue,
            actualGrossProfit: previous.grossProfit,
            actualMargin: `${previousMargin.toFixed(1)}%`,
        },
        marginGap: `${marginGap.toFixed(1)}%`,
        revenueGap: formattedRevenueGap
        };
    },

    getTopSelling: async () => {
        const topSales = await prisma.orderItem.groupBy({
            by: ['productId'],
            _sum: {
            quantity: true
            },
            orderBy: {
            _sum: {
                quantity: "desc"
            }
            },
            where: {
            productId: { not: null }
            },
            take: 5
        });

        const productIds = topSales
        .map(item => item.productId)
        .filter((id): id is number => id !== null);

        const products = await prisma.product.findMany({
            where: {
            id: { in: productIds }
            },
        });

        return topSales.map(sale => ({
            ...sale,
            product: products.find(p => p.id === sale.productId)
        }));
    },

    getLowStock: async ( threshold = 10 ) => {
    return prisma.product.findMany({
      where: {
        stockQty:{
          lte: Number(threshold),
        }  
      },
      orderBy: {
        stockQty: 'asc',
      },
    });
  },
}