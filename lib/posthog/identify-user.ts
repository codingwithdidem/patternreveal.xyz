import posthog from "posthog-js";

type PosthogUser = {
  userId: string;
  name: string;
  email: string;
};

export const identifyUser = ({ userId, name, email }: PosthogUser) => {
  posthog.identify(userId, { email, name });
};
