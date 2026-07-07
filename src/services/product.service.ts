import prisma from "../prisma/client";

export const ProductService = {
  getAll: async () => {
    return prisma.product.findMany({
      include: {
        category: true,
      },
    });
  },

  getById: async (id: number) => {
    return prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });
  },

  create: async (data: any) => {
    return prisma.product.create({
      data,
    });
  },

  update: async (id: number, data: any) => {
    return prisma.product.update({
      where: { id },
      data,
    });
  },

  delete: async (id: number) => {
    return prisma.product.delete({
      where: { id },
    });
  },
};