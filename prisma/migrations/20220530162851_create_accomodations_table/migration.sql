/*
  Warnings:

  - Added the required column `accomodationType` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "accomodationType" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "Accomodation" (
    "isPresent" BOOLEAN NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Accomodation_pkey" PRIMARY KEY ("isPresent")
);

-- CreateIndex
CREATE UNIQUE INDEX "Accomodation_isPresent_key" ON "Accomodation"("isPresent");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_accomodationType_fkey" FOREIGN KEY ("accomodationType") REFERENCES "Accomodation"("isPresent") ON DELETE RESTRICT ON UPDATE CASCADE;
