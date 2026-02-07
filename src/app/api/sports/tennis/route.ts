import { NextResponse } from "next/server";
import { getMatchesBySport } from "@/data/sports-fixtures";
import { fetchTennisEvents, transformSportsDBEvent } from "@/lib/sports-api";
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

  // Try to fetch from TheSportsDB (Chile Davis Cup, ATP events)
  try {
    const events = await fetchTennisEvents();

    if (events.length > 0) {
      matches = events.map((event) => transformSportsDBEvent(event, "tenis"));
    }
  } catch (error) {
    console.error("Error fetching tennis events from TheSportsDB:", error);
  }

  // Fallback to curated current mock data if no API results
  if (matches.length === 0) {
    matches = getMatchesBySport("tenis");
  }

  // Sort: live first, then upcoming, then finished
  const sortedMatches = matches.sort((a, b) => {
    const statusOrder = { live: 0, upcoming: 1, finished: 2 };
    const statusDiff = statusOrder[a.status] - statusOrder[b.status];
    if (statusDiff !== 0) return statusDiff;

    // Within same status, sort by start time (most recent/soonest first)
    return new Date(b.startTime).getTime() - new Date(a.startTime).getTime();
  });

  cache = { data: sortedMatches, timestamp: now };

  return NextResponse.json(sortedMatches);
}
