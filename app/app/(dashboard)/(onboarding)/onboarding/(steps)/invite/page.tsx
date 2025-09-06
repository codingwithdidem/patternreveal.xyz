import PremiumFeatureBadge from "@/components/PremiumFeatureBadge";
import LaterButton from "../../later-button";
import InviteForm from "./form";
import { constructMetadata } from "@/utils/functions/construct-metadata";

export const metadata = constructMetadata({
  title: "Invite Collaborators - PatternReveal Setup",
  description:
    "Invite trusted family members, friends, or partners to collaborate on your relationship analysis journey. Share insights and build stronger connections together.",
  noIndex: true,
});

export default function InvitePage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <PremiumFeatureBadge feature="Invite others" />
      <h1 className="bg-gradient-to-b from-neutral-200 to-neutral-600 bg-clip-text text-transparent md:text-5xl font-bold">
        Invite others
      </h1>
      <p className="text-neutral-400 text-sm mt-3 mb-6 max-w-sm text-center">
        Invite your friends, family, or colleagues to your workspace.
        They&apos;ll be able to view and comment on your reflections.
      </p>
      <InviteForm />
      <div className="mt-4">
        <LaterButton next="plan" />
      </div>
    </div>
  );
}
