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

  useEffect(() => {
    fetchAllSports();
  }, [fetchAllSports]);

  // Auto-refresh every 60 seconds for live scores
  useEffect(() => {
    const interval = setInterval(() => {
      fetchAllSports();
    }, 60000);
    return () => clearInterval(interval);
  }, [fetchAllSports]);

  const allMatches = [...football, ...tennis, ...basketball];
  const showLoadingSkeleton = isLoading && !hasFetched && allMatches.length === 0;

  // Separate by status for display
  const liveMatches = allMatches.filter((m) => m.status === "live");
  const finishedMatches = allMatches.filter((m) => m.status === "finished");
  const upcomingMatches = allMatches.filter((m) => m.status === "upcoming");
  const displayMatches = [...liveMatches, ...finishedMatches, ...upcomingMatches].slice(0, 10);

  return (
    <section className="bg-spng-bg-secondary py-10">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader title="Deportiva" href="/deportiva" accentColor="#059669" />

        {/* Score strip — dark themed */}
        <div className="mb-8 -mx-4 px-4">
          <div className="bg-neutral-950 rounded-xl p-4 shadow-lg">
            {/* Strip header */}
            <div className="flex items-center justify-between mb-3 px-0.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">Marcadores</span>
                {liveMatches.length > 0 && (
                  <span className="text-[10px] font-medium text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">
                    {liveMatches.length} en vivo
                  </span>
                )}
              </div>
              <a
                href="/deportiva"
                className="text-[11px] font-medium text-neutral-400 hover:text-spng-accent transition-colors"
              >
                Ver todos
              </a>
            </div>

            {/* Cards scroll */}
            {showLoadingSkeleton ? (
              <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="min-w-55 h-25 bg-neutral-800 rounded-lg animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
                {displayMatches.map((match) => (
                  <SportScoreCard key={match.id} match={match} />
                ))}
              </div>
            )}
          </div>
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
