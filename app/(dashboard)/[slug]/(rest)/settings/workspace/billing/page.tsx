import { constructMetadata } from "@/utils/functions/construct-metadata";
import BillingPageClient from "./page-client";

export const metadata = constructMetadata({
  title: "Workspace Billing - PatternReveal",
  description: "Manage your workspace billing.",
  noIndex: true, 
});

export default function BillingPage() {
  return <BillingPageClient />;
}
