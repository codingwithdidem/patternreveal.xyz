import { getSession } from "@/lib/auth/authOptions";

export const throwIfAuthenticated = async ({
  next,
  ctx,
}: {
  next: any;
  ctx: any;
}) => {
  const session = await getSession();

  if (session) {
    throw new Error("You are already logged in.");
  }

  return next({ ctx });
};
