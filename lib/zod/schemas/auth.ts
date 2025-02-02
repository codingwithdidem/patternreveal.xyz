import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email()
    .min(1)
    .transform((email) => email.toLowerCase()),
  password: z.string()
  // .min(8, "Password must be at least 8 characters long")
  // .regex(
  //   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
  //   "Password must contain at least one number, one uppercase, and one lowercase letter"
  // )
});
