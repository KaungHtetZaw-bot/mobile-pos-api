import prisma from "../prisma/client";

export const OrderService = {
  getAll: async () => {
    return prisma.order.findMany({
      include: {
        items: true,
      },
    });
  },

  getById: async (id: number) => {
    return prisma.order.findUnique({
      where: { id },
      include: {
        items: true,
      },
    });
  },

  create: async (data: any) => {
    return prisma.order.create({
      data,
    });
  },

  update: async (id: number, data: any) => {
    return prisma.order.update({
      where: { id },
      data,
    });
  },

  delete: async (id: number) => {
    return prisma.order.delete({
      where: { id },
    });
  },
};