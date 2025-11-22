import NameForm from "@/components/settings/NameForm";
import EmailForm from "@/components/settings/EmailForm";
import DeleteAccountForm from "@/components/settings/DeleteAccountForm";
import UpdateDefaultWorkspaceForm from "@/components/settings/update-default-workspace-form";
import { constructMetadata } from "@/utils/functions/construct-metadata";

export const metadata = constructMetadata({
  title: "Account Settings - PatternReveal",
  description:
    "Update your personal account information, email address, and manage your PatternReveal profile settings.",
  noIndex: true,
});

export default function AccountSettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <NameForm />
      <EmailForm />
      <UpdateDefaultWorkspaceForm />
      <DeleteAccountForm />
    </div>
  );
}
