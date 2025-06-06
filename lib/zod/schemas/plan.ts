import { z } from "zod";

export const periods = ["monthly", "yearly"] as const;
export const plans = ["free", "pro"] as const;

export const planSchema = z.enum(plans).describe("The plan of the workspace.");
export const periodSchema = z.enum(periods).describe("The period of the plan.");
