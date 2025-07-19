import { Metadata } from "next";
import InvoicesPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Invoices - PatternReveal",
  description: "View and manage your billing invoices.",
};

export default function InvoicesPage() {
  return <InvoicesPageClient />;
} 