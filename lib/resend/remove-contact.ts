import { resend } from "../resend";

export const removeContact = async ({
  email
}: {
  email: string;
}) => {
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!audienceId) {
    throw new Error("RESEND_AUDIENCE_ID is not set");
  }

  return await resend.contacts.remove({
    email,
    audienceId
  });
};
