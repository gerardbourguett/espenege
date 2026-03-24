import type { Article, CategorySlug } from "@/types/article";

// ---------------------------------------------------------------------------
// External API interfaces — real WorldNewsAPI response shape
// ---------------------------------------------------------------------------

export interface WorldNewsItem {
  id: number;
  title: string;
  /** Plain text — can be very long */
  text: string;
  /** Only present in top-news summary field */
  summary?: string;
  url: string;
  image: string | null;
  video: null;
  /** "2026-03-23 00:00:00" */
  publish_date: string;
  author: string | null;
  authors?: string[];
  language?: string;
  /** e.g. "politics" — NOT a CategorySlug */
  category?: string;
  source_country?: string;
}

export interface WorldNewsAPIResponse {
  offset: number;
  number: number;
  available: number;
  news: WorldNewsItem[];
}

export interface TopNewsCluster {
  news: WorldNewsItem[];
}

export interface TopNewsAPIResponse {
  top_news: TopNewsCluster[];
  language: string;
  country: string;
}

// ---------------------------------------------------------------------------
// Section config — maps SPNG sections to WorldNewsAPI query params
// ---------------------------------------------------------------------------

export type WorldNewsSection =
  | "nacional"
  | "internacional"
  | "deportiva"
  | "popurri"
  | "top";

interface SectionConfig {
  /** WorldNewsAPI `categories` param — comma separated */
  categories: string;
  /** ISO 3166 country code — undefined means no filter */
  sourceCountry?: string;
  /** ISO 639-1 language code */
  language: string;
  /** CategorySlug to assign to all articles from this section */
  targetCategory: CategorySlug;
  /** Human-readable section title for SectionHeader */
  title: string;
  /** Accent color for SectionHeader */
  accentColor: string;
  /** Number of articles to fetch */
  number: number;
}

export const SECTION_CONFIG: Record<
  Exclude<WorldNewsSection, "top">,
  SectionConfig
> = {
  nacional: {
    categories: "politics,business,health",
    sourceCountry: "cl",
    language: "es",
    targetCategory: "nacional",
    title: "Noticias de Chile",
    accentColor: "#2563eb",
    number: 20,
  },
  internacional: {
    categories: "politics,business,technology,science",
    language: "es",
    targetCategory: "internacional",
    title: "Noticias del mundo",
    accentColor: "#7c3aed",
    number: 20,
  },
  deportiva: {
    categories: "sports",
    sourceCountry: "cl",
    language: "es",
    targetCategory: "deportiva",
    title: "Noticias deportivas",
    accentColor: "#16a34a",
    number: 20,
  },
  popurri: {
    categories: "entertainment,lifestyle,culture",
    sourceCountry: "cl",
    language: "es",
    targetCategory: "popurri",
    title: "Entretenimiento y cultura",
    accentColor: "#ea580c",
    number: 20,
  },
};

// Config for top news section (uses different endpoint — no SectionConfig needed)
export const TOP_NEWS_CONFIG = {
  sourceCountry: "cl",
  language: "es",
  title: "Lo más leído hoy",
  accentColor: "#dc2626",
  maxPerCluster: 1,
} as const;

// ---------------------------------------------------------------------------
// Internal extended type
// ---------------------------------------------------------------------------

/**
 * WorldNewsArticle extends Article with an external source URL.
 * Used only within the world-news domain — never passed to shared NewsCard components.
 */
export interface WorldNewsArticle extends Article {
  /** Original source URL from WorldNewsAPI — opens in new tab */
  externalUrl: string;
}

// ---------------------------------------------------------------------------
// HTML entity decoder — API returns &#36; instead of $, etc.
// ---------------------------------------------------------------------------

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}

// ---------------------------------------------------------------------------
// Article mapper
// ---------------------------------------------------------------------------

