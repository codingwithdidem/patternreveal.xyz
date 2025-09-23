import { Skeleton } from "@/components/ui/skeleton";

export default function AnalysisSkeleton() {
  // Create unique IDs for skeleton elements to avoid linter warnings
  const createUniqueId = (prefix: string, index: number) =>
    `${prefix}-${Date.now()}-${index}`;

  return (
    <div className="space-y-6">
      {/* Detailed Analysis Tabs */}
      <div className="">
        <div className="flex w-full justify-stretch overflow-x-scroll scrollbar-hide mb-8 space-y-0">
          {/* Tab buttons skeleton */}
          {Array.from({ length: 12 }, (_, index) => (
            <div
              key={createUniqueId("tab", index)}
              className="flex-1 min-w-0 px-3 py-2 border-b-2 border-gray-200"
            >
              <Skeleton className="h-4 w-16 mx-auto" />
            </div>
          ))}
        </div>

        {/* Overall Assessment Content Skeleton */}
        <div className="space-y-6">
          {/* Relationship Health Assessment Skeleton */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 border border-slate-200/60">
            <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

            <div className="relative p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-2">
                  <Skeleton className="h-6 w-64" />
                  <Skeleton className="h-4 w-80" />
                </div>
                <Skeleton className="h-6 w-24" />
              </div>

              {/* Health Score Skeleton */}
              <div className="flex items-center gap-6">
                <Skeleton className="w-20 h-20 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-48" />
                </div>
              </div>
            </div>
          </div>

          {/* Summary Section Skeleton */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-8 w-8 rounded-lg" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>

          {/* Insights Sections Skeleton */}
          <div className="space-y-6">
            {/* Key Insights Skeleton */}
            <div className="border-blue-200 bg-blue-50/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Skeleton className="w-4 h-4" />
                <Skeleton className="h-5 w-24" />
              </div>
              <div className="space-y-2">
                {Array.from({ length: 3 }, (_, index) => (
                  <div
                    key={createUniqueId("insight", index)}
                    className="flex gap-3 p-3 bg-white rounded-lg border border-blue-200/50"
                  >
                    <Skeleton className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <Skeleton className="h-4 flex-1" />
                  </div>
                ))}
              </div>
            </div>

            {/* Warning Flags Skeleton */}
            <div className="border-orange-200 bg-orange-50/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Skeleton className="w-4 h-4" />
                <Skeleton className="h-5 w-32" />
              </div>
              <div className="space-y-2">
                {Array.from({ length: 2 }, (_, index) => (
                  <div
                    key={createUniqueId("warning", index)}
                    className="flex gap-3 p-3 bg-white rounded-lg border border-orange-200/50"
                  >
                    <Skeleton className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <Skeleton className="h-4 flex-1" />
                  </div>
                ))}
              </div>
            </div>

            {/* Positive Highlights Skeleton */}
            <div className="border-green-200 bg-green-50/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Skeleton className="w-4 h-4" />
                <Skeleton className="h-5 w-28" />
              </div>
              <div className="space-y-2">
                {Array.from({ length: 2 }, (_, index) => (
                  <div
                    key={createUniqueId("highlight", index)}
                    className="flex gap-3 p-3 bg-white rounded-lg border border-green-200/50"
                  >
                    <Skeleton className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <Skeleton className="h-4 flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Content Sections Skeleton */}
          <div className="space-y-6">
            {/* Pattern Analysis Sections */}
            {Array.from({ length: 4 }, (_, sectionIndex) => (
              <div
                key={createUniqueId("section", sectionIndex)}
                className="space-y-4"
              >
                <div className="flex items-center gap-2">
                  <Skeleton className="w-5 h-5" />
                  <Skeleton className="h-6 w-40" />
                </div>

                {/* Pattern Cards */}
                <div className="grid gap-4">
                  {Array.from({ length: 2 }, (_, cardIndex) => (
                    <div
                      key={createUniqueId(`card-${sectionIndex}`, cardIndex)}
                      className="border rounded-lg p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-6 w-16 rounded-full" />
                      </div>
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <div className="flex gap-2">
                        <Skeleton className="h-6 w-20 rounded-full" />
                        <Skeleton className="h-6 w-24 rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Actionable Insights Skeleton */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Skeleton className="w-5 h-5" />
              <Skeleton className="h-6 w-36" />
            </div>

            {/* Action Cards */}
            <div className="space-y-4">
              {Array.from({ length: 3 }, (_, index) => (
                <div
                  key={createUniqueId("action", index)}
                  className="border rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-48" />
                    <div className="flex gap-2">
                      <Skeleton className="h-6 w-16 rounded-full" />
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-4 h-4" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
