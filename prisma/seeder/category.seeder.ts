import prisma from "../../src/prisma/client";

const categoriesData = [
  {
    name: "Smart Phone",
    description: "Smart phones from various brands",
    status: "ACTIVE",
  },
  {
    name: "Glass Protection",
    description: "Tempered glass, privacy screens, and camera lens protectors",
    status: "ACTIVE",
  },
  {
    name: "Phone Cover",
    description: "Shockproof cases, leather wallets, and silicone slim covers",
    status: "ACTIVE",
  },
  {
    name: "Earphone",
    description: "Wired and wireless Bluetooth earbuds",
    status: "ACTIVE",
  },
  {
    name: "Headphone",
    description: "Over-ear and on-ear wireless headsets",
    status: "ACTIVE",
  },
  {
    name: "Power & Charging",
    description: "Wall chargers, fast chargers, cables, and power banks",
    status: "ACTIVE",
  },
  {
    name: "Mobile Photography Gears",
    description: "Tripods, ring lights, smartphone gimbals, and camera accessories",
    status: "ACTIVE",
  },
  {
    name: "Smart Wearables",
    description: "Smart watches and fitness trackers",
    status: "ACTIVE",
  },
  {
    name: "Workspace Accessories",
    description: "Tablet stands, desk accessories, and computer accessories",
    status: "ACTIVE",
  },
  {
    name: "Cables & Adapters",
    description: "USB cables, OTG hubs, and connection adapters",
    status: "ACTIVE",
  },
  {
    name: "Car Accessories",
    description: "Car mounts, chargers, and mobile accessories",
    status: "ACTIVE",
  },
  {
  name: "Tablet",
  description: "Android tablets and iPads",
  status: "ACTIVE"
},
{
  name: "Laptop",
  description: "Business and gaming laptops",
  status: "ACTIVE"
},
{
  name: "Computer Accessories",
  description: "Keyboard, mouse, webcam, and USB devices",
  status: "ACTIVE"
},
{
  name: "Smart Home",
  description: "Smart cameras, smart plugs, and IoT devices",
  status: "ACTIVE"
},
{
  name: "Gaming Accessories",
  description: "Controllers, gaming headsets, and gaming gear",
  status: "ACTIVE"
}
];

export const seedCategory = async () => {
  for (const category of categoriesData) {
    await prisma.category.upsert({
      where: {
        name: category.name,
      },
      update: {
        description: category.description,
        status: category.status,
      },
      create: category,
    });
  }

  console.log("✅ Categories seeded");
};