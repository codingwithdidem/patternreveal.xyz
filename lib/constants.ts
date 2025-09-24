export const APP_NAME = "patternreveal.xyz";
export const APP_DESCRIPTION =
  "PatternReveal.xyz helps you identify and understand manipulative behaviors in relationships, empowering you to protect your emotional well-being. With practical tools and expert insights, it supports you in recognizing toxic dynamics and building stronger personal boundaries.";

export const AUTH_ROUTES = new Set([
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
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
      yearly: 0,
    },
    limits: {
      "ask-ai": 0, // Pro-only feature
      "ai-analysis": 2, // On Free, only 2 AI analysis per month
      reflections: 10, // On Free, only 10 reflections per month
      users: 1, // On Free, only 1 user in the workspace
      retention: "30-day", // On Free, only 30-day data retention which means that previous analyses might not be accessible, they will be deleted after 30 days
    },
    featureTitle: "A free plan to get you started",
    features: [
      { id: "ai-analysis", text: "2 AI analysis per month" },
      { id: "reflections", text: "10 reflections per month" },
      { id: "users", text: "1 user" },
      { id: "30-day-retention", text: "30-day data retention" },
    ],
  },
  {
    name: "Pro",
    link: "",
    price: {
      monthly: 16.99, // $16.99 per month
      yearly: 8.49, // $8.49 per month
      monthlyId: "pri_01jxt8keeh6cx5wk96bpbyehd5",
      yearlyId: "pri_01jxt8qpc94nyymrqws8he2c8g",
      ids: [
        // 2025 pricing
        "pri_01jxt8qpc94nyymrqws8he2c8g", // yearly (test),
        "pri_01jxt8keeh6cx5wk96bpbyehd5", // monthly (test),
      ],
    },
    limits: {
      reflections: 1_000, // 1K reflections per month
      "ask-ai": 15, // 15 AI questions per month
      "ai-analysis": 8, // 8 AI analysis per month
      users: 5, // 5 users
      retention: "1-year", // 1-year analytics retention
    },
    featureTitle: "Everything in Free, plus:",
    features: [
      { id: "reflections", text: "1K reflections per month" },
      { id: "ask-ai", text: "15 AI questions per month" },
      { id: "ai-analysis", text: "8 AI analysis per month" },
      { id: "users", text: "5 users" },
      { id: "retention", text: "1-year analytics retention" },
      {
        id: "advanced-analytics",
        text: "Access to advanced relationship insights",
      },
      { id: "priority-support", text: "Priority support" },
    ] as PlanFeature[],
  },
];

export const getPlanDetails = (plan: string) => {
  return PLANS.find((p) => p.name === plan);
};

export const FREE_PLAN = PLANS.find((plan) => plan.name === "Free");
export const PRO_PLAN = PLANS.find((plan) => plan.name === "Pro");

export const getNextPlan = (plan?: string | null) => {
  if (!plan) return PRO_PLAN;
  const currentPlan = plan.toLowerCase().split(" ")[0]; // to account for old Business plans (e.g. "Business Plus")
  return PLANS[
    Math.min(
      // returns the next plan, or the last plan if the current plan is the last plan
      PLANS.findIndex((p) => p.name.toLowerCase() === currentPlan) + 1,
      PLANS.length - 1
    )
  ];
};
