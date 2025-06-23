"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { GoogleIcon } from "@components/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { registerSchema, verifyEmailSchema } from "@/lib/zod/schemas/auth";
import { useAction } from "next-safe-action/hooks";
import { sendOtpAction } from "@/lib/actions/send-otp";
import { toast } from "sonner";
import Link from "next/link";
import { useRegisterFlow } from "@/lib/store/useRegisterFlow";
import { truncate } from "@/utils/functions/truncate";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { verifyEmailAction } from "@/lib/actions/verify-email";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { ResendOTPButton } from "./resend-otp-button";

export default function RegisterFlow() {
  const { step } = useRegisterFlow();

  return step === "sign-up" ? <SignUp /> : <VerifyEmail />;
}

function VerifyEmail() {
  const { email, password, name } = useRegisterFlow();
  const router = useRouter();

  const [isRedirecting, setIsRedirecting] = useState(false);

  const form = useForm<z.infer<typeof verifyEmailSchema>>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      code: ""
    }
  });

  const { executeAsync, isPending } = useAction(verifyEmailAction, {
    onSuccess: async () => {
      toast.success("Account created successfully, redirecting to dashboard.");
      setIsRedirecting(true);
      // Sign in the user
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false
      });

      if (response?.ok) {
        router.push("/dashboard/reflections");
      } else {
        setIsRedirecting(false);
        toast.error("Failed to sign in, please try again.");
      }
    },
    onError: ({ error }) => {
      toast.error(error.serverError || error.validationErrors?.code?.[0]);
    }
  });

  function onSubmit(data: z.infer<typeof verifyEmailSchema>) {
    executeAsync({
      code: data.code,
      email,
      password,
      name
    });
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-lg font-bold">Please check your email</h1>
      <p className="text-sm text-neutral-500 mt-1">
        We have sent a code to{" "}
        <strong className="font-medium text-neutral-600" title={email}>
          {truncate(email, 30)}
        </strong>
      </p>

      <div className="flex flex-col items-center justify-center mt-4 px-10 w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isPending || isRedirecting}
            >
              {isPending ? "Verifying..." : "Verify"}
            </Button>
          </form>
        </Form>
      </div>

      <ResendOTPButton email={email} />
    </div>
  );
}

function SignUp() {
  const { setStep, setEmail, setName, setPassword } = useRegisterFlow();
  const searchParams = useSearchParams();
  const next = searchParams.get("next");

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  const { executeAsync, isPending } = useAction(sendOtpAction, {
    onSuccess: () => {
      toast.success("Verification code sent to your email.");
      setStep("verify");
    },
    onError: ({ error }) => {
      toast.error(error.serverError || error.validationErrors?.email?.[0]);
    }
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    setEmail(values.email);
    setName(values.name);
    setPassword(values.password);

    await executeAsync({
      email: values.email
    });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-lg font-bold">Get started with patternreveal.xyz</h1>
      <h3 className="text-sm text-gray-500">
        Already have an account?
        <Link
          href="/login"
          className="ml-1 underline-offset-2 underline font-semibold hover:text-blue-500 transition-colors duration-400"
        >
          Sign in
        </Link>
      </h3>
      <div className="flex flex-col mt-4 px-10 w-full">
        <Button
          variant={"outline"}
          onClick={() =>
            signIn("google", {
              ...(next && next.length > 0 ? { callbackUrl: next } : {})
            })
          }
        >
          <GoogleIcon />
          Continue with Google
        </Button>
        <div className="my-4 flex flex-shrink items-center justify-center gap-2">
          <div className="grow basis-0 border-b border-gray-300" />
          <span className="text-xs font-normal uppercase leading-none text-gray-500">
            or
          </span>
          <div className="grow basis-0 border-b border-gray-300" />
        </div>

        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit(onSubmit)(e);
            }}
            className="space-y-3 flex flex-col"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isPending}
              onClick={() => console.log("Submit button clicked")}
            >
              Sign Up
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
