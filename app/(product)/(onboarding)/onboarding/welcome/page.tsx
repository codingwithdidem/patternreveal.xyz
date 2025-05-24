import TrackSignUp from "@/components/TrackSignUp";
import { OnboardingSteps } from "@/lib/onboarding/useOnboardingFlow";
import NextButton from "../next-button";

export default function WelcomePage() {
  return (
    <div className="max-w-2xl mx-auto relative z-10">
      <TrackSignUp />
      <h1 className="bg-gradient-to-b from-neutral-200 to-neutral-600 bg-clip-text text-transparent md:text-5xl font-bold">
        Welcome to Manipulated.io
      </h1>
      <p className="text-neutral-500 mt-2 text-lg">
        Manipulated.io is a platform that helps you create and analyze your
        daily relationship reflections.
      </p>
      <div className="mt-4">
        <NextButton step={OnboardingSteps.WORKSPACE} text="Get Started" />
      </div>
    </div>
  );
}
