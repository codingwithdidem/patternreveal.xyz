import { constructMetadata } from "@/utils/functions/construct-metadata";
import { redirect } from "next/navigation";

export const metadata = constructMetadata({
  title: "Home - PatternReveal Dashboard",
  description:
    "Welcome to your PatternReveal workspace. Start creating reflections, analyzing patterns, and building healthier relationships.",
  noIndex: true,
});

export default async function Home({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/app/${slug}/reflections`);
}
