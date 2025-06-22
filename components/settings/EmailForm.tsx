"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useDebounceCallback } from "usehooks-ts";
import React from "react";

const emailSchema = z.object({
  email: z
    .string()
    .nonempty({
      message: "Email is required."
    })
    .email({
      message: "Email must be a valid email address."
    })
});

export default function EmailForm() {
  const { data: session, update } = useSession();

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: session?.user?.email ?? ""
    }
  });

  const updateEmail = async (email: string) => {
    try {
      const response = await fetch("/api/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      if (response.status === 200) {
        toast.success(`A confirmation email has been sent to ${email}.`);
      } else {
        const { error } = await response.json();
        toast.error(error.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update email");
    }
  };

  const debouncedUpdate = useDebounceCallback(updateEmail, 1000);

  return (
    <div className="flex items-center gap-10 w-full py-4">
      <div className="flex flex-col gap-0.5 mb-4 w-full">
        <h2 className="font-semibold text-lg">Email</h2>
        <p className="text-muted-foreground">
          Your email address is used for account recovery and notifications.
        </p>
      </div>
      <Form {...form}>
        <form className="w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="adalovelace@patternreveal.xyz"
                    className="max-w-md w-full rounded-2xl"
                    maxLength={32}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      if (e.target.value) {
                        debouncedUpdate(e.target.value);
                      }
                    }}
                  />
                </FormControl>
                <FormDescription>
                  We will send a verification email to confirm the change.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
