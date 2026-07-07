import prisma from "../prisma/client";

export const CategoryService = {
  getAll: async () => {
    return prisma.category.findMany({
      include: {
        products: true,
      },
    });
  },

  getById: async (id: number) => {
    return prisma.category.findUnique({
      where: { id },
      include: {
        products: true,
      },
    });
  },

  create: async (data: any) => {
    return prisma.category.create({
      data,
    });
  },

  update: async (id: number, data: any) => {
    return prisma.category.update({
      where: { id },
      data,
    });
  },

  delete: async (id: number) => {
    return prisma.category.delete({
      where: { id },
    });
  },
};