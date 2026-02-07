"use client";

import type { Article } from "@/types/article";
import { NewsCardStandard } from "@/components/news/NewsCardStandard";
import { NewsCardHorizontal } from "@/components/news/NewsCardHorizontal";
import { NewsCardCompact } from "@/components/news/NewsCardCompact";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMediaQuery } from "@/hooks/use-media-query";

interface LatestSectionProps {
  featured: Article[];
  latest: Article[];
  mostRead: Article[];
}

export function LatestSection({ featured, latest, mostRead }: LatestSectionProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Desktop: 3-column layout
  if (isDesktop) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Featured cards */}
          <div>
            <h3 className="font-serif text-lg font-bold text-spng-primary border-b-2 border-spng-accent pb-2 mb-4">
              Destacado
            </h3>
            <div className="space-y-4">
              {featured.map((article) => (
                <NewsCardStandard key={article.id} article={article} />
              ))}
            </div>
          </div>

          {/* Latest feed */}
          <div>
            <h3 className="font-serif text-lg font-bold text-spng-primary border-b-2 border-spng-accent pb-2 mb-2">
              Lo Ultimo
            </h3>
            <div className="divide-y divide-spng-border">
              {latest.map((article) => (
                <NewsCardHorizontal key={article.id} article={article} />
              ))}
            </div>
          </div>

          {/* Most read */}
          <div>
            <h3 className="font-serif text-lg font-bold text-spng-primary border-b-2 border-spng-accent pb-2 mb-2">
              Mas Leidas
            </h3>
            <div>
              {mostRead.map((article, index) => (
                <NewsCardCompact key={article.id} article={article} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Mobile: Tabs
  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <Tabs defaultValue="destacado">
        <TabsList className="w-full">
          <TabsTrigger
            value="destacado"
            className="flex-1 data-[state=active]:bg-spng-primary data-[state=active]:text-white"
          >
            Destacado
          </TabsTrigger>
          <TabsTrigger
            value="recientes"
            className="flex-1 data-[state=active]:bg-spng-primary data-[state=active]:text-white"
          >
            Recientes
          </TabsTrigger>
          <TabsTrigger
            value="leidas"
            className="flex-1 data-[state=active]:bg-spng-primary data-[state=active]:text-white"
          >
            Mas Leidas
          </TabsTrigger>
        </TabsList>
        <TabsContent value="destacado" className="mt-4 space-y-4">
          {featured.map((article) => (
            <NewsCardStandard key={article.id} article={article} />
          ))}
        </TabsContent>
        <TabsContent value="recientes" className="mt-4 divide-y divide-spng-border">
          {latest.map((article) => (
            <NewsCardHorizontal key={article.id} article={article} />
          ))}
        </TabsContent>
        <TabsContent value="leidas" className="mt-4">
          {mostRead.map((article, index) => (
            <NewsCardCompact key={article.id} article={article} index={index} />
          ))}
        </TabsContent>
      </Tabs>
    </section>
  );
}
