/*
  Warnings:

  - A unique constraint covering the columns `[paddleCustomerId]` on the table `Workspace` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Workspace_paddleCustomerId_key" ON "Workspace"("paddleCustomerId");
