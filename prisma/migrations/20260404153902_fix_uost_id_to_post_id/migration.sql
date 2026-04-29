/*
  Warnings:

  - You are about to drop the column `uostId` on the `Like` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,postId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `postId` to the `Like` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_uostId_fkey";

-- DropIndex
DROP INDEX "Like_uostId_idx";

-- DropIndex
DROP INDEX "Like_userId_uostId_key";

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "uostId",
ADD COLUMN     "postId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Like_postId_idx" ON "Like"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "Like_userId_postId_key" ON "Like"("userId", "postId");

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
