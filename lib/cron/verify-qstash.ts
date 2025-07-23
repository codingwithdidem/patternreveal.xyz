import { Receiver } from "@upstash/qstash";
import { PatternRevealApiError } from "../api/errors";
import { log } from "@/utils/functions/slack-log";

// we're using Upstash's Receiver to verify the request signature
const receiver = new Receiver({
  currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY || "",
  nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY || "",
});

export const verifyQstashSignature = async ({
  req,
  rawBody,
}: {
  req: Request;
  rawBody: string; // Make sure to pass the raw body not the parsed JSON
}) => {
  // skip verification in local development
  if (process.env.VERCEL !== "1") {
    return;
  }

  const signature = req.headers.get("Upstash-Signature");

  if (!signature) {
    throw new PatternRevealApiError({
      code: "bad_request",
      message: "Upstash-Signature header not found.",
    });
  }

  const isValid = await receiver.verify({
    signature,
    body: rawBody,
  });

  if (!isValid) {
    const url = req.url;
    const messageId = req.headers.get("Upstash-Message-Id");

    log({
      message: `Invalid QStash request signature: *${url}* - *${messageId}*`,
      type: "errors",
      mention: true,
    });

    throw new PatternRevealApiError({
      code: "unauthorized",
      message: "Invalid QStash request signature.",
    });
  }
};
