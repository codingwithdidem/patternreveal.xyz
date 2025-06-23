import { resend } from "@/lib/resend";
import type { CreateEmailOptions } from "resend";

export const sendEmail = async ({
  from,
  email,
  react,
  text,
  subject
}: Omit<CreateEmailOptions, "to" | "from"> & {
  email: string;
  from?: string;
}) => {
  return await resend.emails.send({
    to: email,
    from: from || "info@patternreveal.xyz",
    subject,
    text,
    react
  });
};
