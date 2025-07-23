import { PLANS } from "@/lib/constants";

export const ONE_WEEK_IN_SECONDS = 60 * 60 * 24 * 7;

export const getPlanFromPriceId = (priceId: string) => {
  return PLANS.find((plan) => plan.price.ids?.includes(priceId)) || null;
};
