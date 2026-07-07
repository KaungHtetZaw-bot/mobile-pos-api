import bcrypt from "bcrypt";
import prisma from "../../src/prisma/client";

export async function seedUsers() {
  const password = await bcrypt.hash("123456", 10);

  const adminRole = await prisma.role.findUnique({
    where: { name: "Admin" },
  });
  const cashierRole = await prisma.role.findUnique({
    where: { name: "Cashier" },
  });

  if (!adminRole) {
    throw new Error("Admin role not found.");
  }
  if (!cashierRole) {
    throw new Error("Cashier role not found.");
  }

  await prisma.user.createMany({
    data: [{
      roleId: adminRole.id,
      name: "Administrator",
      username: "admin",
      email: "admin@mobilepos.com",
      phone: "0911111111",
      avatar: "/uploads/avatars/admin.png",
      password,
      status: "ACTIVE",
    },
    {
      roleId: cashierRole.id,
      name: "POS Cashier 1",
      username: "cashier 1",
      email: "cashier1@mobilepos.com",
      phone: "0922222222",
      avatar: "/uploads/avatars/cashier.png",
      password,
      status: "ACTIVE",
    },
    {
      roleId: cashierRole.id,
      name: "POS Cashier 2",
      username: "cashier 2",
      email: "cashier2@mobilepos.com",
      phone: "0933333333",
      avatar: "/uploads/avatars/cashier.png",
      password,
      status: "ACTIVE",
    }]
  });

  console.log("✅ Users seeded");
}