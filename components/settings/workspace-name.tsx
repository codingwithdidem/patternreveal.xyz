"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import React from "react";
import { Button } from "../ui/button";
import useWorkspace from "@/lib/swr/use-workspace";
import { mutate } from "swr";

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

export default function WorkspaceName() {
  const { data: session } = useSession();
  const { id: workspaceId } = useWorkspace();

  const form = useForm<z.infer<typeof nameSchema>>({
    resolver: zodResolver(nameSchema),
    defaultValues: {
      name: session?.user?.name ?? ""
    }
  });

  const updateName = async (name: string) => {
    try {
      const response = await fetch(`/api/workspaces/${workspaceId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name })
      });

      if (response.status === 200) {
        await Promise.all([
          mutate(`/api/workspaces/${workspaceId}`),
          mutate("/api/workspaces")
        ]);
        toast.success("Workspace name updated");
      } else {
        const { error } = await response.json();
        toast.error(error.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update name");
    }
  };

  return (
    <div className="border border-neutral-200 rounded-lg bg-white p-6">
      <h2 className="font-semibold text-lg mb-1">Workspace Name</h2>
      <p className="text-muted-foreground mb-4">
        This is your visible name within the app.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((values) => updateName(values.name))}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Workspace name"
                    className="rounded-md mb-0 max-w-md"
                    maxLength={32}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="-mx-6 border-t border-neutral-200 my-6" />
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Please use 32 characters at maximum.
            </span>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              Save changes
            </Button>
          </div>
          <FormMessage />
        </form>
      </Form>
    </div>
  );
}
