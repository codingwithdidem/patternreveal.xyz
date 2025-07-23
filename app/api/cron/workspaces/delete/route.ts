import { handleAndReturnErrorResponse } from "@/lib/api/errors";
import { queueWorkspaceDeletion } from "@/lib/api/workspaces";
import { verifyQstashSignature } from "@/lib/cron/verify-qstash";
import prisma from "@/lib/prisma";
import { bulkDeleteReflections } from "@/lib/reflections/bulk-delete-reflections";
import { z } from "zod";

export const dynamic = "force-dynamic";

const schema = z.object({
  workspaceId: z.string(),
});

// POST /api/cron/workspaces/delete
export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    await verifyQstashSignature({ req, rawBody });

    const { workspaceId } = schema.parse(JSON.parse(rawBody));

    const workspace = await prisma.workspace.findUnique({
      where: {
        id: workspaceId,
      },
    });

    if (!workspace) {
      return new Response(`Workspace ${workspaceId} not found. Skipping...`);
    }

    // Delete reflections in batches
    const reflections = await prisma.reflection.findMany({
      where: {
        workspaceId: workspace.id,
      },
      include: {},
      take: 100, // TODO: We can adjust this number based on the performance
    });

    if (reflections.length > 0) {
      const res = await Promise.all([
        prisma.reflection.deleteMany({
          where: {
            id: {
              in: reflections.map((reflection) => reflection.id),
            },
          },
        }),

        bulkDeleteReflections(reflections),
      ]);

      console.log(res);
    }

    const remainingReflections = await prisma.reflection.count({
      where: {
        workspaceId: workspace.id,
      },
    });

    if (remainingReflections > 0) {
      await queueWorkspaceDeletion({
        workspaceId: workspace.id,
        delay: 2,
      });

      return new Response(
        `Deleted ${reflections.length} reflections, ${remainingReflections} remaining. Starting next batch...`
      );
    }

    // Delete the analysis reports
    const analysisReports = await prisma.report.findMany({
      where: {
        reflectionId: {
          in: reflections.map((reflection) => reflection.id),
        },
      },
    });

    if (analysisReports.length > 0) {
      await Promise.all([
        prisma.report.deleteMany({
          where: {
            reflectionId: {
              in: reflections.map((reflection) => reflection.id),
            },
          },
        }),
      ]);
    }

    // Delete the workspace
    await prisma.workspace.delete({
      where: { id: workspace.id },
    });

    return new Response(
      `Deleted ${reflections.length} reflections, no more reflections remaining. Workspace deleted.`
    );
  } catch (error) {
    return handleAndReturnErrorResponse(error);
  }
}
