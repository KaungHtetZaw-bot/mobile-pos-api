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

    getHourlyRevenueData:async()=> {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const orders = await prisma.order.findMany({
            where: {
            createdAt: {
                gte: startOfDay,
                lte: endOfDay,
            },
            },
            select: {
            createdAt: true,
            total: true,
            items: {
                select: {
                quantity: true,
                },
            },
            },
        });

        return aggregateChartData(orders);
    }
}


interface OrderData {
  createdAt: Date;
  total: number;
  items: { quantity: number }[];
}

function aggregateChartData(orders: OrderData[]) {
    type BucketKey =
  | "08:00 AM"
  | "10:00 AM"
  | "12:00 PM"
  | "02:00 PM"
  | "04:00 PM"
  | "06:00 PM"
  | "08:00 PM";
  const chartBuckets:Record<BucketKey, { uv: number; pv: number }> = {
    '08:00 AM': { uv: 0, pv: 0 },
    '10:00 AM': { uv: 0, pv: 0 },
    '12:00 PM': { uv: 0, pv: 0 },
    '02:00 PM': { uv: 0, pv: 0 },
    '04:00 PM': { uv: 0, pv: 0 },
    '06:00 PM': { uv: 0, pv: 0 },
    '08:00 PM': { uv: 0, pv: 0 },
  };

  orders.forEach((order) => {
    const hour = order.createdAt.getHours();
    let bucketKey: BucketKey | undefined;

    if (hour >= 7 && hour < 9) bucketKey = '08:00 AM';
    else if (hour >= 9 && hour < 11) bucketKey = '10:00 AM';
    else if (hour >= 11 && hour < 13) bucketKey = '12:00 PM';
    else if (hour >= 13 && hour < 15) bucketKey = '02:00 PM';
    else if (hour >= 15 && hour < 17) bucketKey = '04:00 PM';
    else if (hour >= 17 && hour < 19) bucketKey = '06:00 PM';
    else if (hour >= 19 && hour < 21) bucketKey = '08:00 PM';
    
    if (!bucketKey) return;

    const totalItemsInOrder = order.items.reduce((sum, item) => sum + item.quantity, 0);

    chartBuckets[bucketKey].uv += totalItemsInOrder; 
    chartBuckets[bucketKey].pv += order.total;
  });

  return (Object.keys(chartBuckets) as BucketKey[]).map((name) => ({
    name,
    uv: chartBuckets[name].uv,
    pv: Number(chartBuckets[name].pv.toFixed(2)),
  }));
}