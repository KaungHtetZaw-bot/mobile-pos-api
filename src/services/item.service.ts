import prisma from "../prisma/client";

export const ItemService = {
  getAll: async () => {
    return prisma.relatedItem.findMany({
      include: {
        category: true,
      },
    });
  },

  getById: async (id: number) => {
    return prisma.relatedItem.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });
  },

  create: async (data: any) => {
    return prisma.relatedItem.create({
      data,
    });
  },

  update: async (id: number, data: any) => {
    return prisma.relatedItem.update({
      where: { id },
      data,
    });
  },

  delete: async (id: number) => {
    return prisma.relatedItem.delete({
      where: { id },
    });
  },
};