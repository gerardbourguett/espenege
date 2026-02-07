import { NextResponse } from "next/server";
import { getMatchesBySport } from "@/data/sports-fixtures";
import { fetchBasketballMatches } from "@/lib/basketball-api";
import type { Match } from "@/types/sports";

// Cache for 5 minutes
let cache: { data: Match[]; timestamp: number } | null = null;
const CACHE_DURATION = 5 * 60 * 1000;

export async function GET() {
  const now = Date.now();

  if (cache && now - cache.timestamp < CACHE_DURATION) {
    return NextResponse.json(cache.data);
  }

  let matches: Match[] = [];

  // Try API-Basketball (RapidAPI) for LNB Chile + NBA
  try {
    matches = await fetchBasketballMatches();
  } catch (error) {
    console.error("Error fetching basketball events from API-Basketball:", error);
  }

  // Fallback to curated Chilean basketball data (Liga Nacional de Basquetbol)
  if (matches.length === 0) {
    matches = getMatchesBySport("basquetbol");
  }

  // Sort: live first, then upcoming, then finished
  const sortedMatches = matches.sort((a, b) => {
    const statusOrder = { live: 0, upcoming: 1, finished: 2 };
    const statusDiff = statusOrder[a.status] - statusOrder[b.status];
    if (statusDiff !== 0) return statusDiff;

    if (a.status === "upcoming") {
      return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
    }
    return new Date(b.startTime).getTime() - new Date(a.startTime).getTime();
  });

  cache = { data: sortedMatches, timestamp: now };

  return NextResponse.json(sortedMatches);
}
