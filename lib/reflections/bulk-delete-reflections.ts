import type { Reflection } from "@prisma/client";
import prisma from "../prisma";
import { deletePatternAnalytics } from "../tinybird/delete_pattern_analytics";

export async function bulkDeleteReflections(reflections: Reflection[]) {
  if (reflections.length === 0) {
    return;
  }

  const reflectionIds = reflections.map((reflection) => reflection.id);

  return await Promise.all([
    // Delete analysis reports for these reflections
    prisma.analysisReport.deleteMany({
      where: {
        reflectionId: {
          in: reflectionIds,
        },
      },
    }),

    // Delete shared reports for these reflections
    prisma.report.deleteMany({
      where: {
        reflectionId: {
          in: reflectionIds,
        },
      },
    }),

    // Update totalReflections for the workspace
    prisma.workspace.update({
      where: {
        id: reflections[0].workspaceId ?? "",
      },
      data: {
        totalReflections: { decrement: reflections.length },
      },
    }),

    // Soft delete TinyBird records for all reflections
    // Don't await these to avoid blocking the main deletion
    Promise.allSettled(
      reflectionIds.map((reflectionId) =>
        deletePatternAnalytics(reflectionId).catch((error) => {
          console.error(
            `Failed to soft delete TinyBird record for reflection ${reflectionId}:`,
            error
          );
        })
      )
    ),
  ]);
}
