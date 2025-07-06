import { Environment, LogLevel, Paddle } from "@paddle/paddle-node-sdk";
import type { PaddleOptions } from "@paddle/paddle-node-sdk";

export function getPaddleClient() {
  const paddleOptions: PaddleOptions = {
    environment:
      (process.env.NEXT_PUBLIC_PADDLE_ENV as Environment) ??
      Environment.sandbox,
    logLevel: LogLevel.error
  };

  if (!process.env.PADDLE_API_KEY) {
    console.error("Paddle API key is missing");
    throw new Error("Paddle API key is required");
  }

  return new Paddle(process.env.PADDLE_API_KEY, paddleOptions);
}
