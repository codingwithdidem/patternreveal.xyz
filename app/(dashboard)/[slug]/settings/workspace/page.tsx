import DeleteWorkspace from "@/components/settings/delete-workspace";
import WorkspaceName from "@/components/settings/workspace-name";

export default function WorkspaceSettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <WorkspaceName />
      <DeleteWorkspace />
    </div>
  );
}
