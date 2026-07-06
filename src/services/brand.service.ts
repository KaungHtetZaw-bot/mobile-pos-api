import prisma from "../prisma/client";

export const BrandService = {
  getAll: async () => {
    return prisma.mobileBrand.findMany({
      include: {
        models: true,
      },
    });
  },

  getById: async (id: number) => {
    return prisma.mobileBrand.findUnique({
      where: { id },
      include: {
        models: true,
      },
    });
  },

  create: async (data: any) => {
    return prisma.mobileBrand.create({
      data,
    });
  },

  update: async (id: number, data: any) => {
    return prisma.mobileBrand.update({
      where: { id },
      data,
    });
  },

  delete: async (id: number) => {
    return prisma.mobileBrand.delete({
      where: { id },
    });
  },
};