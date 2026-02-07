import { Suspense } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { LatestSectionWrapper } from "@/components/sections/LatestSectionWrapper";
import { CategorySection } from "@/components/sections/CategorySection";
import { DeportivaSectionWrapper } from "@/components/sections/DeportivaSectionWrapper";
import { Skeleton } from "@/components/ui/skeleton";

function SectionSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Skeleton className="h-8 w-48 mb-6" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton className="h-64 rounded-xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
          <Skeleton className="h-48 rounded-xl" />
          <Skeleton className="h-48 rounded-xl" />
          <Skeleton className="h-48 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Suspense fallback={<SectionSkeleton />}>
        <HeroSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <LatestSectionWrapper />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <CategorySection category="nacional" />
      </Suspense>

      <div className="bg-spng-bg-secondary">
        <Suspense fallback={<SectionSkeleton />}>
          <CategorySection category="internacional" reversed />
        </Suspense>
      </div>

      <Suspense fallback={<SectionSkeleton />}>
        <DeportivaSectionWrapper />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <CategorySection category="electoral" />
      </Suspense>

      <div className="bg-spng-bg-secondary">
        <Suspense fallback={<SectionSkeleton />}>
          <CategorySection category="popurri" reversed />
        </Suspense>
      </div>

      <Suspense fallback={<SectionSkeleton />}>
        <CategorySection category="no-somos-nada" />
      </Suspense>
    </>
  );
}
