/*
  Warnings:

  - You are about to drop the column `cartId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CartToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_userId_fkey";

-- DropForeignKey
ALTER TABLE "_CartToProduct" DROP CONSTRAINT "_CartToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_CartToProduct" DROP CONSTRAINT "_CartToProduct_B_fkey";

-- DropIndex
DROP INDEX "User_cartId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "cartId";

-- DropTable
DROP TABLE "Cart";

-- DropTable
DROP TABLE "_CartToProduct";

-- CreateTable
CREATE TABLE "SingleProductInCart" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "SingleProductInCart_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SingleProductInCart" ADD CONSTRAINT "SingleProductInCart_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SingleProductInCart" ADD CONSTRAINT "SingleProductInCart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
