import prisma from "../prisma/client";

export const OrderService = {
  getAll: async (page = 1, size = 20) => {
    const currentPage = Math.max(1, page);
    const skip = ( currentPage - 1 ) * size
    const [ orders, totalCount ] = await prisma.$transaction([
      prisma.order.findMany({
        skip,
        take: size,
        orderBy: {
          id: 'desc',
        },
      }),
      prisma.order.count()
    ])

    return {
      data: orders,
      meta: {
        totalItems: totalCount,
        currentPage: currentPage,
        pageSize: size,
        totalPages: Math.ceil(totalCount / size),
      },
    };
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