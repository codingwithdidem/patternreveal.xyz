export const APP_NAME = "Manipulated.io";
export const APP_DESCRIPTION =
  "Manipulated.io helps you identify and understand manipulative behaviors in relationships, empowering you to protect your emotional well-being. With practical tools and expert insights, it supports you in recognizing toxic dynamics and building stronger personal boundaries.";

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
      ids: [
        "price_1LodNLAlJJEpqkPVQSrt33Lc", // old monthly
        "price_1LodNLAlJJEpqkPVRxUyCQgZ", // old yearly
        "price_1OTcQBAlJJEpqkPViGtGEsbb", // new monthly (test)
        "price_1OYJeBAlJJEpqkPVLjTsjX0E", // new monthly (prod)
        "price_1OTcQBAlJJEpqkPVYlCMqdLL", // new yearly (test)
        "price_1OYJeBAlJJEpqkPVnPGEZeb0", // new yearly (prod)

        // 2025 pricing
        "price_1R8XtyAlJJEpqkPV5WZ4c0jF", //  yearly
        "price_1R8XtEAlJJEpqkPV4opVvVPq", // monthly
        "price_1R8XxZAlJJEpqkPVqGi0wOqD", // yearly (test),
        "price_1R7oeBAlJJEpqkPVh6q5q3h8" // monthly (test),
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

export const FREE_PLAN = PLANS.find((plan) => plan.name === "Free");
export const PRO_PLAN = PLANS.find((plan) => plan.name === "Pro");
