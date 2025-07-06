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
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import React from "react";
import SubscribeToNewsletter from "../SubscribeToNewsletter";

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

  return (
    <div className="border border-neutral-200 rounded-lg bg-white p-6">
      <h2 className="font-semibold text-lg mb-1">Email</h2>
      <p className="text-muted-foreground mb-4">
        This is your primary email address to login and receive notifications.
        We will send a verification email to confirm the change.
      </p>
      <Form {...form}>
        <form
          className="w-full"
          onSubmit={form.handleSubmit((values) => updateEmail(values.email))}
        >
          <Input
            placeholder="adalovelace@patternreveal.xyz"
            className="rounded-md mb-0 max-w-md"
            {...form.register("email")}
          />
          <FormMessage />
          <div className="-mx-6 border-t border-neutral-200 my-6" />
          <div className="flex items-center justify-between">
            <SubscribeToNewsletter />
            <Button type="submit" disabled={form.formState.isSubmitting}>
              Save changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
