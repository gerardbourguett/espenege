import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Hero skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Skeleton className="w-full aspect-[16/10] rounded-lg" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-24 rounded-lg" />
          <Skeleton className="h-24 rounded-lg" />
          <Skeleton className="h-24 rounded-lg" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="w-full aspect-[16/9] rounded-lg" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}
