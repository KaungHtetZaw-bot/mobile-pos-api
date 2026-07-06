import { seedRoles } from "./seeder/role.seeder";
import { seedUsers } from "./seeder/user.seeder";
import { seedSettings } from "./seeder/setting.seeder";
import { seedModels } from "./seeder/mobile-model.seeder";
import { seedBrands } from "./seeder/mobile-brand.seeder";
import prisma from "../src/prisma/client";

async function main() {
  await seedRoles();
  await seedUsers();
  await seedBrands();
  await seedModels();
  await seedSettings();

  console.log("✅ Database seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });