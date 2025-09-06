import WorkspaceForm from "./form";
import { constructMetadata } from "@/utils/functions/construct-metadata";

export const metadata = constructMetadata({
  title: "Create Your Workspace - PatternReveal Setup",
  description:
    "Set up your collaborative workspace for relationship reflection analysis. Invite family, friends, or partners to join your journey toward healthier relationships.",
  noIndex: true,
});

export default function WorkspacePage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="bg-gradient-to-b from-neutral-200 to-neutral-600 bg-clip-text text-transparent md:text-5xl font-bold">
        Create a workspace
      </h1>
      <p className="text-neutral-400 text-sm mt-3 mb-6 max-w-sm text-center">
        A workspace is where you and your invitees can collaborate on your
        reflections. You can create a workspace for your team, your family, or
        your friends.
      </p>
      <WorkspaceForm />
    </div>
  );
}
