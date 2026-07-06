import prisma from "../../src/prisma/client";

export async function seedSettings() {
  await prisma.setting.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      shopName: "Mobile POS",
      shopPhone: "09912345678",
      shopAddress: "Yangon",
      currency: "MMK",
      logo: "",
    },
  });

  console.log("✅ Settings seeded");
}