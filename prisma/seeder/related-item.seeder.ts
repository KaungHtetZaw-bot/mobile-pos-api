import prisma from "../../src/prisma/client";

export const itemsData = [
  // Glass Protection
  { name: "Galaxy S24 Ultra Tempered Glass", brand: "Ringke", purchasePrice: 5.50, sellingPrice: 12.50, stockQty: 150, status: "Active", description: "9H hardness clear screen guard kit", categoryRef: "Glass Protection" },
  { name: "iPhone 15 Pro Privacy Screen Guard", brand: "Spigen", purchasePrice: 7.00, sellingPrice: 15.99, stockQty: 85, status: "Active", description: "Anti-spy 28-degree view blocking shield", categoryRef: "Glass Protection" },
  
  // Phone Cover
  { name: "iPhone 15 Pro Max Liquid Air Case", brand: "Spigen", purchasePrice: 9.00, sellingPrice: 18.00, stockQty: 110, status: "Active", description: "Slim shock-absorption protective cover", categoryRef: "Phone Cover" },
  { name: "Pixel 9 Pro Magnetic Ring Shell", brand: "Ugreen", purchasePrice: 6.20, sellingPrice: 14.50, stockQty: 45, status: "Active", description: "Translucent frosted case with ring stand", categoryRef: "Phone Cover" },
  
  // Earphone
  { name: "Soundcore Liberty 4 NC", brand: "Anker", purchasePrice: 48.00, sellingPrice: 69.99, stockQty: 25, status: "Active", description: "Wireless earbuds with noise reduction", categoryRef: "Earphone" },
  { name: "Premium Type-C Wired Earphone", brand: "Baseus", purchasePrice: 4.50, sellingPrice: 9.99, stockQty: 200, status: "Active", description: "High-res audio DAC built-in wired buds", categoryRef: "Earphone" },
  
  // Headphone
  { name: "Sony WH-CH520 Wireless Headphone", brand: "Sony", purchasePrice: 38.00, sellingPrice: 59.00, stockQty: 15, status: "Active", description: "On-ear lightweight headset with 50H battery", categoryRef: "Headphone" },
  { name: "JBL Tune 720BT Over-Ear", brand: "JBL", purchasePrice: 45.50, sellingPrice: 75.00, stockQty: 12, status: "Active", description: "Pure bass wireless over-ear companion", categoryRef: "Headphone" },
  
  // Power & Charging
  { name: "Anker Prime 65W GaN Wall Charger", brand: "Anker", purchasePrice: 35.00, sellingPrice: 49.99, stockQty: 40, status: "Active", description: "3-Port compact folding adapter", categoryRef: "Power & Charging" },
  { name: "Baseus Magnetic Power Bank 10000mAh", brand: "Baseus", purchasePrice: 18.50, sellingPrice: 29.00, stockQty: 65, status: "Active", description: "MagSafe compatible portable battery", categoryRef: "Power & Charging" },
  
  // Mobile Photography Gears
  { name: "Osmo Mobile SE Gimbal", brand: "DJI", purchasePrice: 72.00, sellingPrice: 99.00, stockQty: 12, status: "Active", description: "3-axis smartphone stabilizer", categoryRef: "Mobile Photography Gears" },
  { name: "Ulanzi MT-44 Extendable Tripod", brand: "Ulanzi", purchasePrice: 11.00, sellingPrice: 19.99, stockQty: 35, status: "Active", description: "2-in-1 selfie stick tripod", categoryRef: "Mobile Photography Gears" },
  
  // Smart Wearables
  { name: "Xiaomi Smart Band 9", brand: "Xiaomi", purchasePrice: 26.00, sellingPrice: 39.00, stockQty: 80, status: "Active", description: "AMOLED fitness tracker", categoryRef: "Smart Wearables" },
  { name: "Amazfit Bip 5 Smartwatch", brand: "Amazfit", purchasePrice: 42.50, sellingPrice: 59.99, stockQty: 18, status: "Active", description: "Large display smartwatch with GPS", categoryRef: "Smart Wearables" },
  
  // Workspace Accessories
  { name: "Aluminum Adjustable Phone Stand", brand: "Ugreen", purchasePrice: 4.20, sellingPrice: 9.99, stockQty: 90, status: "Active", description: "Multi-angle foldable metal bracket", categoryRef: "Workspace Accessories" },
  { name: "Felt Minimalist Desk Mat (Medium)", brand: "Nordik", purchasePrice: 8.00, sellingPrice: 16.50, stockQty: 40, status: "Active", description: "Anti-slip eco-friendly desk pad", categoryRef: "Workspace Accessories" },
  
  // Cables & Adapters
  { name: "Braided USB-C to USB-C 100W Cable", brand: "Ugreen", purchasePrice: 3.50, sellingPrice: 7.99, stockQty: 200, status: "Active", description: "Power Delivery fast charging cord", categoryRef: "Cables & Adapters" },
  { name: "2-in-1 USB 3.0 OTG Card Adapter", brand: "Kingston", purchasePrice: 4.00, sellingPrice: 9.00, stockQty: 85, status: "Active", description: "Type-C and Type-A dual head reader", categoryRef: "Cables & Adapters" },
  
  // Car Accessories
  { name: "Wireless Car Charger Mount 15W", brand: "Baseus", purchasePrice: 15.00, sellingPrice: 26.50, stockQty: 32, status: "Active", description: "Auto-clamping air vent phone cradle", categoryRef: "Car Accessories" },
  { name: "Dual Port Fast Car Charger 45W", brand: "Ugreen", purchasePrice: 5.80, sellingPrice: 11.99, stockQty: 60, status: "Active", description: "Metal body mini car lighter plug", categoryRef: "Car Accessories" }
];

export const seedRelatedItem = async () => {
  const categories = await prisma.relatedItemCategory.findMany();

  const categoryMap = new Map(
    categories.map((category) => [category.name, category.id])
  );

  for (const item of itemsData) {
    const categoryId = categoryMap.get(item.categoryRef);

    if (!categoryId) {
      console.warn(`⚠️ Category not found: ${item.categoryRef}`);
      continue;
    }

    await prisma.relatedItem.createMany({
      data: {
        name: item.name,
        brand: item.brand,
        purchasePrice: item.purchasePrice,
        sellingPrice: item.sellingPrice,
        stockQty: item.stockQty,
        status: item.status,
        description: item.description,
        categoryId,
      },
    });
  }

  console.log("✅ Related items seeded");
};