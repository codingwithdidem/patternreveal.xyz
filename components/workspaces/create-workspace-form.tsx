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
import { AlertCircle } from "lucide-react";

export default function CreateWorkspaceForm({
  onSuccess,
}: {
  onSuccess?: (data: z.infer<typeof createWorkspaceSchema>) => void;
}) {
  const posthog = usePostHog();
  const { update } = useSession();

  const form = useForm<z.infer<typeof createWorkspaceSchema>>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const slug = form.watch("slug");

  const onSubmit = async (data: z.infer<typeof createWorkspaceSchema>) => {
    try {
      const res = await fetch("/api/workspaces", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const { id: workspaceId } = await res.json();
        // Track workspace creation event
        posthog.capture("workspace_created", {
          workspace_id: workspaceId,
          workspace_name: data.name,
          workspace_slug: data.slug,
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
          message: "Failed to create workspace",
        });
      }
    } catch (e) {
      toast.error("Failed to create workspace.");
      console.error("Failed to create workspace", e);
      form.setError("root.serverError", {
        message: "Failed to create workspace",
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
                    {process.env.NEXT_PUBLIC_APP_DOMAIN}/app/
                  </span>

                  <Input
                    placeholder="acme-inc"
                    {...field}
                    className={`${
                      form.formState.errors.slug
                        ? "border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
                        : "border-neutral-300 text-white placeholder-neutral-400 focus:border-neutral-500 focus:ring-neutral-500"
                    } block w-full rounded-r-md focus:outline-none sm:text-sm rounded-l-none`}
                    required
                    minLength={3}
                    maxLength={20}
                    pattern="^[a-zA-Z0-9\-]+$"
                    onBlur={() => {
                      field.onBlur();
                      fetch(`/api/workspaces/${slug}/exists`).then(
                        async (res) => {
                          if (res.status === 200) {
                            const exists = await res.json();
                            if (exists === 1)
                              form.setError("slug", {
                                message: `The slug "${slug}" is already in use.`,
                              });
                            else form.clearErrors("slug");
                          }
                        }
                      );
                    }}
                  />
                  {form.formState.errors.slug && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <AlertCircle
                        className="h-5 w-5 text-red-500"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </div>
              </FormControl>
              <FormDescription>
                This is the slug of your workspace.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Create Workspace</Button>
      </form>
    </Form>
  );
}
