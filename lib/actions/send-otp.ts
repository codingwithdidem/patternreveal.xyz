"use server";

import { sendEmail } from "@/emails/send";
import { EMAIL_OTP_EXPIRY_IN } from "../auth/constants";
import { generateOTP } from "../auth/utils";
import prisma from "../prisma";
import { actionClient } from "./safe-action";
import { z } from "zod";
import VerifyEmail from "@/emails/verify-email";
import { flattenValidationErrors } from "next-safe-action";
import { throwIfAuthenticated } from "./auth/throw-if-authenticated";
import { ratelimit } from "../upstash/ratelimit";
import { getIP } from "../api/utils";

const schema = z.object({
  email: z.string().email(),
});

export const sendOtpAction = actionClient
  .schema(schema, {
    handleValidationErrorsShape: async (errors) => {
      return flattenValidationErrors(errors).fieldErrors;
    },
  })
  .use(throwIfAuthenticated)
  .action(async ({ parsedInput: { email } }) => {
    const ipAddress = await getIP();
    const { success } = await ratelimit(2, "1 m").limit(
      `send-otp:${ipAddress}`
    ); // 2 requests per minute

    if (!success) {
      throw new Error("Too many requests. Please try again later.");
    }

    const isExistingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (isExistingUser) {
      throw new Error("User already exists, please login instead.");
    }

    const otpCode = generateOTP();

    await prisma.emailVerificationToken.deleteMany({
      where: { identifier: email },
    });

    await Promise.all([
      prisma.emailVerificationToken.create({
        data: {
          identifier: email,
          token: otpCode,
          expires: new Date(Date.now() + EMAIL_OTP_EXPIRY_IN * 1000), // 10 minutes
        },
      }),
      sendEmail({
        subject: `${process.env.NEXT_PUBLIC_APP_NAME}: OTP to verify your account`,
        email,
        react: VerifyEmail({
          email,
          code: otpCode,
          expires: new Date(Date.now() + EMAIL_OTP_EXPIRY_IN * 1000), // 10 minutes
        }),
      }),
    ]);
  });
