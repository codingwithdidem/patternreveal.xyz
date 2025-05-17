/*
  Warnings:

  - You are about to drop the column `linkId` on the `Reflection` table. All the data in the column will be lost.
  - You are about to drop the column `shortLink` on the `Reflection` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[reflectionId]` on the table `Report` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Reflection" DROP COLUMN "linkId",
DROP COLUMN "shortLink";

-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "index" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "password" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Report_reflectionId_key" ON "Report"("reflectionId");
