"use server";

import { z } from "zod";
import { dub } from "../dub/dub";
import prisma from "../prisma";
import { authenticatedActionClient } from "./safe-action";

const createReflectionReportLinkSchema = z.object({
  reflectionId: z.string(),
  baseUrl: z.string(),
  expiresAt: z.string().optional()
});

export const createReflectionReportLinkAction = authenticatedActionClient
  .schema(createReflectionReportLinkSchema)
  .action(
    async ({
      parsedInput: { baseUrl, reflectionId, expiresAt },
      ctx: { user }
    }) => {
      // Check if a report already exists
      const existingReport = await prisma.report.findFirst({
        where: {
          reflectionId,
          shortLink: { not: null }
        }
      });

      if (existingReport?.shortLink) {
        return { shortLink: existingReport.shortLink };
      }

      // Create a new report
      const report = await prisma.report.create({
        data: {
          reflectionId,
          expiresAt: expiresAt
            ? new Date(expiresAt)
            : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        }
      });

      // Create a reflection report link
      const link = await dub.links.create({
        url: `${baseUrl}/share/${report.id}`
      });

      // Update the report with the link information
      await prisma.report.update({
        where: { id: report.id },
        data: {
          linkId: link.id,
          shortLink: link.shortLink
        }
      });

      return { shortLink: link.shortLink };
    }
  );
