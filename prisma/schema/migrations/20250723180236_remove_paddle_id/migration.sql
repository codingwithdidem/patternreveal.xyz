/*
  Warnings:

  - You are about to drop the column `paddleId` on the `Workspace` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Workspace_paddleId_idx";

-- DropIndex
DROP INDEX "Workspace_paddleId_key";

-- AlterTable
ALTER TABLE "Workspace" DROP COLUMN "paddleId";

-- CreateIndex
CREATE INDEX "Workspace_paddleCustomerId_idx" ON "Workspace"("paddleCustomerId");
