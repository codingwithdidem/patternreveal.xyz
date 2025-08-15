"use server";

import { flattenValidationErrors } from "next-safe-action";
import prisma from "../prisma";
import { actionClient } from "./safe-action";
import { z } from "zod";
import { waitUntil } from "@vercel/functions";
import { hashPassword } from "../auth/password";
import { ratelimit } from "../upstash/ratelimit";

const verifyEmailSchema = z.object({
  code: z.string().length(6),
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
});

export const verifyEmailAction = actionClient
  .schema(verifyEmailSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: { name, email, password, code } }) => {
    const rateLimitKey = `signup:attempts:${email}`;

    const { remaining: remainingAttempts } = await ratelimit(
      5,
      "1 d"
    ).getRemaining(rateLimitKey);

    if (remainingAttempts <= 0) {
      throw new Error("Too many attempts, please try again later.");
    }

    const verificationToken = await prisma.emailVerificationToken.findUnique({
      where: {
        identifier: email,
        token: code,
      },
    });

    if (!verificationToken) {
      await ratelimit(5, "1 d").limit(rateLimitKey);
      throw new Error("Invalid verification code");
    }

    console.log(verificationToken);

    // Check if the token has expired
    if (verificationToken.expires < new Date()) {
      waitUntil(
        prisma.emailVerificationToken.delete({
          where: {
            identifier: email,
            token: code,
          },
        })
      );

      throw new Error("OTP expired, please request a new one.");
    }

    await prisma.emailVerificationToken.delete({
      where: {
        identifier: email,
        token: code,
      },
    });

    const isExistingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (isExistingUser) {
      throw new Error("User already exists, please login.");
    }

    await prisma.user.create({
      data: {
        name,
        email,
        password: await hashPassword(password),
        emailVerified: new Date(),
      },
    });
  });
