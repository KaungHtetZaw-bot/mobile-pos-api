import prisma from "../prisma/client";

export const SettingService = {
  getAll: async () => {
    return prisma.setting.findMany({
    });
  },

  update: async (id: number, data: any) => {
    return prisma.setting.update({
      where: { id },
      data,
    });
  },
};