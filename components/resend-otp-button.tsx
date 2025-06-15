"use client";

import { sendOtpAction } from "@/lib/actions/send-otp";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

export function ResendOTPButton({ email }: { email: string }) {
  const { executeAsync, isPending } = useAction(sendOtpAction, {
    onSuccess: () => {
      toast.success("We've sent you a new code");
    },
    onError: (error) => {
      console.log(error);
      toast.error(
        error.error.serverError ||
          "Something went wrong while sending the code, please try again later"
      );
    }
  });

  return (
    <h3 className="text-sm text-gray-500 mt-4">
      {`Didn't receive the code?`}
      <button
        type="button"
        onClick={async () => {
          await executeAsync({ email });
        }}
        className="ml-1 font-bold text-black"
        disabled={isPending}
      >
        {isPending ? "Sending..." : "Resend"}
      </button>
    </h3>
  );
}
