import { PatternRevealApiError } from "@/lib/api/errors";
import { parseRequestBody } from "@/lib/api/utils";
import { withPermissions } from "@/lib/auth/withPermissions";
import prisma from "@/lib/prisma";
import { reportSchema, updateReportSchema } from "@/lib/zod/schemas/report";
import { NextResponse } from "next/server";

export const PATCH = withPermissions(
  async ({ params, req, headers }) => {
    const { reportId } = params;

    const { success, data } = await updateReportSchema.safeParse(
      await parseRequestBody(req)
    );

    if (!success) {
      throw new PatternRevealApiError({
        code: "bad_request",
        message: "Invalid request body format."
      });
    }

    const { index, password } = data;

    const report = await prisma.report.update({
      where: { id: reportId },
      data: { index, password }
    });

    return NextResponse.json(reportSchema.parse(report), { headers });
  },
  {
    requiredPermissions: ["reflection.write"]
  }
);
