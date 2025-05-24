import type { User } from "@prisma/client";
import prisma from "../prisma";
import { MAX_LOGIN_ATTEMPTS } from "./constants";
import { sendEmail } from "@/emails/send";
import { AccountLocked } from "@/emails/account-locked";

export const incrementLoginAttempts = async (
  user: Pick<User, "id" | "email">
) => {
  const { invalidLoginAttempts, lockedAt } = await prisma.user.update({
    where: { id: user.id },
    data: {
      invalidLoginAttempts: {
        increment: 1
      }
    },
    select: {
      lockedAt: true,
      invalidLoginAttempts: true
    }
  });

  if (!lockedAt && invalidLoginAttempts >= MAX_LOGIN_ATTEMPTS) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        lockedAt: new Date()
      }
    });

    // Send email to user that their account has been locked
    await sendEmail({
      subject: "Account Locked",
      email: user.email,
      react: AccountLocked({
        email: user.email,
        lockedAt: lockedAt ?? new Date(),
        reason: `You have exceeded the max number of ${MAX_LOGIN_ATTEMPTS} login attempts. Please contact support to unlock your account.`
      })
    });
  }

  return {
    invalidLoginAttempts,
    lockedAt
  };
};

export const exceededLoginAttemptsThreshold = (
  user: Pick<User, "invalidLoginAttempts">
) => {
  return user.invalidLoginAttempts >= MAX_LOGIN_ATTEMPTS;
};

export const isAccountLocked = (user: Pick<User, "lockedAt">) => {
  return user.lockedAt !== null;
};
