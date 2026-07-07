import prisma from "../prisma/client";

export const BrandService = {
  getAll: async () => {
    return prisma.brand.findMany({
      include: {
        products: true,
      },
    });
  },

  getById: async (id: number) => {
    return prisma.brand.findUnique({
      where: { id },
      include: {
        products: true,
      },
    });
  },

  create: async (data: any) => {
    return prisma.brand.create({
      data,
    });
  },

  update: async (id: number, data: any) => {
    return prisma.brand.update({
      where: { id },
      data,
    });
  },

  delete: async (id: number) => {
    return prisma.brand.delete({
      where: { id },
    });
  },
};