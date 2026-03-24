import { NextRequest, NextResponse } from "next/server";
import {
  fetchWorldNews,
  fetchTopNews,
  deduplicateByTitle,
  SECTION_CONFIG,
} from "@/lib/worldnews-api";
import type { WorldNewsArticle, WorldNewsSection } from "@/lib/worldnews-api";
import { worldNewsMock } from "@/data/world-news";

// ---------------------------------------------------------------------------
// In-memory cache — keyed by section, TTL 24h
// Free tier: 100 req/day. 4 sections × 1 fetch/24h = ~6-8 points/day
// ---------------------------------------------------------------------------

const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours in ms

const cache = new Map<
  WorldNewsSection,
  { data: WorldNewsArticle[]; timestamp: number }
>();

const VALID_SECTIONS = new Set<WorldNewsSection>([
  "nacional",
  "internacional",
  "deportiva",
  "popurri",
  "top",
]);

function isValidSection(value: string): value is WorldNewsSection {
  return VALID_SECTIONS.has(value as WorldNewsSection);
}

// ---------------------------------------------------------------------------
// GET /api/world-news?section=nacional
// ---------------------------------------------------------------------------

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const sectionParam = searchParams.get("section") ?? "internacional";

  if (!isValidSection(sectionParam)) {
    return NextResponse.json(
      { error: `Invalid section "${sectionParam}"` },
      { status: 400 }
    );
  }

  const section: WorldNewsSection = sectionParam;
  const now = Date.now();
  const cached = cache.get(section);

  // Cache hit
  if (cached && now - cached.timestamp < CACHE_TTL) {
    return NextResponse.json(cached.data);
  }

  const apiKey = process.env.WORLDNEWS_API_KEY;

  // No API key — return mock data silently
  if (!apiKey) {
    return NextResponse.json(worldNewsMock);
  }

  try {
    let articles: WorldNewsArticle[];

    if (section === "top") {
      articles = await fetchTopNews();
    } else {
      articles = await fetchWorldNews(section);
    }

    const deduplicated = deduplicateByTitle(articles).slice(0, 10);
    cache.set(section, { data: deduplicated, timestamp: now });
    return NextResponse.json(deduplicated);
  } catch (error) {
    const isRateLimit =
      error instanceof Error && error.message === "RATE_LIMIT";

    if (isRateLimit) {
      const stale = cache.get(section);
      if (stale) {
        console.warn(
          `WorldNewsAPI rate limit hit (section: ${section}) — serving cached data`
        );
        return NextResponse.json(stale.data);
      }
      console.warn(
        `WorldNewsAPI rate limit hit (section: ${section}) — serving mock data`
      );
      return NextResponse.json(worldNewsMock);
    }

    console.warn(`WorldNewsAPI fetch error (section: ${section}):`, error);
    const stale = cache.get(section);
    return NextResponse.json(stale ? stale.data : worldNewsMock);
  }
}
