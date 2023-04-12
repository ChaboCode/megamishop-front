-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "price" DECIMAL NOT NULL,
    "description" VARCHAR(500) NOT NULL,
    "stock" INTEGER NOT NULL,
    "image" TEXT[],

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);
