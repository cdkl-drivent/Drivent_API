-- CreateTable
CREATE TABLE "Tickets" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Tickets_pkey" PRIMARY KEY ("id")
);
