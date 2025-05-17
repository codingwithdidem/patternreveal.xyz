import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@components/ui/dialog";
import { LockIcon, SearchIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { useAction } from "next-safe-action/hooks";
import { createReflectionReportLinkAction } from "@/lib/actions/create-reflection-report-link";
import { toast } from "sonner";
import type { Reflection, Report } from "@prisma/client";
import { usePostHog } from "posthog-js/react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reportSettingsSchema } from "@/lib/zod/schemas/report";
import type { z } from "zod";
import useSWR from "swr";
import { fetcher } from "@/lib/swr/fetcher";
import { CopyInput } from "../CopyInput";
import { Button } from "../ui/button";

type ShareReportModalProps = {
  open: boolean;
  reflection: Reflection;
  onClose: () => void;
};

export default function ShareReportModal({
  open,
  reflection,
  onClose
}: ShareReportModalProps) {
  const posthog = usePostHog();

  const {
    data: report,
    isLoading,
    mutate
  } = useSWR<Report>(`/api/reflections/${reflection.id}/report`, fetcher, {
    dedupingInterval: 60000
  });

  const [generatedLink, setGeneratedLink] = useState<string>("");

  const { register, handleSubmit, watch, setValue, formState } = useForm<
    z.infer<typeof reportSettingsSchema>
  >({
    resolver: zodResolver(reportSettingsSchema),
    defaultValues: {
      password: null,
      index: false
    }
  });

  const shareReflectionReport = useAction(createReflectionReportLinkAction, {
    onSuccess: ({ data }) => {
      setGeneratedLink(data?.shortLink ?? "");
      // Capture reflection report shared event
      posthog.capture("reflection_report_shared", {
        report_id: reflection.id,
        report_title: reflection.title,
        report_link: data?.shortLink
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to generate sharing link");
    }
  });

  useEffect(() => {
    if (open) {
      if (report?.shortLink) {
        setGeneratedLink(report.shortLink);
      } else if (!isLoading) {
        generateLink();
      }
    }
  }, [open, report, isLoading]);

  useEffect(() => {
    if (report) {
      setValue("index", report.index);
      setValue("password", report.password);
    }
  }, [report]);

  const generateLink = () => {
    shareReflectionReport.execute({
      baseUrl: window.location.origin,
      reflectionId: reflection.id,
      expiresAt: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000 // 1 week
      ).toISOString()
    });
  };

  const onReportSettingsSubmit = async (
    data: z.infer<typeof reportSettingsSchema>
  ) => {
    if (!report) return;

    const response = await fetch(`/api/reports/${report.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      mutate();
      toast.success("Saved changes");
      onClose();
    } else {
      toast.error("Failed to save changes");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Report</DialogTitle>
          <DialogDescription>
            Share your report with others by copying the link below. You can
            enable public access to allow anyone with the link to view your
            report.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-5 py-2">
          <div className="flex flex-col gap-1">
            <CopyInput value={generatedLink} />
            <p className="text-xs text-gray-500 pl-0.5">
              Link expires in 7 days
            </p>
          </div>

          <form
            className="flex flex-col gap-2"
            onSubmit={handleSubmit(onReportSettingsSubmit)}
          >
            <h3 className="text-md font-medium">Report Settings</h3>
            {/* Indexing */}
            <div className="flex items-center justify-between">
              <Label htmlFor="indexing" className="flex items-center space-x-2">
                <SearchIcon className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-500">
                  Enable search engine indexing
                </span>
              </Label>
              <Switch
                id="indexing"
                checked={watch("index")}
                onCheckedChange={(checked) => {
                  setValue("index", checked, {
                    shouldDirty: true // This will trigger validation
                  });
                }}
              />
            </div>
            {/* Password protection */}
            <div className="flex items-center justify-between">
              <Label
                htmlFor="password-protection"
                className="flex items-center space-x-2"
              >
                <LockIcon className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-500">
                  Enable password protection
                </span>
              </Label>
              <Switch
                id="password-protection"
                checked={watch("password") !== null}
                onCheckedChange={(checked) => {
                  const pw = checked ? "" : null;
                  setValue("password", pw, {
                    shouldDirty: true // This will trigger validation
                  });
                }}
              />
            </div>
            {watch("password") !== null && (
              <Input
                {...register("password")}
                required
                type="password"
                placeholder="Password"
                data-1p-ignore
              />
            )}
            <Button
              type="submit"
              className="w-full mt-4"
              disabled={!formState.isDirty}
            >
              Save changes
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
