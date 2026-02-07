export function MatchDetailSkeleton() {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Main score card skeleton */}
      <div className="bg-neutral-950 rounded-2xl ring-1 ring-neutral-800 p-6 md:p-8">
        {/* League + status */}
        <div className="flex items-center justify-between mb-6">
          <div className="h-4 w-32 bg-neutral-800 rounded animate-pulse" />
          <div className="h-4 w-16 bg-neutral-800 rounded animate-pulse" />
        </div>

        {/* Teams + Score */}
        <div className="flex items-center justify-between gap-4">
          {/* Home team */}
          <div className="flex flex-col items-center gap-3 flex-1">
            <div className="w-16 h-16 bg-neutral-800 rounded-full animate-pulse" />
            <div className="h-5 w-20 bg-neutral-800 rounded animate-pulse" />
            <div className="h-3 w-28 bg-neutral-800 rounded animate-pulse" />
          </div>

          {/* Score */}
          <div className="flex items-center gap-3">
            <div className="h-12 w-10 bg-neutral-800 rounded animate-pulse" />
            <div className="h-6 w-4 bg-neutral-800 rounded animate-pulse" />
            <div className="h-12 w-10 bg-neutral-800 rounded animate-pulse" />
          </div>

          {/* Away team */}
          <div className="flex flex-col items-center gap-3 flex-1">
            <div className="w-16 h-16 bg-neutral-800 rounded-full animate-pulse" />
            <div className="h-5 w-20 bg-neutral-800 rounded animate-pulse" />
            <div className="h-3 w-28 bg-neutral-800 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Match info skeleton */}
      <div className="mt-4 bg-neutral-950 rounded-xl p-5 ring-1 ring-neutral-800">
        <div className="h-4 w-40 bg-neutral-800 rounded animate-pulse mb-3" />
        <div className="space-y-3">
          <div className="h-4 w-64 bg-neutral-800 rounded animate-pulse" />
          <div className="h-4 w-32 bg-neutral-800 rounded animate-pulse" />
          <div className="h-4 w-24 bg-neutral-800 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
