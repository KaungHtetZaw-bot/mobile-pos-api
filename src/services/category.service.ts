import prisma from "../prisma/client";

export const CategoryService = {
  getAll: async () => {
    return prisma.relatedItemCategory.findMany({
      include: {
        items: true,
      },
    });
  },

  getById: async (id: number) => {
    return prisma.relatedItemCategory.findUnique({
      where: { id },
      include: {
        items: true,
      },
    });
  },

  create: async (data: any) => {
    return prisma.relatedItemCategory.create({
      data,
    });
  },

  update: async (id: number, data: any) => {
    return prisma.relatedItemCategory.update({
      where: { id },
      data,
    });
  },

  delete: async (id: number) => {
    return prisma.relatedItemCategory.delete({
      where: { id },
    });
  },
};