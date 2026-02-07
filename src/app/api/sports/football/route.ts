import { NextResponse } from "next/server";
import type { Match } from "@/types/sports";
import {
  fetchTeamLastEvents,
  fetchTeamNextEvents,
  transformSportsDBEvent,
} from "@/lib/sports-api";
import { CHILEAN_FOOTBALL_TEAMS } from "@/lib/sports-config";
import { getMatchesBySport } from "@/data/sports-fixtures";

// Cache for 5 minutes
let cache: { data: Match[]; timestamp: number } | null = null;
const CACHE_DURATION = 5 * 60 * 1000;

export async function GET() {
  const now = Date.now();

  if (cache && now - cache.timestamp < CACHE_DURATION) {
    return NextResponse.json(cache.data);
  }

  try {
    // Fetch last and next events for top Chilean teams
    const teamIds = CHILEAN_FOOTBALL_TEAMS.slice(0, 4).map((t) => t.id);

    const [lastEvents, nextEvents] = await Promise.all([
      Promise.all(teamIds.map(fetchTeamLastEvents)),
      Promise.all(teamIds.map(fetchTeamNextEvents)),
    ]);

    const allLast = lastEvents.flat();
    const allNext = nextEvents.flat();

    // Deduplicate by event ID
    const seen = new Set<string>();
    const allEvents = [...allLast, ...allNext].filter((e) => {
      if (seen.has(e.idEvent)) return false;
      seen.add(e.idEvent);
      return true;
    });

    if (allEvents.length === 0) {
      // No real data available, fall back to mock
      const mockData = getMatchesBySport("futbol");
      cache = { data: mockData, timestamp: now };
      return NextResponse.json(mockData);
    }

    const matches = allEvents.map((e) => transformSportsDBEvent(e, "futbol"));

    // Sort: live first, then upcoming, then finished (most recent first)
    matches.sort((a, b) => {
      const order = { live: 0, upcoming: 1, finished: 2 };
      if (order[a.status] !== order[b.status]) {
        return order[a.status] - order[b.status];
      }
      return new Date(b.startTime).getTime() - new Date(a.startTime).getTime();
    });

    cache = { data: matches, timestamp: now };
    return NextResponse.json(matches);
  } catch (error) {
    console.error("Football API error:", error);
    const mockData = getMatchesBySport("futbol");
    return NextResponse.json(mockData);
  }
}
