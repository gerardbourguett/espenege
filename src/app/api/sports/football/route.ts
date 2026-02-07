import { NextResponse } from "next/server";
import type { Match } from "@/types/sports";
import {
  fetchLeagueLastEvents,
  fetchLeagueNextEvents,
  fetchLiveChileanEvents,
} from "@/lib/sports-api";
import { getMatchesBySport } from "@/data/sports-fixtures";

// In-memory cache
let cache: { data: Match[]; timestamp: number } | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function GET() {
  const now = Date.now();

  if (cache && now - cache.timestamp < CACHE_DURATION) {
    return NextResponse.json(cache.data);
  }

  try {
    // Fetch live, last, and next events in parallel from SportAPI7
    const [liveMatches, lastMatches, nextMatches] = await Promise.all([
      fetchLiveChileanEvents().catch(() => [] as Match[]),
      fetchLeagueLastEvents().catch(() => [] as Match[]),
      fetchLeagueNextEvents().catch(() => [] as Match[]),
    ]);

    // Deduplicate by event ID
    const seen = new Set<string>();
    const allMatches = [...liveMatches, ...lastMatches, ...nextMatches].filter((m) => {
      if (seen.has(m.id)) return false;
      seen.add(m.id);
      return true;
    });

    if (allMatches.length === 0) {
      // No real data — fall back to mock
      const mockData = getMatchesBySport("futbol");
      cache = { data: mockData, timestamp: now };
      return NextResponse.json(mockData);
    }

    // Sort: live first, then upcoming (soonest first), then finished (most recent first)
    allMatches.sort((a, b) => {
      const order = { live: 0, upcoming: 1, finished: 2 };
      if (order[a.status] !== order[b.status]) {
        return order[a.status] - order[b.status];
      }
      if (a.status === "upcoming") {
        return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
      }
      return new Date(b.startTime).getTime() - new Date(a.startTime).getTime();
    });

    cache = { data: allMatches, timestamp: now };
    return NextResponse.json(allMatches);
  } catch (error) {
    console.error("Football API error:", error);
    const mockData = getMatchesBySport("futbol");
    return NextResponse.json(mockData);
  }
}
