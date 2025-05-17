import { z } from "zod";
import { reportSchema } from "./report";

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
  title: z.string().max(32).optional().describe("The title of the reflection."),
  content: z.any().describe("The content of the reflection.")
});

export const analyzeReflectionSchema = z.object({
  reflectionId: z.string().describe("The ID of the reflection to analyze."),
  story: z.string().describe("The story to analyze.")
});

export const reflectionSchema = z.object({
  /// Unique identifier for the reflection
  id: z.string(),
  /// Title of the reflection
  title: z.string(),
  /// Initial content of the reflection, can be null
  initialContent: z.string().nullable(),
  /// Main content of the reflection
  content: z.string(),
  /// ID of the user who owns this reflection
  userId: z.string(),
  /// When the reflection was created
  createdAt: z.date(),
  /// Optional report associated with this reflection
  report: reportSchema.optional()
});
