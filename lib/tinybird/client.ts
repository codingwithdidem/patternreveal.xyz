import { Tinybird } from "@chronark/zod-bird";

// Always use production Tinybird configuration
const token = process.env.TINYBIRD_API_KEY;
const baseUrl =
  process.env.TINYBIRD_API_URL || "https://api.us-east.aws.tinybird.co";

if (!token) {
  throw new Error("TINYBIRD_API_KEY is not set");
}

export const tb = new Tinybird({
  token,
  baseUrl,
});
