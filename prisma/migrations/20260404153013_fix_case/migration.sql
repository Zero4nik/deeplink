/*
  Warnings:

  - You are about to drop the column `PostId` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `Like` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,uostId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uostId` to the `Like` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Like` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_PostId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_UserId_fkey";

-- DropIndex
DROP INDEX "Like_PostId_idx";

-- DropIndex
DROP INDEX "Like_UserId_PostId_key";

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "PostId",
DROP COLUMN "UserId",
ADD COLUMN     "uostId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Like_uostId_idx" ON "Like"("uostId");

-- CreateIndex
CREATE UNIQUE INDEX "Like_userId_uostId_key" ON "Like"("userId", "uostId");

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_uostId_fkey" FOREIGN KEY ("uostId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
