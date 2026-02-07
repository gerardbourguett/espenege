import { NextResponse } from "next/server";
import { getMatchesBySport } from "@/data/sports-fixtures";
import { fetchChileanTennisEvents } from "@/lib/tennis-api";
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

  // Try TennisApi (RapidAPI) for Chilean tennis players
  try {
    matches = await fetchChileanTennisEvents();
  } catch (error) {
    console.error("Error fetching tennis events from TennisApi:", error);
  }

  // Fallback to curated mock data if no API results
  if (matches.length === 0) {
    matches = getMatchesBySport("tenis");
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
