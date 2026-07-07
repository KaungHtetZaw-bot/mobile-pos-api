-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OrderItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderId" INTEGER NOT NULL,
    "mobileModelId" INTEGER,
    "relatedItemId" INTEGER,
    "quantity" INTEGER NOT NULL,
    "sellingPrice" REAL NOT NULL,
    "total" REAL NOT NULL,
    CONSTRAINT "OrderItem_mobileModelId_fkey" FOREIGN KEY ("mobileModelId") REFERENCES "MobileModel" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "OrderItem_relatedItemId_fkey" FOREIGN KEY ("relatedItemId") REFERENCES "RelatedItem" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OrderItem" ("id", "mobileModelId", "orderId", "quantity", "sellingPrice", "total") SELECT "id", "mobileModelId", "orderId", "quantity", "sellingPrice", "total" FROM "OrderItem";
DROP TABLE "OrderItem";
ALTER TABLE "new_OrderItem" RENAME TO "OrderItem";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
