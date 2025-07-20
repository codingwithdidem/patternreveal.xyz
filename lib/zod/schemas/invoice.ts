import { z } from "zod";

export const invoiceSchema = z.object({
  id: z.string(),
  status: z.string(),
  currencyCode: z.string(),
  amount: z.string(),
  createdAt: z.string()
});

export const invoicesResponseSchema = z.object({
  invoices: z.array(invoiceSchema)
});

export type Invoice = z.infer<typeof invoiceSchema>;
export type InvoicesResponse = z.infer<typeof invoicesResponseSchema>;
