import { sendEmail } from "@/emails/send";
import { hashToken } from "@/lib/auth/hash-token";
import prisma from "@/lib/prisma";
import { redis } from "@/lib/upstash/redis";
import type { VerificationToken } from "@prisma/client";
import { waitUntil } from "@vercel/functions";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import ConfirmEmailChangePageClient from "../page-client";
import { EmptyState } from "@/components/EmptyState";
import { KeyRound } from "lucide-react";
import { getSession } from "@/lib/auth/authOptions";
import { constructMetadata } from "@/utils/functions/construct-metadata";

export const metadata = constructMetadata({
  title: "Confirm Email Change",
  description:
    "Verify your new email address to update your PatternReveal account. Secure email verification for your relationship analysis platform.",
  noIndex: true
});

type PageProps = {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ConfirmEmailChangePage({
  params,
  searchParams
}: PageProps) {
  const { token } = await params;
  const { cancel } = await searchParams;

  const tokenFound = await prisma.verificationToken.findUnique({
    where: {
      token: await hashToken(token, { secret: true })
    }
  });

  if (!tokenFound || tokenFound.expires < new Date()) {
    return (
      <div>
        <h1>Invalid Token</h1>
        <p>The token is invalid or has expired.</p>
      </div>
    );
  }

  if (cancel && cancel === "true") {
    await deleteRequest(tokenFound);

    return (
      <EmptyState
        icon={KeyRound}
        title="Email Change Request Cancelled"
        description="Your email change request has been cancelled. No changes have been made to your account. You can close this page."
      />
    );
  }

  // Process the email change request
  const session = await getSession();

  if (!session) {
    redirect(`/login?next=/auth/confirm-email-change/${token}`);
  }

  const currentUserId = session?.user?.id;

  const data = await redis.get<{
    email: string;
    newEmail: string;
  }>(`email-change-request:user:${currentUserId}`);

  if (!data) {
    return (
      <EmptyState
        icon={KeyRound}
        title="Invalid Token"
        description="This token is invalid. Please request a new one."
      />
    );
  }

  const user = await prisma.user.update({
    where: {
      id: currentUserId
    },
    data: {
      email: data.newEmail
    }
  });

  waitUntil(
    Promise.all([
      deleteRequest(tokenFound)

      //   sendEmail({
      //     subject: "Your email address has been changed",
      //     email: data.email,
      //     react: EmailUpdated({
      //       oldEmail: data.email,
      //       newEmail: data.newEmail
      //     })
      //   })
    ])
  );

  return <ConfirmEmailChangePageClient />;
}

const deleteRequest = async (tokenFound: VerificationToken) => {
  await Promise.all([
    prisma.verificationToken.delete({
      where: {
        token: tokenFound.token
      }
    }),

    redis.del(`email-change-request:user:${tokenFound.identifier}`)
  ]);
};
