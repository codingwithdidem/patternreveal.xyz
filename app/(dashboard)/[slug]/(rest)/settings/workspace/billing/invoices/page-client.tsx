"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Download, FileText } from "lucide-react";
import Link from "next/link";
import useWorkspace from "@/lib/swr/use-workspace";

export default function InvoicesPageClient() {
  const workspace = useWorkspace();

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-6 font-[family-name:var(--font-satoshi)]">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href={`/${workspace.slug}/settings/workspace/billing`}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Billing
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
          <p className="text-gray-600 mt-1">
            View and download your billing invoices
          </p>
        </div>
      </div>

      {/* Invoices List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Billing History
          </CardTitle>
          <CardDescription>
            Your recent invoices and payment history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No invoices yet
            </h3>
            <p className="text-gray-600">
              Invoices will appear here once you have billing activity.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 