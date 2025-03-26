import posthog from "posthog-js";

type PosthogUser = {
  userId: string;
  name: string;
  email: string;
};

export const identifyUser = ({ userId, name, email }: PosthogUser) => {
  console.log("Identifying user", userId, name, email);
  posthog.identify(userId, { email, name });
};
