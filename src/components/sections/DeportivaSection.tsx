"use client";

import type { Article } from "@/types/article";
import type { Match } from "@/types/sports";
import { SportScoreCard } from "@/components/sports/SportScoreCard";
import { NewsCardStandard } from "@/components/news/NewsCardStandard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DeportivaSectionProps {
  articles: Article[];
  allMatches: Match[];
}

export function DeportivaSection({ articles, allMatches }: DeportivaSectionProps) {
  return (
    <section className="bg-spng-bg-secondary py-10">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader title="Deportiva" href="/deportiva" accentColor="#059669" />

        {/* Score cards horizontal scroll */}
        <div className="mb-8 -mx-4 px-4">
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
            {allMatches
              .filter((m) => m.status === "live" || m.status === "finished")
              .slice(0, 8)
              .map((match) => (
                <SportScoreCard key={match.id} match={match} />
              ))}
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
