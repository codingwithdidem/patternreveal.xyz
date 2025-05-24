import { withPermissions } from "@/lib/auth/withPermissions";
import prisma from "@/lib/prisma";
import { getReflectionOrThrow } from "../../get-reflection-or-throw";
import { NextResponse } from "next/server";
import { reportSchema, updateReportSchema } from "@/lib/zod/schemas/report";

// GET /reflections/[reflectionId]/report – get shared report for a given reflection
export const GET = withPermissions(
  async ({ params, req, headers }) => {
    const { reflectionId } = params;

    try {
      const reflection = await getReflectionOrThrow({
        reflectionId
      });

      const report = await prisma.report.findFirst({
        where: {
          reflectionId: reflection.id
        }
      });

      if (!report) {
        return NextResponse.json({ shortLink: null }, { headers });
      }

      // Convert dates to ISO strings before validation
      const reportWithDates = {
        ...report,
        createdAt: report.createdAt.toISOString(),
        updatedAt: report.updatedAt.toISOString(),
        expiresAt: report.expiresAt?.toISOString() || null
      };

      try {
        const parsedReport = reportSchema.parse(reportWithDates);
        console.log("Successfully parsed report:", parsedReport);
        return NextResponse.json(parsedReport, { headers });
      } catch (error) {
        console.error("Schema validation error:", error);
        throw error;
      }
    } catch (error) {
      console.error("Error in report fetch:", error);
      throw error;
    }
  },
  {
    requiredPermissions: ["reflection.read"]
  }
);
