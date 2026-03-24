"use client";

import { useEffect } from "react";
import { ExternalLink } from "lucide-react";
import { useWorldNewsStore } from "@/stores/world-news-store";
import {
  SECTION_CONFIG,
  TOP_NEWS_CONFIG,
} from "@/lib/worldnews-api";
import type { WorldNewsArticle, WorldNewsSection } from "@/lib/worldnews-api";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { ArticleMetadata } from "@/components/shared/ArticleMetadata";

// ---------------------------------------------------------------------------
// WorldNewsCard — renders like NewsCardStandard but links externally
// ---------------------------------------------------------------------------

function WorldNewsCard({ article }: { article: WorldNewsArticle }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-spng-border bg-white hover:shadow-lg hover:shadow-black/5 hover:border-spng-accent/30 transition-all duration-300">
      <a
        href={article.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative aspect-[16/9] overflow-hidden"
        aria-label={`Leer noticia externa: ${article.title}`}
      >
        <ImageWithFallback
          src={article.imageUrl}
          alt={article.imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* External link badge */}
        <span className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 z-10">
          <ExternalLink size={10} aria-hidden="true" />
        </span>
      </a>

      <div className="flex flex-col flex-1 p-4">
        {/* "Externo" badge */}
        <span className="inline-block text-[10px] font-medium uppercase tracking-wider text-white rounded-full px-3 py-0.5 mb-2 w-fit bg-blue-600">
          Externo
        </span>

        <a
          href={article.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h3 className="font-serif text-lg font-bold mb-1 line-clamp-2 leading-snug group-hover:text-spng-accent transition-colors">
            {article.title}
          </h3>
        </a>

        <p className="text-sm text-spng-muted line-clamp-2 mb-3 flex-1">
          {article.excerpt}
        </p>

        <ArticleMetadata article={article} />
      </div>
    </article>
  );
}

// ---------------------------------------------------------------------------
// Skeleton card
// ---------------------------------------------------------------------------

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-spng-border overflow-hidden animate-pulse">
      <div className="aspect-[16/9] bg-muted" />
      <div className="p-4 space-y-2">
        <div className="h-3 bg-muted rounded w-16" />
        <div className="h-5 bg-muted rounded w-full" />
        <div className="h-5 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-24 mt-2" />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// WorldNewsSection
// ---------------------------------------------------------------------------

interface WorldNewsSectionProps {
  section: WorldNewsSection;
}

export function WorldNewsSection({ section }: WorldNewsSectionProps) {
  const { getSlice, fetchSection } = useWorldNewsStore();
  const { articles, isLoading, error, hasFetched } = getSlice(section);

  useEffect(() => {
    fetchSection(section);
  }, [fetchSection, section]);

  // Resolve display config
  const title =
    section === "top"
      ? TOP_NEWS_CONFIG.title
      : SECTION_CONFIG[section].title;
  const accentColor =
    section === "top"
      ? TOP_NEWS_CONFIG.accentColor
      : SECTION_CONFIG[section].accentColor;

  // Still loading on first fetch — show skeleton
  if (isLoading && !hasFetched) {
    return (
      <section className="py-8 border-t border-spng-border mb-8">
        <div className="mb-6">
          <div className="h-7 w-64 bg-muted animate-pulse rounded" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </section>
    );
  }

  // Silent failure — don't break the page
  if (hasFetched && error) return null;

  // Fetched but empty
  if (hasFetched && articles.length === 0) {
    return (
      <section className="py-8 border-t border-spng-border mb-8">
        <SectionHeader title={title} accentColor={accentColor} />
        <p className="text-sm text-spng-muted mt-4">
          No hay noticias disponibles en este momento.
        </p>
      </section>
    );
  }

  // Initial render before effect — nothing yet
  if (!hasFetched && !isLoading) return null;

  return (
    <section className="py-8 border-t border-spng-border mb-8">
      <SectionHeader title={title} accentColor={accentColor} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {articles.slice(0, 8).map((article) => (
          <WorldNewsCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
