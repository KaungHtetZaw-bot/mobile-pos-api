/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `MobileBrand` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MobileBrand_name_key" ON "MobileBrand"("name");
