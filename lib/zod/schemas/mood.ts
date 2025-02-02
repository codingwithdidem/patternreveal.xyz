import { MOODS } from "@/lib/constants/mood";
import { z } from "zod";

export const createMoodSchema = z.object({
  mood: z
    .enum(MOODS)
    .describe(
      "The mood of the user. It can be one of the following: Happy, Sad, Angry, Excited, Confused."
    ),
  note: z
    .string()
    .max(255)
    .optional()
    .describe(
      "An optional note giving more context to the mood provided by the user."
    )
});
