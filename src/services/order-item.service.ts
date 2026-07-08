import prisma from "../prisma/client";

export const OrderItemService = {
  getAll: async () => {
    return prisma.orderItem.findMany({
      include: {
        order: true,
      },
    });
  },

  getById: async (id: number) => {
    return prisma.orderItem.findUnique({
      where: { id },
      include: {
        order: true,
      },
    });
  },

  create: async (data: any) => {
    return prisma.orderItem.create({
      data,
    });
  },

  update: async (id: number, data: any) => {
    return prisma.orderItem.update({
      where: { id },
      data,
    });
  },

  delete: async (id: number) => {
    return prisma.orderItem.delete({
      where: { id },
    });
  },
  getTopSelling: async () => {
    return prisma.orderItem.groupBy({
        by: ['productId'],
        _sum: {
            quantity: true
        },
        orderBy: {
            _sum: {
                quantity: "desc"
            }
        },
        take: 5
    });
  },
};