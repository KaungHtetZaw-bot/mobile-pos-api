import prisma from "../prisma/client";

export const ProductService = {
  getAll: async (page = 1, size = 20) => {
    const currentPage = Math.max(1, page);
    const skip = ( currentPage - 1 ) * size
    const [ products, totalCount ] = await prisma.$transaction([
      prisma.product.findMany({
        include: {
          brand: true,
          category: true,
        },
        skip,
        take: size,
        orderBy: {
          id: 'desc',
        },
      }),
      prisma.product.count()
    ])

    return {
      data: products,
      meta: {
        totalItems: totalCount,
        currentPage: currentPage,
        pageSize: size,
        totalPages: Math.ceil(totalCount / size),
      },
    };
  },

  getById: async (id: number) => {
    return prisma.product.findUnique({
      where: { id },
      include: {
        brand:true,
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
  getLowStock: async ( threshold = 10 ) => {
    return prisma.product.findMany({
      where: {
        stockQty:{
          lte: Number(threshold),
        }  
      },
      orderBy: {
        stockQty: 'asc',
      },
    });
  },
};