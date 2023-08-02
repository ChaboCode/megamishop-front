-- AlterTable
ALTER TABLE "product" ADD COLUMN     "colors" TEXT[] DEFAULT ARRAY[]::TEXT[];
