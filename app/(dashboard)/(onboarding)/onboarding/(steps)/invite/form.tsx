"use client";

import { useFieldArray, useForm } from "react-hook-form";
import type { z } from "zod";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { mutate } from "swr";
import { toast } from "sonner";
import { usePostHog } from "posthog-js/react";
import useWorkspace from "@/lib/swr/use-workspace";
import type { inviteTeammatesSchema } from "@/lib/zod/schemas/invites";
import { pluralize } from "@/utils/functions/pluralize";

export default function InviteForm({
  onSuccess
}: {
  onSuccess?: () => void;
}) {
  const posthog = usePostHog();
  const { id, slug, plan } = useWorkspace();

  const isSaveOnly = plan === "free";

  const form = useForm<z.infer<typeof inviteTeammatesSchema>>({
    defaultValues: {
      teammates: [
        {
          email: "",
          role: "MEMBER"
        }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    name: "teammates",
    control: form.control
  });

  const onSubmit = async (data: z.infer<typeof inviteTeammatesSchema>) => {
    const teammates = data.teammates.filter(
      (teammate) => teammate.email !== ""
    );

    const res = await fetch(
      `/api/workspaces/${id}/invites${isSaveOnly ? "/saved" : ""}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teammates })
      }
    );

    if (res.ok) {
      await mutate(`/api/workspaces/${id}/invites`);

      if (isSaveOnly) {
        toast.custom(
          () => (
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-semibold">Invitations saved</h2>
            </div>
          ),
          {
            duration: 4000
          }
        );
        return;
      }

      toast.success(`${pluralize("Invitation", teammates.length)} sent!`);

      for (const { email } of teammates) {
        posthog.capture("teammate_invited", {
          workspace: slug,
          invitee_email: email
        });
      }

      onSuccess?.();
    } else {
      const { error } = await res.json();
      if (error.message.includes("upgrade")) {
        // toast.custom(
        //   () => (
        //     <UpgradeRequiredToast
        //       title="Upgrade required"
        //       message="You've reached the invite limit for your plan. Please upgrade to invite more teammates."
        //     />
        //   ),
        //   { duration: 4000 }
        // );
        toast.error(
          "You've reached the invite limit for your plan. Please upgrade to invite more teammates."
        );
      } else {
        toast.error(error.message);
      }
      throw error;
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4 max-w-md rounded-md"
      >
        <div className="flex flex-col gap-2">
          {fields.map((field, index) => (
            <div key={field.id} className="relative">
              <div className="relative flex rounded-md">
                <FormField
                  control={form.control}
                  name={`teammates.${index}.email`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="codingwithdidem@gmail.com"
                          autoFocus={index === 0}
                          autoComplete="off"
                          className="rounded-r-none z-10"
                          onChange={(e) => {
                            console.log("Email input changed:", e.target.value);
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`teammates.${index}.role`}
                  render={({ field }) => (
                    <FormItem className="w-[180px]">
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            console.log("Role changed:", value);
                            field.onChange(value);
                          }}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="border-l-0 rounded-l-none">
                            <SelectValue placeholder="Role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="MEMBER">Member</SelectItem>
                            <SelectItem value="OWNER">Owner</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              {index > 0 && (
                <Button
                  variant="link"
                  size="icon"
                  onClick={() => remove(index)}
                  className="absolute -right-1 top-1/2 -translate-y-1/2 translate-x-full text-muted-foreground"
                  type="button"
                >
                  <X />
                </Button>
              )}
            </div>
          ))}
          <Button
            onClick={() => {
              append({
                email: "",
                role: "MEMBER"
              });
            }}
            type="button"
            className="mt-4"
            disabled={fields.length >= 4}
          >
            <Plus /> Add email
          </Button>
        </div>

        <Button
          type="submit"
          onClick={() => console.log("Submit button clicked")}
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Sending invites..." : "Send invites"}
        </Button>
      </form>
    </Form>
  );
}
