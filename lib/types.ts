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

export interface WorkspaceWithUsers {
  id: string;
  name: string;
  slug: string;
  users: {
    role: "OWNER" | "MEMBER";
  }[];
  plan: PlanProps;
  paddleId: string;
  usersLimit: number;
  createdAt: Date;
}

export type PlanProps = (typeof plans)[number];

export const roles = ["OWNER", "MEMBER"] as const;

export type Role = (typeof roles)[number];