export function mapToArticle(
  item: WorldNewsItem,
  targetCategory: CategorySlug
): WorldNewsArticle {
  const text = item.text ?? item.summary ?? "";
  const excerpt =
    text.length > 160 ? text.slice(0, 157) + "..." : text || item.title;

  const wordCount = text.split(" ").filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return {
    id: String(item.id),
    title: decodeHtmlEntities(item.title),
    slug: `wn-${item.id}`,
    excerpt: decodeHtmlEntities(excerpt),
    content: text,
    category: targetCategory,
    author: {
      name: item.authors?.[0] ?? item.author ?? "Redacción",
      avatar: "/images/avatars/default.jpg",
      role: "Corresponsal",
    },
    publishedAt: new Date(item.publish_date).toISOString(),
    imageUrl: item.image ?? "/images/placeholder-hero.jpg",
    imageAlt: item.title,
    readingTime,
    isFeatured: false,
    isBreaking: false,
    views: 0,
    tags: [],
    externalUrl: item.url,
  };
}

// ---------------------------------------------------------------------------
// Deduplication — same article from multiple Chilean sources
// ---------------------------------------------------------------------------

export function deduplicateByTitle(
  articles: WorldNewsArticle[]
): WorldNewsArticle[] {
  const seen = new Set<string>();
  return articles.filter((article) => {
    const key = article.title.toLowerCase().trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// ---------------------------------------------------------------------------
// Fetch helpers
// ---------------------------------------------------------------------------

/**
 * Fetches articles from WorldNewsAPI /search-news for a given section.
 * Throws Error("RATE_LIMIT") on 429/402.
 */
export async function fetchWorldNews(
  section: Exclude<WorldNewsSection, "top">
): Promise<WorldNewsArticle[]> {
  const apiKey = process.env.WORLDNEWS_API_KEY;
  if (!apiKey) return [];

  const config = SECTION_CONFIG[section];

  const params = new URLSearchParams({
    categories: config.categories,
    language: config.language,
    number: String(config.number),
    "sort-direction": "DESC",
    sort: "publish-time",
  });

  if (config.sourceCountry) {
    params.set("source-country", config.sourceCountry);
  }

  const url = `https://api.worldnewsapi.com/search-news?${params.toString()}`;

  const res = await fetch(url, {
    headers: { "x-api-key": apiKey },
  });

  if (res.status === 429 || res.status === 402) {
    throw new Error("RATE_LIMIT");
  }

  if (!res.ok) {
    throw new Error(`WorldNewsAPI error: ${res.status}`);
  }

  const data: WorldNewsAPIResponse = await res.json();
  const mapped = (data.news ?? []).map((item) =>
    mapToArticle(item, config.targetCategory)
  );
  return deduplicateByTitle(mapped);
}

/**
 * Fetches top news from WorldNewsAPI /top-news for Chile in Spanish.
 * Returns one article per cluster (the most relevant).
 * Throws Error("RATE_LIMIT") on 429/402.
 */
export async function fetchTopNews(): Promise<WorldNewsArticle[]> {
  const apiKey = process.env.WORLDNEWS_API_KEY;
  if (!apiKey) return [];

  const params = new URLSearchParams({
    "source-country": TOP_NEWS_CONFIG.sourceCountry,
    language: TOP_NEWS_CONFIG.language,
    "max-news-per-cluster": String(TOP_NEWS_CONFIG.maxPerCluster),
  });

  const url = `https://api.worldnewsapi.com/top-news?${params.toString()}`;

  const res = await fetch(url, {
    headers: { "x-api-key": apiKey },
  });

  if (res.status === 429 || res.status === 402) {
    throw new Error("RATE_LIMIT");
  }

  if (!res.ok) {
    throw new Error(`WorldNewsAPI error: ${res.status}`);
  }

  const data: TopNewsAPIResponse = await res.json();

  // Each cluster has an array of news — take the first item per cluster
  const articles = (data.top_news ?? [])
    .map((cluster) => cluster.news?.[0])
    .filter((item): item is WorldNewsItem => !!item)
    .map((item) => mapToArticle(item, "nacional"));

  return deduplicateByTitle(articles);
}
