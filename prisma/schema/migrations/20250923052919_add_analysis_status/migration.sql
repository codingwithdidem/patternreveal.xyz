-- CreateEnum
CREATE TYPE "public"."AnalysisStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED', 'FAILED');

-- AlterTable
ALTER TABLE "public"."Reflection" ADD COLUMN     "analysisStatus" "public"."AnalysisStatus" NOT NULL DEFAULT 'NOT_STARTED';
