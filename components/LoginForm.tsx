"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { GoogleIcon } from "@components/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { loginSchema } from "@/lib/zod/schemas/auth";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

export const errorCodes = {
  "no-credentials": "Please provide an email and password.",
  "invalid-credentials": "Email or password is incorrect.",
  "exceeded-login-attempts":
    "Account has been locked due to too many login attempts. Please contact support to unlock your account.",
  "too-many-login-attempts": "Too many login attempts. Please try again later.",
  "email-not-verified": "Please verify your email address.",
  Callback:
    "We encountered an issue processing your request. Please try again or contact support if the problem persists.",
  OAuthSignin:
    "There was an issue signing you in. Please ensure your provider settings are correct.",
  OAuthCallback:
    "We faced a problem while processing the response from the OAuth provider. Please try again.",
};

export default function LoginForm() {
  const searchParams = useSearchParams();
  const finalNext = searchParams.get("next");
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    const { email, password } = values;
    const { success } = loginSchema.safeParse({ email, password });

    if (success) {
      console.log("Valid form");
      const response = await signIn("credentials", {
        redirect: false,
        email,
        callbackUrl: finalNext || "/app",
        password,
      });

      if (!response) return;

      if (!response.ok && response.error) {
        console.log("response.error", response);
        if (response.error in errorCodes) {
          toast.error(errorCodes[response.error as keyof typeof errorCodes]);
        } else {
          toast.error(response.error);
        }
        return;
      }

      router.push(response.url || "/app");
    } else {
      console.log("Invalid form");
    }
  };

  return (
    <div className="flex flex-col mt-4 px-10">
      <Button
        variant={"outline"}
        onClick={() =>
          signIn("google", {
            redirect: false,
            callbackUrl: finalNext || "/app",
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
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 flex flex-col"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="codingwithdidem@gmail.com"
                    {...field}
                  />
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
                  <Input placeholder="******" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Login</Button>
        </form>
      </Form>
    </div>
  );
}
