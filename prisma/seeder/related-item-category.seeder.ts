import prisma from "../../src/prisma/client";

const categoriesData = [
  { name: "Glass Protection", description: "Tempered glass, privacy screens, and camera lens protectors", status: "Active" },
  { name: "Phone Cover", description: "Shockproof cases, leather wallets, and silicone slim covers", status: "Active" },
  { name: "Earphone", description: "In-ear wired and wireless bluetooth earbuds", status: "Active" },
  { name: "Headphone", description: "Over-ear and on-ear wireless headband sets", status: "Active" },
  { name: "Power & Charging", description: "Wall blocks, fast chargers, and power banks", status: "Active" },
  { name: "Mobile Photography Gears", description: "Tripods, ring lights, and smartphone gimbals", status: "Active" },
  { name: "Smart Wearables", description: "Fitness trackers and smart watches", status: "Active" },
  { name: "Workspace Accessories", description: "Ergonomic desk mats and tablet stands", status: "Active" },
  { name: "Cables & Adapters", description: "High durability cables and OTG hubs", status: "Active" },
  { name: "Car Accessories", description: "Car dash mounts and fast chargers", status: "Active" }
];

export const seedRelatedItemCategory = async () => {
    for( const cate of categoriesData ) {
        await prisma.relatedItemCategory.upsert({
            where: {name: cate.name},
            update: {},
            create: cate
        })
    }
    console.log("✅ related item category seeded");
}