/*
  Warnings:

  - You are about to drop the column `donations` on the `campaigns` table. All the data in the column will be lost.
  - You are about to drop the column `donators` on the `campaigns` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `users` table. All the data in the column will be lost.
  - Added the required column `type` to the `campaigns` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CampaignType" AS ENUM ('Personal', 'NGO', 'Education', 'Others');

-- DropIndex
DROP INDEX "users_customerId_key";

-- AlterTable
ALTER TABLE "campaigns" DROP COLUMN "donations",
DROP COLUMN "donators",
ADD COLUMN     "othersType" TEXT,
ADD COLUMN     "type" "CampaignType" NOT NULL,
ADD COLUMN     "userName" TEXT NOT NULL DEFAULT 'Anonymous';

-- AlterTable
ALTER TABLE "users" DROP COLUMN "customerId",
ADD COLUMN     "name" TEXT;

-- CreateTable
CREATE TABLE "donations" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "anonymous" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "donations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stripe_users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "userId" TEXT,

    CONSTRAINT "stripe_users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stripe_users_email_key" ON "stripe_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "stripe_users_userId_key" ON "stripe_users"("userId");

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "stripe_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stripe_users" ADD CONSTRAINT "stripe_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
