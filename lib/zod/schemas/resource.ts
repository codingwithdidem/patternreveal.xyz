import { z } from "zod";

export const createResourceSchema = z.object({
  content: z
    .string()
    .describe(
      "The content of the resource. Will be used to generate embeddings"
    )
});
