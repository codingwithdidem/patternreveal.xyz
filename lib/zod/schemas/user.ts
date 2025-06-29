import { trim } from "@/utils/functions/trim";
import { z } from "zod";

export const updateUserSchema = z.object({
  name: z
    .preprocess(trim, z.string().min(1).max(32))
    .optional()
    .describe("The name of the user."),
  email: z
    .preprocess(trim, z.string().email())
    .optional()
    .describe("The email of the user."),
  defaultWorkspace: z
    .preprocess(trim, z.string().min(1))
    .optional()
    .describe("The default workspace of the user.")
});
