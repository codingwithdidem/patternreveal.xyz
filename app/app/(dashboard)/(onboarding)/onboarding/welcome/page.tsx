import TrackSignUp from "@/components/TrackSignUp";
import NextButton from "../next-button";
import { constructMetadata } from "@/utils/functions/construct-metadata";

export const metadata = constructMetadata({
  title: "Welcome to PatternReveal - Your Journey Begins",
  description:
    "Welcome to PatternReveal.xyz! Start your journey toward healthier relationships with AI-powered reflection analysis. Learn to identify patterns, build boundaries, and protect your emotional well-being.",
  noIndex: true,
});

export default function WelcomePage() {
  return (
    <div className="max-w-2xl mx-auto relative z-10">
      <TrackSignUp />
      <h1 className="bg-gradient-to-b from-neutral-200 to-neutral-600 bg-clip-text text-transparent md:text-5xl font-bold">
        Welcome to patternreveal.xyz
      </h1>
      <p className="text-neutral-500 mt-2 text-lg">
        Transform your relationships through AI-powered reflection analysis.
        Discover hidden patterns, identify unhealthy dynamics, and build the
        emotional boundaries you need to thrive.
      </p>
      <div className="mt-4">
        <NextButton step="workspace" text="Get Started" />
      </div>
    </div>
  );
}
