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

const nameSchema = z.object({
  name: z
    .string()
    .nonempty({
      message: "Name is required."
    })
    .max(32, {
      message: "Name must be at most 32 characters."
    })
});

export default function NameForm() {
  const { data: session, update } = useSession();

  const form = useForm<z.infer<typeof nameSchema>>({
    resolver: zodResolver(nameSchema),
    defaultValues: {
      name: session?.user?.name ?? ""
    }
  });

  const updateName = async (name: string) => {
    try {
      const response = await fetch("/api/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name })
      });

      if (response.status === 200) {
        toast.success("Name updated");
        await update();
      } else {
        const { error } = await response.json();
        toast.error(error.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update name");
    }
  };

  const debouncedUpdate = useDebounceCallback(updateName, 1000);

  return (
    <div className="flex items-center gap-10 w-full py-4">
      <div className="flex flex-col gap-0.5 mb-4 w-full">
        <h2 className="font-semibold text-lg">Your Name</h2>
        <p className="text-muted-foreground">
          This is how your name will appear to other users.
        </p>
      </div>
      <Form {...form}>
        <form className="w-full">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Ada Lovelace"
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
                  Your name must be at most 32 characters.
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
