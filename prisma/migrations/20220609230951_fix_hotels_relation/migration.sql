/*
  Warnings:

  - You are about to drop the column `accomodationType` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the `RoomUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_accomodationType_fkey";

-- DropForeignKey
ALTER TABLE "RoomUser" DROP CONSTRAINT "RoomUser_hotelId_fkey";

-- DropForeignKey
ALTER TABLE "RoomUser" DROP CONSTRAINT "RoomUser_roomId_fkey";

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "accomodationType",
ADD COLUMN     "name" VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE "RoomUser";

-- CreateTable
CREATE TABLE "Bed" (
    "id" SERIAL NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "roomId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Bed_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bed" ADD CONSTRAINT "Bed_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bed" ADD CONSTRAINT "Bed_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
