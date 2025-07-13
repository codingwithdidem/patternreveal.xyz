export const APP_NAME = "patternreveal.xyz";
export const APP_DESCRIPTION =
  "PatternReveal.xyz helps you identify and understand manipulative behaviors in relationships, empowering you to protect your emotional well-being. With practical tools and expert insights, it supports you in recognizing toxic dynamics and building stronger personal boundaries.";

export const AUTH_ROUTES = new Set([
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email"
]);

export const PUBLIC_ROUTES = new Set(["/"]);

export type PlanFeature = {
  id?: string;
  text: string;
  tooltip?: {
    title: string;
    cta: string;
    href: string;
  };
};

export const PLANS = [
  {
    name: "Free",
    price: {
      monthly: 0,
      yearly: 0
    },
    limits: {
      "ask-ai": 2,
      "ai-analysis": 3,
      reflections: 20,
      users: 1,
      retention: "30-day"
    },
    featureTitle: "A free plan to get you started",
    features: [
      { id: "ask-ai", text: "2 AI questions per month" },
      { id: "ai-analysis", text: "3 AI analysis per month" },
      { id: "reflections", text: "20 reflections per month" },
      { id: "users", text: "1 user" }
    ]
  },
  {
    name: "Pro",
    link: "https://dub.co/help/article/pro-plan",
    price: {
      monthly: 10,
      yearly: 5,
      monthlyId: "pri_01jxt8keeh6cx5wk96bpbyehd5",
      yearlyId: "pri_01jxt8qpc94nyymrqws8he2c8g",
      ids: [
        // 2025 pricing
        "pri_01jxt8qpc94nyymrqws8he2c8g", // yearly (test),
        "pri_01jxt8keeh6cx5wk96bpbyehd5" // monthly (test),
      ]
    },
    limits: {
      reflections: 1_000,
      "ask-ai": 2,
      "ai-analysis": 3,
      users: 5,
      retention: "1-year"
    },
    featureTitle: "Everything in Free, plus:",
    features: [
      { id: "reflections", text: "1K reflections per month" },
      { id: "ask-ai", text: "2 AI questions per month" },
      { id: "ai-analysis", text: "3 AI analysis per month" },
      { id: "users", text: "5 users" },
      { id: "retention", text: "1-year analytics retention" }
    ] as PlanFeature[]
  }
];

export const getPlanDetails = (plan: string) => {
  return PLANS.find((p) => p.name === plan);
};

export const FREE_PLAN = PLANS.find((plan) => plan.name === "Free");
export const PRO_PLAN = PLANS.find((plan) => plan.name === "Pro");
