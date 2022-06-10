/*
  Warnings:

  - You are about to drop the `Bed` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HotelRoom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Room` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bed" DROP CONSTRAINT "Bed_roomId_fkey";

-- DropForeignKey
ALTER TABLE "Bed" DROP CONSTRAINT "Bed_userId_fkey";

-- DropForeignKey
ALTER TABLE "HotelRoom" DROP CONSTRAINT "HotelRoom_hotelId_fkey";

-- DropForeignKey
ALTER TABLE "HotelRoom" DROP CONSTRAINT "HotelRoom_roomId_fkey";

-- AlterTable
ALTER TABLE "Hotel" ADD COLUMN     "availableBeds" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "roomTypes" TEXT NOT NULL DEFAULT E'single';

-- DropTable
DROP TABLE "Bed";

-- DropTable
DROP TABLE "HotelRoom";

-- DropTable
DROP TABLE "Room";
