-- AlterTable
ALTER TABLE "cart" ALTER COLUMN "purchaseAt" DROP NOT NULL,
ALTER COLUMN "purchaseID" DROP NOT NULL;

-- AlterTable
ALTER TABLE "cart_product" ALTER COLUMN "deletedDate" DROP NOT NULL;
