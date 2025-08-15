import { limiter } from "./limiter";
import type { WorkspaceWithUsers } from "../types";
import { sendEmail } from "@/emails/send";
import prisma from "../prisma";
import ReflectionsExceeded from "@/emails/reflections-exceeded";
import ReflectionsLimitAlert from "@/emails/reflections-limit-alert";

export const sendLimitEmail = async ({
  emails,
  workspace,
  type,
}: {
  emails: string[];
  workspace: WorkspaceWithUsers;
  type:
    | "firstUsageLimitEmail"
    | "secondUsageLimitEmail"
    | "firstReflectionsLimitEmail"
    | "secondReflectionsLimitEmail";
}) => {
  const percentage = Math.round(
    (workspace.reflectionsUsage / workspace.reflectionsLimit) * 100
  );

  return await Promise.allSettled([
    emails.map((email) => {
      limiter.schedule(() =>
        sendEmail({
          subject: type.endsWith("UsageLimitEmail")
            ? "PatternReveal Alert: Reflections Limit Exceeded"
            : `PatternReveal Alert: ${
                workspace.name
              } has used ${percentage.toString()}% of its reflections limit for the month.`,
          email,
          react: type.endsWith("UsageLimitEmail")
            ? ReflectionsExceeded({
                email,
                workspace,
                type: type as "firstUsageLimitEmail" | "secondUsageLimitEmail",
              })
            : ReflectionsLimitAlert({
                email,
                workspace,
              }),
        })
      );
    }),
    prisma.sentEmail.create({
      data: {
        workspaceId: workspace.id,
        type,
      },
    }),
  ]);
};
