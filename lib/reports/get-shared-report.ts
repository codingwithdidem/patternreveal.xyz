import prisma from "../prisma";
import { cache } from "react";

export const getSharedReport = cache(
  async ({
    reportId
  }: {
    reportId: string;
  }) => {
    return await prisma.report.findUnique({
      where: { id: reportId },
      select: {
        id: true,
        linkId: true,
        shortLink: true,
        index: true,
        password: true,
        reflection: {
          select: {
            title: true,
            analysisReport: true
          }
        }
      }
    });
  }
);
