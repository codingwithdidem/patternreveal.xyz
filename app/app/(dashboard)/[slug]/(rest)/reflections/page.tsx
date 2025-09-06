import ReflectionsClientPage from "./page-client";
import { constructMetadata } from "@/utils/functions/construct-metadata";

export const metadata = constructMetadata({
  title: "My Reflections - PatternReveal",
  description:
    "View and manage all your relationship reflections. Track your emotional journey, analyze patterns, and gain insights into your relationship dynamics.",
  noIndex: true
});

export default async function Reflections() {
  return <ReflectionsClientPage />;
}
