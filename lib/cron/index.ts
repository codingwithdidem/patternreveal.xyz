import { Client } from "@upstash/qstash";

export const qstash = new Client({
  token: process.env.QSTASH_TOKEN || "",
  retry: {
    retries: 0,
  },
});
