"use server";

import { flattenValidationErrors } from "next-safe-action";
import prisma from "../prisma";
import { actionClient } from "./safe-action";
import { z } from "zod";
import { waitUntil } from "@vercel/functions";
import { hashPassword } from "../auth/password";

const verifyEmailSchema = z.object({
  code: z.string().length(6),
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1)
});

export const verifyEmailAction = actionClient
  .schema(verifyEmailSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors
  })
  .action(async ({ parsedInput: { name, email, password, code } }) => {
    const verificationToken = await prisma.emailVerificationToken.findUnique({
      where: {
        identifier: email,
        token: code
      }
    });

    if (!verificationToken) {
      throw new Error("Invalid verification code");
    }

    // Check if the token has expired
    if (verificationToken.expires < new Date()) {
      waitUntil(
        prisma.emailVerificationToken.delete({
          where: {
            identifier: email,
            token: code
          }
        })
      );

      throw new Error("OTP expired, please request a new one.");
    }

    await prisma.emailVerificationToken.delete({
      where: {
        identifier: email,
        token: code
      }
    });

    const isExistingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (isExistingUser) {
      throw new Error("User already exists, please login.");
    }

    await prisma.user.create({
      data: {
        name,
        email,
        password: await hashPassword(password),
        emailVerified: new Date()
      }
    });
  });
