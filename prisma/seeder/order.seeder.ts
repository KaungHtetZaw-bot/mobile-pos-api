import prisma from "../../src/prisma/client";

const paymentMethods = [
  "Cash",
  "KBZ Pay",
  "Wave Pay",
  "AYA Pay",
];

const customers = [
  "John",
  "David",
  "Alice",
  "Emma",
  "William",
  "Daniel",
  "Olivia",
  "Sophia",
  "Lucas",
  "Noah",
];

export const seedOrders = async () => {
  const user = await prisma.user.findFirst();

  if (!user) {
    console.log("No user found");
    return;
  }

  const customerName = customers[Math.floor(Math.random() * customers.length)]
  const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)]

  if(!customerName) {
    throw new Error("Customer name not found.");
  }
  if(!paymentMethod) {
    throw new Error("Payment method not found.");
  }

  let invoice = 200001;

  for (let i = 0; i < 100; i++) {
    await prisma.order.create({
      data: {
        invoiceNo: `INV-${invoice++}`,
        customerName,
        paymentMethod,
        remarks: "",
        userId: user.id,
        total: 0,
      },
    });
  }

  console.log("✅ Orders Seeded");
};