import prisma from "../../src/prisma/client";

export const seedOrderItems = async () => {
  const orders = await prisma.order.findMany();

  const mobiles = await prisma.mobileModel.findMany();

  const relatedItems = await prisma.relatedItem.findMany();

  const products = [
    ...mobiles.map((m) => ({
      type: "mobile",
      id: m.id,
      price: m.sellingPrice,
    })),
    ...relatedItems.map((r) => ({
      type: "related",
      id: r.id,
      price: r.sellingPrice,
    })),
  ];

  if (!products.length) {
    console.log("No products found");
    return;
  }

  for (const order of orders) {
    const itemCount = Math.floor(Math.random() * 3) + 1;

    let orderTotal = 0;

    for (let i = 0; i < itemCount; i++) {
      const product =
        products[Math.floor(Math.random() * products.length)];

        if(!product) {
            throw new Error("Product not found.");
        }

      const qty = Math.floor(Math.random() * 3) + 1;

      const total = qty * product.price;

      orderTotal += total;

      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          quantity: qty,
          sellingPrice: product.price,
          total,

          ...(product.type === "mobile"
            ? { mobileModelId: product.id }
            : { relatedItemId: product.id }),
        },
      });
    }

    await prisma.order.update({
      where: { id: order.id },
      data: {
        total: orderTotal,
      },
    });
  }

  console.log("✅ Order Items Seeded");
};