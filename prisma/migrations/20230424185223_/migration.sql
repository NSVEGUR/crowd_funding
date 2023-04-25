/*
  Warnings:

  - You are about to drop the column `amount_collected` on the `campaigns` table. All the data in the column will be lost.
  - You are about to drop the column `end_date` on the `campaigns` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `campaigns` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `customer_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[customerId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `endDate` to the `campaigns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `campaigns` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "campaigns" DROP CONSTRAINT "campaigns_user_id_fkey";

-- DropIndex
DROP INDEX "users_customer_id_key";

-- AlterTable
ALTER TABLE "campaigns" DROP COLUMN "amount_collected",
DROP COLUMN "end_date",
DROP COLUMN "user_id",
ADD COLUMN     "amountCollected" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "created_at",
DROP COLUMN "customer_id",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "customerId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "users_customerId_key" ON "users"("customerId");

-- AddForeignKey
ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
