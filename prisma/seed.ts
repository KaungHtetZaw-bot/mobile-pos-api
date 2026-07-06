import { seedRoles } from "./seeders/role.seeder";
import { seedUsers } from "./seeders/user.seeder";
import { seedSettings } from "./seeders/setting.seeder";
import { seedModels } from "./seeders/mobile-model.seeder";
import { seedBrands } from "./seeders/mobile-brand.seeder";
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