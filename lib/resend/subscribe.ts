import { resend } from "../resend";

export const subscribe = async ({
  email,
  name
}: {
  email: string;
  name: string;
}) => {
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!audienceId) {
    throw new Error("RESEND_AUDIENCE_ID is not set");
  }

  const response = await resend.contacts.create({
    email,
    firstName: name.split(" ")[0],
    lastName: name.split(" ")[1] ?? "",
    unsubscribed: false,
    audienceId
  });

  return response;
};
