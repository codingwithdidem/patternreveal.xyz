"use client";

import { createWorkspaceSchema } from "@/lib/zod/schemas/workspace";
import type { z } from "zod";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { Form, FormMessage } from "../ui/form";
import { FormDescription } from "../ui/form";
import { FormControl } from "../ui/form";
import { FormLabel } from "../ui/form";
import { FormItem } from "../ui/form";
import { FormField } from "../ui/form";
import { Input } from "../ui/input";
import slugify from "slugify";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { usePostHog } from "posthog-js/react";
import { mutate } from "swr";

export default function CreateWorkspaceForm({
  onSuccess
}: {
  onSuccess?: (data: z.infer<typeof createWorkspaceSchema>) => void;
}) {
  const posthog = usePostHog();
  const { update } = useSession();

  const form = useForm<z.infer<typeof createWorkspaceSchema>>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: "",
      slug: ""
    }
  });

  const onSubmit = async (data: z.infer<typeof createWorkspaceSchema>) => {
    try {
      const res = await fetch("/api/workspaces", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        const { id: workspaceId } = await res.json();
        // Track workspace creation event
        posthog.capture("workspace_created", {
          workspace_id: workspaceId,
          workspace_name: data.name,
          workspace_slug: data.slug
        });

        await Promise.all([mutate("/api/workspaces"), update()]);
        onSuccess?.(data);
      } else {
        const { error } = await res.json();
        const message = error.message;

        if (message.toLowerCase().includes("slug")) {
          toast.error(message);
          return form.setError("slug", { message });
        }

        toast.error(message);
        form.setError("root.serverError", {
          message: "Failed to create workspace"
        });
      }
    } catch (e) {
      toast.error("Failed to create workspace.");
      console.error("Failed to create workspace", e);
      form.setError("root.serverError", {
        message: "Failed to create workspace"
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workspace Name</FormLabel>
              <FormControl>
                <Input
                  autoFocus={true}
                  placeholder="Acme Inc."
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    form.setValue(
                      "slug",
                      slugify(e.target.value, { lower: true })
                    );
                  }}
                />
              </FormControl>
              <FormDescription>
                This is the name of your workspace.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workspace Slug</FormLabel>
              <FormControl>
                <div className="relative flex rounded-md">
                  <span className="inline-flex items-center rounded-l-md border border-r-0 border-neutral-300 bg-neutral-900 px-5 text-neutral-200 sm:text-sm">
                    app.{process.env.NEXT_PUBLIC_APP_DOMAIN}
                  </span>
                  <Input
                    placeholder="acme-inc"
                    {...field}
                    className="rounded-l-none"
                  />
                </div>
              </FormControl>
              <FormDescription>
                This is the slug of your workspace.
              </FormDescription>
            </FormItem>
          )}
        />

        <Button type="submit">Create Workspace</Button>
      </form>
    </Form>
  );
}
