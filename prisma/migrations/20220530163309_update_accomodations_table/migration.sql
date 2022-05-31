/*
  Warnings:

  - The primary key for the `Accomodation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `isPresent` on the `Accomodation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[type]` on the table `Accomodation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `Accomodation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_accomodationType_fkey";

-- DropIndex
DROP INDEX "Accomodation_isPresent_key";

-- AlterTable
ALTER TABLE "Accomodation" DROP CONSTRAINT "Accomodation_pkey",
DROP COLUMN "isPresent",
ADD COLUMN     "type" VARCHAR(255) NOT NULL,
ADD CONSTRAINT "Accomodation_pkey" PRIMARY KEY ("type");

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "accomodationType" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Accomodation_type_key" ON "Accomodation"("type");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_accomodationType_fkey" FOREIGN KEY ("accomodationType") REFERENCES "Accomodation"("type") ON DELETE RESTRICT ON UPDATE CASCADE;
