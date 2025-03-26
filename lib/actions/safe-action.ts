import { createSafeActionClient } from "next-safe-action";
import { getSession } from "../auth/authOptions";

export const actionClient = createSafeActionClient({
  handleServerError: async (error) => {
    console.error(error);
    if (error instanceof Error) {
      return error.message;
    }
    return "An unexpected error occurred.";
  }
});

export const authenticatedActionClient = actionClient.use(async ({ next }) => {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized: User is not logged in.");
  }

  return next({
    ctx: {
      user: session.user
    }
  });
});
