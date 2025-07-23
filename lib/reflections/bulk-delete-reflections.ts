// import { recordLinkTB, transformLinkTB } from "@/lib/tinybird";
import type { Reflection } from "@prisma/client";
import prisma from "../prisma";

export async function bulkDeleteReflections(reflections: Reflection[]) {
  if (reflections.length === 0) {
    return;
  }

  return await Promise.all([
    // Record the links deletion in Tinybird
    // recordLinkTB(
    //   links.map((link) => ({
    //     ...transformLinkTB(link),
    //     deleted: true,
    //   }))
    // ),

    // Update totalReflections for the workspace
    prisma.workspace.update({
      where: {
        id: reflections[0].workspaceId ?? "",
      },
      data: {
        totalReflections: { decrement: reflections.length },
      },
    }),
  ]);
}
