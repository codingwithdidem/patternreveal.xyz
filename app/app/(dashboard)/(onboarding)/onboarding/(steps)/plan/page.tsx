import LaterButton from "../../later-button";
import PlanSelector from "../../plan-selector";
import { constructMetadata } from "@/utils/functions/construct-metadata";

export const metadata = constructMetadata({
  title: "Choose Your Plan - PatternReveal Pricing",
  description:
    "Select the perfect plan for your relationship analysis needs. Free plan includes 20 reflections and 3 AI analyses per month. Pro plan offers unlimited access and advanced features.",
  noIndex: true,
});

export default async function PlanPage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="bg-gradient-to-b from-neutral-200 to-neutral-600 bg-clip-text text-transparent md:text-5xl font-bold">
        Choose your plan
      </h1>
      <p className="text-neutral-400 text-md mt-3 mb-6 max-w-md text-center">
        Choose a plan that fits your needs and budget.
      </p>
      <PlanSelector />
      <div className="mt-4">
        <LaterButton
          next="complete"
          text="Continue with free plan, I'll upgrade later"
        />
      </div>
    </div>
  );
}
