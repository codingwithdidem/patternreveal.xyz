"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  ArrowLeft,
  Download,
  FileText,
  ReceiptIcon,
  Loader2
} from "lucide-react";
import Link from "next/link";
import useWorkspace from "@/lib/swr/use-workspace";
import AnimatedEmptyState from "@/components/AnimatedEmptyState";
import useSWR from "swr";
import { fetcher } from "@/lib/swr/fetcher";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";

// Updated interface to match the new API response
interface Invoice {
  id: string;
  status: string;
  origin: string;
  collectionMode: string;
  currencyCode: string;
  amount: string;
  createdAt: string;
}

interface InvoicesResponse {
  invoices: Invoice[];
}

export default function InvoicesPageClient() {
  const workspace = useWorkspace();
  const [downloadingInvoice, setDownloadingInvoice] = useState<string | null>(
    null
  );

  const { data, isLoading, error } = useSWR<InvoicesResponse>(
    workspace?.id ? `/api/workspaces/${workspace.id}/billing/invoices` : null,
    fetcher
  );

  const invoices = data?.invoices || [];

  const handleDownloadInvoice = async (transactionId: string) => {
    setDownloadingInvoice(transactionId);

    try {
      const response = await fetch(
        `/api/workspaces/${workspace.id}/billing/invoices/${transactionId}/pdf`
      );
      const data = await response.json();

      console.log(data);

      if (data.url) {
        // Open customer portal in new tab for PDF download
        window.open(data.url, "_blank");
        toast.success("Opening customer portal to download invoice");
      } else {
        toast.error(data.message || "Failed to download invoice");
      }
    } catch (error) {
      console.error("Error downloading invoice:", error);
      toast.error("Failed to download invoice. Please try again.");
    } finally {
      setDownloadingInvoice(null);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto space-y-6 p-6 font-[family-name:var(--font-satoshi)]">
        <div className="flex items-center gap-4">
          <Link href={`/${workspace.slug}/settings/workspace/billing`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Billing
            </Button>
          </Link>
        </div>

        <div className="flex items-center justify-center h-64">
          <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto space-y-6 p-6 font-[family-name:var(--font-satoshi)]">
        <div className="flex items-center gap-4">
          <Link href={`/${workspace.slug}/settings/workspace/billing`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Billing
            </Button>
          </Link>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Unable to load invoices
              </h3>
              <p className="text-muted-foreground">
                There was an error loading your invoices. Please try again
                later.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
      case "completed":
        return "default";
      case "billed":
        return "secondary";
      case "pending":
        return "outline";
      default:
        return "secondary";
    }
  };

  const getOriginLabel = (origin: string) => {
    switch (origin) {
      case "api":
        return "API";
      case "checkout":
        return "Checkout";
      case "subscription":
        return "Subscription";
      default:
        return origin;
    }
  };

  const getCollectionModeLabel = (mode: string) => {
    switch (mode) {
      case "automatic":
        return "Automatic";
      case "manual":
        return "Manual";
      default:
        return mode;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-6 font-[family-name:var(--font-satoshi)]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/${workspace.slug}/settings/workspace/billing`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Billing
            </Button>
          </Link>
        </div>
      </div>

      {invoices.length === 0 ? (
        <AnimatedEmptyState
          title="No invoices yet"
          description="Invoices will appear here once you have billing activity."
          cardContent={
            <div className="text-center flex gap-2 w-full">
              <ReceiptIcon className="size-4 text-neutral-400" />
              <span className="bg-neutral-200 w-full h-4 rounded-md animate-pulse" />
            </div>
          }
        />
      ) : (
        <div className="space-y-4">
          {invoices.map((invoice: Invoice) => (
            <Card
              key={invoice.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <ReceiptIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">
                          Invoice #{invoice.id.slice(-8)}
                        </h3>
                        <Badge variant={getStatusBadgeVariant(invoice.status)}>
                          {invoice.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(invoice.createdAt), "MMM dd, yyyy")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-semibold">
                        {invoice.amount} {invoice.currencyCode}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownloadInvoice(invoice.id)}
                      disabled={downloadingInvoice === invoice.id}
                    >
                      {downloadingInvoice === invoice.id ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Download className="h-4 w-4 mr-2" />
                      )}
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
