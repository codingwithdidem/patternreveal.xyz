import DeleteWorkspace from "@/components/settings/delete-workspace";
import WorkspaceName from "@/components/settings/workspace-name";
import { constructMetadata } from "@/utils/functions/construct-metadata";

export const metadata = constructMetadata({
  title: "Workspace Settings - PatternReveal",
  description:
    "Manage your workspace configuration, team members, and collaboration settings for your relationship analysis environment.",
  noIndex: true
});

export default function WorkspaceSettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <WorkspaceName />
      <DeleteWorkspace />
    </div>
  );
}
