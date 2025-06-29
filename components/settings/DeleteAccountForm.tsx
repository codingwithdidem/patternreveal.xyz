"use client";
import { useDeleteAccountModal } from "@/lib/stores/modal-store";
import { Button } from "@/components/ui/button";

export default function DeleteAccountForm() {
  const { setShow } = useDeleteAccountModal();

  return (
    <div className="flex items-center gap-10 w-full py-4">
      <div className="flex flex-col gap-0.5 mb-4 w-full">
        <h2 className="font-semibold text-lg text-destructive">
          Delete Account
        </h2>
        <p className="text-muted-foreground">
          Permanently delete your account and all associated data. This action
          cannot be undone.
        </p>
      </div>
      <div className="w-full max-w-md">
        <Button
          variant="destructive"
          className="w-full rounded-2xl"
          onClick={() => setShow(true)}
        >
          Delete Account
        </Button>
      </div>
    </div>
  );
}
