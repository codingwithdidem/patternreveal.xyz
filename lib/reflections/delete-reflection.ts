import type { Reflection } from "@prisma/client";
import prisma from "../prisma";
import { deletePatternAnalytics } from "../tinybird/delete_pattern_analytics";

/**
 * Delete a single reflection and all associated data including:
 * - Analysis report (AnalysisReport table)
 * - Shared report (Report table)
 * - TinyBird pattern analytics record (soft delete)
 * - Update workspace reflection count
 */
export async function deleteReflection(
  reflectionId: string,
  workspaceId: string
) {
  try {
    // First, get the reflection to ensure it exists and belongs to the workspace
    const reflection = await prisma.reflection.findFirst({
      where: {
        id: reflectionId,
        workspaceId: workspaceId,
      },
      include: {
        analysisReport: true,
        report: true,
      },
    });

    if (!reflection) {
      throw new Error("Reflection not found or access denied");
    }

    // Use a transaction to ensure all deletions succeed together
    const result = await prisma.$transaction(async (tx) => {
      // Delete the analysis report if it exists
      if (reflection.analysisReport) {
        await tx.analysisReport.delete({
          where: {
            reflectionId: reflectionId,
          },
        });
        console.log(`Deleted analysis report for reflection ${reflectionId}`);
      }

      // Delete the shared report if it exists
      if (reflection.report) {
        await tx.report.delete({
          where: {
            reflectionId: reflectionId,
          },
        });
        console.log(`Deleted shared report for reflection ${reflectionId}`);
      }

      // Delete the reflection itself
      const deletedReflection = await tx.reflection.delete({
        where: {
          id: reflectionId,
        },
      });

      // Update the workspace total reflections count
      await tx.workspace.update({
        where: {
          id: workspaceId,
        },
        data: {
          totalReflections: {
            decrement: 1,
          },
        },
      });

      return deletedReflection;
    });

    // Soft delete the TinyBird record (outside transaction since it's external)
    // Don't await this to avoid blocking the main deletion
    deletePatternAnalytics(reflectionId).catch((error) => {
      console.error(
        `Failed to soft delete TinyBird record for reflection ${reflectionId}:`,
        error
      );
    });

    console.log(
      `Successfully deleted reflection ${reflectionId} and all associated data`
    );
    return result;
  } catch (error) {
    console.error(`Failed to delete reflection ${reflectionId}:`, error);
    throw error;
  }
}
