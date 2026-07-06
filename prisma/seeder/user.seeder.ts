import bcrypt from "bcrypt";
import prisma from "../../src/prisma/client";

export async function seedUsers() {
  const password = await bcrypt.hash("123456", 10);

  const adminRole = await prisma.role.findUnique({
    where: { name: "Admin" },
  });

  if (!adminRole) {
    throw new Error("Admin role not found.");
  }

  await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      roleId: adminRole.id,
      name: "Administrator",
      username: "admin",
      email: "admin@mobilepos.com",
      phone: "0911111111",
      avatar: "/uploads/avatars/admin.png",
      password,
      status: "ACTIVE",
    },
  });

  console.log("✅ Users seeded");
}