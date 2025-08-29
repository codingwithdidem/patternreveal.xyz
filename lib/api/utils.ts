import { headers } from "next/headers";
import { PatternRevealApiError } from "./errors";

export const parseRequestBody = async (req: Request) => {
  try {
    const body = await req.json();
    return body;
  } catch {
    throw new PatternRevealApiError({
      code: "bad_request",
      message: "Invalid request body format. Must be JSON.",
    });
  }
};

export const getIP = async () => {
  const FALLBACK_IP_ADDRESS = "0.0.0.0";
  const headerslist = await headers();
  const forwardedFor = headerslist.get("x-forwarded-for");

  // const headerList = headers();
  // for (const [key, value] of (await headerList).entries()) {
  //   console.log(`${key}: ${value}`);
  // }

  if (forwardedFor) {
    return forwardedFor.split(",")[0] ?? FALLBACK_IP_ADDRESS;
  }

  return headerslist.get("x-real-ip") ?? FALLBACK_IP_ADDRESS;
};
