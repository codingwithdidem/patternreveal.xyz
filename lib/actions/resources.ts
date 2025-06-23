"use server";

import { createResourceSchema } from "@/lib/zod/schemas/resource";
import prisma from "@/lib/prisma";
// import { generateEmbeddings } from "@/lib/ai/embedding";

export const createResource = async (input: any) => {
  try {
    const { content } = createResourceSchema.parse(input);

    const resource = await prisma.resource.create({
      data: {
        content
      }
    });

    // const embeddings = await generateEmbeddings(content);

    // await prisma.embedding.createMany({
    //   data: embeddings.map((embedding) => ({
    //     resourceId: resource.id,
    //     ...embedding
    //   }))
    // });

    return "Resource successfully created and embedded.";
  } catch (e) {
    if (e instanceof Error)
      return e.message.length > 0 ? e.message : "Error, please try again.";
  }
};
