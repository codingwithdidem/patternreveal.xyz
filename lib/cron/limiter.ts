import Bottleneck from "bottleneck";

export const limiter = new Bottleneck({
  maxConcurrent: 1, // Only one request at a time
  minTime: 200 // Min time between requests (200ms)
});
