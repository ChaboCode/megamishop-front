-- CreateEnum
CREATE TYPE "rarity" AS ENUM ('r', 'sr', 'ssr', 'ur');

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "rarity" "rarity" NOT NULL DEFAULT 'r';
