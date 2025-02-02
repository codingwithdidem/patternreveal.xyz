import { z } from "zod";

export const createReflectionSchema = z.object({
  title: z.string().max(32).describe("The title of the reflection."),
  initialContent: z
    .string()
    .optional()
    .describe("The initial content of the reflection."),
  content: z.string().describe("The content of the reflection.")
});

export const deleteReflectionSchema = z.object({
  reflectionId: z.string().describe("The ID of the reflection to delete.")
});

export const updateReflectionSchema = z.object({
  content: z.any().describe("The content of the reflection.")
});
