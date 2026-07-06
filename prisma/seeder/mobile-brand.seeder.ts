import prisma from "../../src/prisma/client";
console.log("🌱 Seeding Mobile Brands & Models...");

const brands = [
{ name: "Apple", description: "Premium iPhones", status: "ACTIVE", logo: "/brands/apple.png" },
{ name: "Samsung", description: "Galaxy series", status: "ACTIVE", logo: "/brands/samsung.png" },
{ name: "Xiaomi", description: "Budget flagship killer", status: "ACTIVE", logo: "/brands/xiaomi.png" },
{ name: "Oppo", description: "Camera-focused phones", status: "ACTIVE", logo: "/brands/oppo.png" },
{ name: "Vivo", description: "Mid-range smartphones", status: "ACTIVE", logo: "/brands/vivo.png" },
{ name: "Realme", description: "Affordable performance", status: "ACTIVE", logo: "/brands/realme.png" },
{ name: "OnePlus", description: "Flagship killer brand", status: "ACTIVE", logo: "/brands/oneplus.png" },
{ name: "Huawei", description: "High-end devices", status: "ACTIVE", logo: "/brands/huawei.png" },
{ name: "Nokia", description: "Durable phones", status: "ACTIVE", logo: "/brands/nokia.png" },
{ name: "Infinix", description: "Budget smartphones", status: "ACTIVE", logo: "/brands/infinix.png" },
];

export const seedBrands = async () => {
for (const b of brands) {
    await prisma.mobileBrand.upsert({
    where: { name: b.name },
    update: {},
    create: b,
    });
}
console.log("✅ Brands seeded");
}
