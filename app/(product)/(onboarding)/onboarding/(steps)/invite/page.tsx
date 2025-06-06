import LaterButton from "../../later-button";
import InviteForm from "./form";

export default function InvitePage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="bg-gradient-to-b from-neutral-200 to-neutral-600 bg-clip-text text-transparent md:text-5xl font-bold">
        Invite people to your workspace
      </h1>
      <p className="text-neutral-400 text-md mt-3 mb-6 max-w-md text-center">
        Invite your spouse, family, or friends to your workspace. Invitations
        will be sent to their email addresses and they will be valid for 7 days.
      </p>
      <InviteForm />
      <div className="mt-4">
        <LaterButton next="plan" />
      </div>
    </div>
  );
}
