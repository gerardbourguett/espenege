import type { Match } from "@/types/sports";
import {
  SPORTAPI7_BASE,
  SPORTAPI7_HOST,
  CHILEAN_FOOTBALL_LEAGUES,
  TRACKED_TOURNAMENT_IDS,
  teamImageUrl,
} from "./sports-config";

// ── SportAPI7 Types ───────────────────────────────────────────────────

interface SportAPI7Team {
  id: number;
  name: string;
  shortName?: string;
  nameCode?: string;
}

interface SportAPI7Score {
  current?: number;
  display?: number;
  period1?: number;
  period2?: number;
}

interface SportAPI7Status {
  code: number;
  description: string;
  type: string;
}

interface SportAPI7Event {
  id: number;
  tournament?: {
    name?: string;
    uniqueTournament?: { id: number; name?: string };
  };
  homeTeam: SportAPI7Team;
  awayTeam: SportAPI7Team;
  homeScore?: SportAPI7Score;
  awayScore?: SportAPI7Score;
  status: SportAPI7Status;
  startTimestamp: number;
  roundInfo?: { round?: number };
}

// ── SportAPI7 Helpers ─────────────────────────────────────────────────

function sportapi7Headers(): HeadersInit {
  return {
    "x-rapidapi-key": process.env.RAPIDAPI_KEY || "",
    "x-rapidapi-host": SPORTAPI7_HOST,
  };
}

function mapSportAPI7Status(status: SportAPI7Status): Match["status"] {
  if (status.type === "inprogress") return "live";
  if (status.type === "finished") return "finished";
  return "upcoming";
}

function sportapi7Minute(status: SportAPI7Status): string | undefined {
  if (status.type !== "inprogress") return undefined;
  // Map common status descriptions
  const desc = status.description;
  if (desc === "Halftime" || desc === "HT") return "ET";
  if (desc === "1st half") return `${status.code}'`;
  if (desc === "2nd half") return `${status.code}'`;
  return desc;
}

/**
 * Transform a SportAPI7 event into our Match type
 */
export function transformSportAPI7Event(event: SportAPI7Event): Match {
  const matchStatus = mapSportAPI7Status(event.status);

  return {
    id: `sa7-${event.id}`,
    homeTeam: {
      name: event.homeTeam.name,
      shortName: event.homeTeam.shortName || event.homeTeam.nameCode || event.homeTeam.name,
      logo: teamImageUrl(event.homeTeam.id),
    },
    awayTeam: {
      name: event.awayTeam.name,
      shortName: event.awayTeam.shortName || event.awayTeam.nameCode || event.awayTeam.name,
      logo: teamImageUrl(event.awayTeam.id),
    },
    homeScore: event.homeScore?.current,
    awayScore: event.awayScore?.current,
    status: matchStatus,
    sport: "futbol",
    league: event.tournament?.uniqueTournament?.name || event.tournament?.name || "Liga Chilena",
    startTime: new Date(event.startTimestamp * 1000).toISOString(),
    minute: sportapi7Minute(event.status),
  };
}

// ── SportAPI7 Fetch Functions ─────────────────────────────────────────

/**
 * Fetch the latest finished events from all tracked Chilean football leagues
 */
export async function fetchLeagueLastEvents(): Promise<Match[]> {
  const results = await Promise.all(
    CHILEAN_FOOTBALL_LEAGUES.map(async ({ uniqueTournamentId, seasonId }) => {
      try {
        const url = `${SPORTAPI7_BASE}/unique-tournament/${uniqueTournamentId}/season/${seasonId}/events/last/0`;
        const res = await fetch(url, { headers: sportapi7Headers(), next: { revalidate: 300 } });
        if (!res.ok) return [];
        const data = await res.json();
        return (data.events || []).map(transformSportAPI7Event);
      } catch {
        return [];
      }
    })
  );
  return results.flat();
}

/**
 * Fetch the next upcoming events from all tracked Chilean football leagues
 */
export async function fetchLeagueNextEvents(): Promise<Match[]> {
  const results = await Promise.all(
    CHILEAN_FOOTBALL_LEAGUES.map(async ({ uniqueTournamentId, seasonId }) => {
      try {
        const url = `${SPORTAPI7_BASE}/unique-tournament/${uniqueTournamentId}/season/${seasonId}/events/next/0`;
        const res = await fetch(url, { headers: sportapi7Headers(), next: { revalidate: 300 } });
        if (!res.ok) return [];
        const data = await res.json();
        return (data.events || []).map(transformSportAPI7Event);
      } catch {
        return [];
      }
    })
  );
  return results.flat();
}

/**
 * Fetch live Chilean football events (filters global live feed)
 */
export async function fetchLiveChileanEvents(): Promise<Match[]> {
  const url = `${SPORTAPI7_BASE}/sport/football/events/live`;

  const res = await fetch(url, { headers: sportapi7Headers(), cache: "no-store" });
  if (!res.ok) return [];
  const data = await res.json();

  // Filter for Chilean leagues
  const chileanEvents = (data.events || []).filter(
    (e: SportAPI7Event) =>
      e.tournament?.uniqueTournament?.id !== undefined &&
      TRACKED_TOURNAMENT_IDS.has(e.tournament.uniqueTournament.id)
  );

  return chileanEvents.map(transformSportAPI7Event);
}

// ── Match Detail (SportAPI7) ─────────────────────────────────────────

export interface SportAPI7EventDetail extends SportAPI7Event {
  venue?: { stadium?: string; city?: { name?: string }; country?: { name?: string } };
  homeScore?: SportAPI7Score & { period1?: number; period2?: number };
  awayScore?: SportAPI7Score & { period1?: number; period2?: number };
}

/**
 * Fetch a single event by ID from SportAPI7
 */
export async function fetchEventById(eventId: number): Promise<SportAPI7EventDetail | null> {
  try {
    const url = `${SPORTAPI7_BASE}/event/${eventId}`;
    const res = await fetch(url, { headers: sportapi7Headers(), next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.event || null;
  } catch {
    return null;
  }
}
