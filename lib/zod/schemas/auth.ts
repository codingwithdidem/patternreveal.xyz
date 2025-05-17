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

export const registerSchema = z
  .object({
    email: z
      .string()
      .email()
      .min(1)
      .transform((email) => email.toLowerCase()),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        "Password must contain at least one number, one uppercase, and one lowercase letter"
      ),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
    name: z.string().min(1, "Name is required")
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match"
  });

export const verifyEmailSchema = z.object({
  code: z.string().min(6, "Code is required")
});
