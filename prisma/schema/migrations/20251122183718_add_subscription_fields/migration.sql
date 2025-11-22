-- AlterTable
ALTER TABLE "public"."Workspace" ADD COLUMN     "subscriptionCancelledAt" TIMESTAMP(3),
ADD COLUMN     "subscriptionStatus" TEXT;
