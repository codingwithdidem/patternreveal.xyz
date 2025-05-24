import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./redis";

export const ratelimit = (
  limit = 2,
  period:
    | `${number} ms`
    | `${number} s`
    | `${number} m`
    | `${number} h`
    | `${number} d` = "10 s"
) => {
  return new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(limit, period),
    prefix: "ratelimit",
    analytics: true
  });
};
