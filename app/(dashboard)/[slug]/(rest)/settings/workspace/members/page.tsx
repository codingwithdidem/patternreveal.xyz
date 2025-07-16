import { constructMetadata } from "@/utils/functions/construct-metadata";
import MembersPageClient from "./page-client";

export const metadata = constructMetadata({
  title: "Workspace Members - PatternReveal",
  description: "Manage your workspace members and their permissions.",
  noIndex: true
});

export default function MembersPage() {
  return <MembersPageClient />;
}
