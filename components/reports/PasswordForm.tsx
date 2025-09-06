"use client";
import { useParams, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { verifyPassword, type PasswordFormState } from "@/app/actions/reports";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import { LockIcon } from "lucide-react";
import { useFormStatus } from "react-dom";

const initialState: PasswordFormState = {
  error: null,
};

export function PasswordForm() {
  const params = useParams();
  const router = useRouter();
  const reportId = params.reportId as string;

  const [state, formAction] = useFormState(verifyPassword, initialState);
  const { pending } = useFormStatus();

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }

    if (state.success && state.redirectUrl) {
      router.push(state.redirectUrl);
    }
  }, [state, router]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="reportId" value={reportId} />
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">Password protected</h1>
        <p className="text-sm text-gray-500">
          This report is password protected. Please enter the password to view
          it.
        </p>
      </div>
      <Input
        name="password"
        placeholder="Password"
        type="password"
        className="w-full"
        required
      />
      <Button type="submit" className="w-full" disabled={pending}>
        <LockIcon className="w-4 h-4 mr-2" />
        {pending ? "Unlocking..." : "Unlock"}
      </Button>
    </form>
  );
}
