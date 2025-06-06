import "server-only"; // Make sure this is a server-only module so that it doesn't run on the client

import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-05-28.basil",
  typescript: true,
  appInfo: {
    name: "Manipulated.io",
    version: "0.1.0"
  }
});
