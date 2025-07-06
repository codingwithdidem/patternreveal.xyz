"use client";
import { Switch } from "@/components/ui/switch";
import { useOptimisticUpdate } from "@/hooks/use-optimistic-update";

export default function SubscribeToNewsletter() {
  const { data, isLoading, update } = useOptimisticUpdate<{
    subscribed: boolean;
  }>("/api/user/subscribe", {
    loading: "Updating newsletter preferences...",
    success: "Newsletter preferences updated!",
    error: "Failed to update newsletter preferences"
  });

  return (
    <div className="flex items-center gap-2 mt-2 relative">
      <div className="relative mt-1">
        <Switch
          checked={data?.subscribed ?? false}
          disabled={isLoading}
          onCheckedChange={(checked) => {
            // Prevent rapid toggling
            if (isLoading) return;

            update(
              async () => {
                const response = await fetch("/api/user/subscribe", {
                  method: checked ? "POST" : "DELETE",
                  headers: {
                    "Content-Type": "application/json"
                  }
                });

                if (!response.ok) {
                  const errorData = await response.json().catch(() => ({}));
                  throw new Error(
                    errorData.message || "Failed to update subscription"
                  );
                }

                return {
                  subscribed: checked
                };
              },
              {
                subscribed: checked
              }
            );
          }}
        />
        {isLoading && (
          <div className="absolute inset-0 bg-background/50 rounded-full flex items-center justify-center">
            <div className="h-3 w-3 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        )}
      </div>
      <span className="text-sm text-muted-foreground">
        Subscribe to product updates
      </span>
    </div>
  );
}
