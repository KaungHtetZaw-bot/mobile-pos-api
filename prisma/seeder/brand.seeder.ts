import prisma from "../../src/prisma/client";
const brands = [
  {
    name: "Apple",
    description: "iPhone, iPad and Apple devices",
    status: "ACTIVE",
    logo: "/brands/apple.png",
  },
  {
    name: "Samsung",
    description: "Galaxy smartphones, tablets and electronics",
    status: "ACTIVE",
    logo: "/brands/samsung.png",
  },
  {
    name: "Xiaomi",
    description: "Smartphones and smart devices",
    status: "ACTIVE",
    logo: "/brands/xiaomi.png",
  },
  {
    name: "Oppo",
    description: "Smartphones and mobile accessories",
    status: "ACTIVE",
    logo: "/brands/oppo.png",
  },
  {
    name: "Vivo",
    description: "Smartphones and mobile technology",
    status: "ACTIVE",
    logo: "/brands/vivo.png",
  },
  {
    name: "Realme",
    description: "Affordable smartphones and IoT devices",
    status: "ACTIVE",
    logo: "/brands/realme.png",
  },
  {
    name: "OnePlus",
    description: "Premium smartphones and accessories",
    status: "ACTIVE",
    logo: "/brands/oneplus.png",
  },
  {
    name: "Huawei",
    description: "Smartphones, tablets and networking devices",
    status: "ACTIVE",
    logo: "/brands/huawei.png",
  },
  {
    name: "Nokia",
    description: "Mobile phones and network technology",
    status: "ACTIVE",
    logo: "/brands/nokia.png",
  },
  {
    name: "Infinix",
    description: "Budget and gaming smartphones",
    status: "ACTIVE",
    logo: "/brands/infinix.png",
  },
  {
    name: "Tecno",
    description: "Affordable smartphones",
    status: "ACTIVE",
    logo: "/brands/tecno.png",
  },

  {
    name: "Dell",
    description: "Laptops, desktops and computer accessories",
    status: "ACTIVE",
    logo: "/brands/dell.png",
  },
  {
    name: "HP",
    description: "Laptops, printers and computer products",
    status: "ACTIVE",
    logo: "/brands/hp.png",
  },
  {
    name: "Lenovo",
    description: "ThinkPad laptops and computers",
    status: "ACTIVE",
    logo: "/brands/lenovo.png",
  },
  {
    name: "Asus",
    description: "Gaming laptops and computer hardware",
    status: "ACTIVE",
    logo: "/brands/asus.png",
  },
  {
    name: "Acer",
    description: "Laptops and monitors",
    status: "ACTIVE",
    logo: "/brands/acer.png",
  },
  {
    name: "MSI",
    description: "Gaming laptops and components",
    status: "ACTIVE",
    logo: "/brands/msi.png",
  },

  {
    name: "Sony",
    description: "Audio, cameras and electronics",
    status: "ACTIVE",
    logo: "/brands/sony.png",
  },
  {
    name: "JBL",
    description: "Speakers and audio products",
    status: "ACTIVE",
    logo: "/brands/jbl.png",
  },
  {
    name: "Anker",
    description: "Chargers, power banks and accessories",
    status: "ACTIVE",
    logo: "/brands/anker.png",
  },
  {
    name: "Baseus",
    description: "Mobile accessories and chargers",
    status: "ACTIVE",
    logo: "/brands/baseus.png",
  },
  {
    name: "Logitech",
    description: "Computer accessories and peripherals",
    status: "ACTIVE",
    logo: "/brands/logitech.png",
  },
];

export const seedBrands = async () => {
  for (const brand of brands) {
    await prisma.brand.upsert({
      where: {
        name: brand.name,
      },
      update: {
        description: brand.description,
        status: brand.status,
        logo: brand.logo,
      },
      create: brand,
    });
  }

  console.log("✅ Product brands seeded");
};