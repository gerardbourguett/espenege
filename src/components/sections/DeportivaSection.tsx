"use client";

import { useEffect } from "react";
import type { Article } from "@/types/article";
import { SportScoreCard } from "@/components/sports/SportScoreCard";
import { NewsCardStandard } from "@/components/news/NewsCardStandard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSportsStore } from "@/stores/sports-store";

interface DeportivaSectionProps {
  articles: Article[];
}

export function DeportivaSection({ articles }: DeportivaSectionProps) {
  const { football, tennis, basketball, isLoading, hasFetched, fetchAllSports } = useSportsStore();

  // Fetch all sports data on mount
  useEffect(() => {
    fetchAllSports();
  }, [fetchAllSports]);

  // Auto-refresh every 60 seconds for live scores
  useEffect(() => {
    const interval = setInterval(() => {
      fetchAllSports();
    }, 60000); // 60 seconds

    return () => clearInterval(interval);
  }, [fetchAllSports]);

  // Combine all matches for the score strip
  const allMatches = [...football, ...tennis, ...basketball];

  // Show loading skeleton while loading and no data has been fetched yet
  const showLoadingSkeleton = isLoading && !hasFetched && allMatches.length === 0;

  return (
    <section className="bg-spng-bg-secondary py-10">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader title="Deportiva" href="/deportiva" accentColor="#059669" />

        {/* Score cards horizontal scroll */}
        <div className="mb-8 -mx-4 px-4">
          {showLoadingSkeleton ? (
            <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="min-w-[280px] h-24 bg-gray-200 rounded-lg animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
              {allMatches
                .filter((m) => m.status === "live" || m.status === "finished")
                .slice(0, 8)
                .map((match) => (
                  <SportScoreCard key={match.id} match={match} />
                ))}
            </div>
          )}
        </div>

        {/* Tabs for sports + news */}
        <Tabs defaultValue="futbol">
          <TabsList>
            <TabsTrigger
              value="futbol"
              className="data-[state=active]:bg-spng-primary data-[state=active]:text-white"
            >
              Futbol
            </TabsTrigger>
            <TabsTrigger
              value="tenis"
              className="data-[state=active]:bg-spng-primary data-[state=active]:text-white"
            >
              Tenis
            </TabsTrigger>
            <TabsTrigger
              value="basquetbol"
              className="data-[state=active]:bg-spng-primary data-[state=active]:text-white"
            >
              Basquetbol
            </TabsTrigger>
          </TabsList>
          <TabsContent value="futbol" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {articles.slice(0, 4).map((article) => (
                <NewsCardStandard key={article.id} article={article} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="tenis" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {articles.slice(0, 4).map((article) => (
                <NewsCardStandard key={article.id} article={article} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="basquetbol" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {articles.slice(0, 4).map((article) => (
                <NewsCardStandard key={article.id} article={article} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
