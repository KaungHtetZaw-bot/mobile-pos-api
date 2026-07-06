import prisma from "../../src/prisma/client";

export async function seedRoles() {
  const roles = [
    {  
      name: "Admin",
      description: "System Administrator",
    },
    {
      name: "Manager",
      description: "Store Manager",
    },
    {
      name: "Cashier",
      description: "POS Cashier",
    },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where:{name: role.name},
      update: role,
      create: role,
    });
  }

  console.log("✅ Roles seeded");
}