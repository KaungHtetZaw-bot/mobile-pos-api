import prisma from "../prisma/client";

export const OrderItemService = {
  getAll: async (page = 1 , size = 20) => {
    return prisma.orderItem.findMany({
      include: {
        order: true,
      },
      take: 20
    });
  },

  getById: async (id: number) => {
    return prisma.orderItem.findUnique({
      where: { id: id },
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
};