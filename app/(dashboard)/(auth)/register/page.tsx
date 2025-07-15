import RegisterFlow from "@/components/RegisterFlow";
import { constructMetadata } from "@/utils/functions/construct-metadata";

export const metadata = constructMetadata({
  title: "Start Your Journey to Healthier Relationships",
  description:
    "Join thousands who've gained clarity about their relationships. Create your free PatternReveal account to identify manipulative patterns, track emotional dynamics, and build stronger personal boundaries with AI-powered analysis.",
  canonicalUrl: "https://patternreveal.xyz/register"
});

export default function RegisterPage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center font-[family-name:var(--font-satoshi)]">
      <div className="w-full max-w-md bg-white shadow-md rounded-md p-8">
        <RegisterFlow />
      </div>
    </div>
  );
}
