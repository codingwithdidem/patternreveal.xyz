import { ManipulatedIOApiError } from "./errors";

export const parseRequestBody = async (req: Request) => {
  try {
    const body = await req.json();
    return body;
  } catch {
    throw new ManipulatedIOApiError({
      code: "bad_request",
      message: "Invalid request body format. Must be JSON."
    });
  }
};
