import prisma from "../prisma/client";

export const ModelService = {
  getAll: async () => {
    return prisma.mobileModel.findMany({
      include: {
        brand: true,
      },
    });
  },

  getById: async (id: number) => {
    return prisma.mobileModel.findUnique({
      where: { id },
      include: {
        brand: true,
      },
    });
  },

  create: async (data: any) => {
    return prisma.mobileModel.create({
      data,
    });
  },

  update: async (id: number, data: any) => {
    return prisma.mobileModel.update({
      where: { id },
      data,
    });
  },

  delete: async (id: number) => {
    return prisma.mobileModel.delete({
      where: { id },
    });
  },
};