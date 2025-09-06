import AnalyticsPageClient from "./page-client";

export const dynamic = "force-dynamic";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <AnalyticsPageClient />
    </div>
  );
}
