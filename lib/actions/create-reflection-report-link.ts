"use server";

import { z } from "zod";
import { dub } from "../dub/dub";
import prisma from "../prisma";
import { authenticatedActionClient } from "./safe-action";

const createReflectionReportLinkSchema = z.object({
  reflectionId: z.string(),
  baseUrl: z.string(),
  expiresAt: z.string()
});

export const createReflectionReportLinkAction = authenticatedActionClient
  .schema(createReflectionReportLinkSchema)
  .action(async ({ parsedInput, ctx: { user } }) => {
    // Create a reflection report link
    const link = await dub.links.create({
      // https://manipulated.io/public/report/123
      url: `${parsedInput.baseUrl}/public/report/${parsedInput.reflectionId}`
      // Expires in 1 week
      // expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    });

    console.log("Link created", link);

    await prisma.reflection.update({
      where: { id: parsedInput.reflectionId },
      data: {
        linkId: link.id,
        shortLink: link.shortLink
      }
    });

    return {
      reportLink: link.shortLink
    };
  });
