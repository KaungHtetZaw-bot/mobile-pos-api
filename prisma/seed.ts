import { seedRoles } from "./seeder/role.seeder";
import { seedUsers } from "./seeder/user.seeder";
import { seedSettings } from "./seeder/setting.seeder";
import { seedProducts } from "./seeder/product.seeder";
import { seedBrands } from "./seeder/brand.seeder";
import { seedCategory } from "./seeder/category.seeder";
import { seedOrders } from "./seeder/order.seeder";
import { seedOrderItems } from "./seeder/order-item.seeder";
import prisma from "../src/prisma/client";

async function main() {
  await seedRoles();
  await seedUsers();
  await seedBrands();
  await seedCategory();
  await seedProducts();
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