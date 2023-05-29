/*
  Warnings:

  - Added the required column `total` to the `purchase` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "category" AS ENUM ('figures', 'cards', 'clothes', 'cosplay');

-- AlterTable
ALTER TABLE "cart" ADD COLUMN     "isOneTime" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "category" "category" NOT NULL DEFAULT 'figures';

-- AlterTable
ALTER TABLE "purchase" ADD COLUMN     "total" DECIMAL(65,30) NOT NULL;
