import { seedRoles } from "./seeder/role.seeder";
import { seedUsers } from "./seeder/user.seeder";
import { seedSettings } from "./seeder/setting.seeder";
import { seedModels } from "./seeder/mobile-model.seeder";
import { seedBrands } from "./seeder/mobile-brand.seeder";
import { seedRelatedItemCategory } from "./seeder/related-item-category.seeder";
import { seedRelatedItem } from "./seeder/related-item.seeder";
import { seedOrders } from "./seeder/order.seeder";
import { seedOrderItems } from "./seeder/order-item.seeder";
import prisma from "../src/prisma/client";

async function main() {
  await seedRoles();
  await seedUsers();
  await seedBrands();
  await seedModels();
  await seedRelatedItemCategory();
  await seedRelatedItem();
  await seedOrders();
  await seedOrderItems();
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