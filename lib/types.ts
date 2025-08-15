import type { plans } from "./zod/schemas/plan";

export interface UserProps {
  id: string;
  name: string;
  email: string;
  image?: string;
  createdAt: Date;
  source: string | null;
  defaultWorkspace?: string;
  hasPassword: boolean;
  provider: string | null;
}

export interface UserPropsWithRole extends UserProps {
  role: "OWNER" | "MEMBER";
}

export interface WorkspaceWithUsers {
  id: string;
  name: string;
  slug: string;
  logo?: string | null;
  inviteCode?: string | null;
  billingCycleStart: number;
  paymentFailedAt: Date | null;
  plan: PlanProps;
  totalReflections: number;
  reflectionsUsage: number;
  reflectionsLimit: number;
  aiUsage: number;
  aiLimit: number;
  usersLimit: number;
  store?: Record<string, any>;
  users: {
    role: "OWNER" | "MEMBER";
  }[];
  createdAt: Date;
  updatedAt: Date;
  paddleCustomerId?: string;
}

export type PlanProps = (typeof plans)[number];

export const roles = ["OWNER", "MEMBER"] as const;

export type Role = (typeof roles)[number];
