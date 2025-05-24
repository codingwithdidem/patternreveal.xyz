import { z } from "zod";

export const createWorkspaceSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .describe("The name of the workspace"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .describe("The unique slug of the workspace")
});
