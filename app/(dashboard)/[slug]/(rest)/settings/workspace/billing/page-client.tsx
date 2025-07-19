"use client";

import PlanUsage from "@/components/billing/plan-usage";
import useWorkspace from "@/lib/swr/use-workspace";
import { Loader2, FileText, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SubscriptionMenu from "@/components/billing/subscription-menu";

export default function BillingPageClient() {
  const workspace = useWorkspace();

  if (!workspace || !workspace.plan) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
      </div>
    );
  }

  if (!workspace.slug) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Workspace not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-6 font-[family-name:var(--font-satoshi)]">
      {/* Header with Invoices Link */}
      <div className="flex items-center justify-between">
        <div></div>
        <div className="flex items-center gap-3">
          {workspace.plan.toLowerCase() === "free" && (
            <Button className="flex items-center gap-2">Upgrade</Button>
          )}
          <Link href={`/${workspace.slug}/settings/workspace/billing/invoices`}>
            <Button variant="outline" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              View Invoices
            </Button>
          </Link>

          {workspace.plan !== "free" && workspace.paddleCustomerId && (
            <SubscriptionMenu />
          )}
        </div>
      </div>

      <PlanUsage
        plan={workspace.plan}
        billingCycleStart={workspace.billingCycleStart}
        reflectionsUsage={workspace.reflectionsUsage || 0}
        reflectionsLimit={workspace.reflectionsLimit || 0}
        aiUsage={workspace.aiUsage || 0}
        aiLimit={workspace.aiLimit || 0}
        usersLimit={workspace.usersLimit || 0}
        totalUsers={workspace.users?.length || 1}
        workspaceSlug={workspace.slug}
      />
    </div>
  );
}
