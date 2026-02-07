import type { Match } from "@/types/sports";
import { TENNISAPI_BASE, TENNISAPI_HOST, TENNIS_PLAYERS_CL } from "./sports-config";

// ── TennisApi Types ─────────────────────────────────────────────────

interface TennisApiTeam {
  id: number;
  name: string;
  shortName?: string;
  slug?: string;
  country?: { name?: string; alpha2?: string };
}

interface TennisApiScore {
  current?: number;
  display?: number;
  period1?: number;
  period2?: number;
  period3?: number;
  period4?: number;
  period5?: number;
}

interface TennisApiStatus {
  code: number;
  description: string;
  type: string;
}

interface TennisApiEvent {
  id: number;
  tournament?: {
    name?: string;
    uniqueTournament?: { id: number; name?: string };
  };
  homeTeam: TennisApiTeam;
  awayTeam: TennisApiTeam;
  homeScore?: TennisApiScore;
  awayScore?: TennisApiScore;
  status: TennisApiStatus;
  startTimestamp: number;
  roundInfo?: { name?: string; round?: number };
}

// ── Helpers ──────────────────────────────────────────────────────────

function tennisHeaders(): HeadersInit {
  return {
    "x-rapidapi-key": process.env.RAPIDAPI_KEY || "",
    "x-rapidapi-host": TENNISAPI_HOST,
  };
}

function mapTennisStatus(status: TennisApiStatus): Match["status"] {
  if (status.type === "inprogress") return "live";
  if (status.type === "finished") return "finished";
  return "upcoming";
}

function tennisSetInfo(status: TennisApiStatus): string | undefined {
  if (status.type !== "inprogress") return undefined;
  const desc = status.description;
  if (desc.includes("Set 1")) return "1er set";
  if (desc.includes("Set 2")) return "2do set";
  if (desc.includes("Set 3")) return "3er set";
  if (desc.includes("Set 4")) return "4to set";
  if (desc.includes("Set 5")) return "5to set";
  return desc;
}

function playerCountry(team: TennisApiTeam): string {
  if (team.country?.alpha2) return ` (${team.country.alpha2})`;
  return "";
}

function playerShortName(name: string): string {
  const parts = name.split(/[,\s]+/);
  if (parts.length >= 2) {
    // Last name or first significant part
    return parts[parts.length - 1].substring(0, 3).toUpperCase();
  }
  return name.substring(0, 3).toUpperCase();
}

/**
 * Check if an event involves a Chilean player
 */
function involvesChileanPlayer(event: TennisApiEvent): boolean {
  const homeName = event.homeTeam.name.toLowerCase();
  const awayName = event.awayTeam.name.toLowerCase();
  return TENNIS_PLAYERS_CL.some(
    (p) =>
      homeName.includes(p.name.toLowerCase()) ||
      awayName.includes(p.name.toLowerCase())
  );
}

/**
 * Transform a TennisApi event into our Match type
 */
export function transformTennisEvent(event: TennisApiEvent): Match {
  const matchStatus = mapTennisStatus(event.status);

  return {
    id: `tennis-${event.id}`,
    homeTeam: {
      name: `${event.homeTeam.name}${playerCountry(event.homeTeam)}`,
      shortName: event.homeTeam.shortName || playerShortName(event.homeTeam.name),
      logo: "🎾",
    },
    awayTeam: {
      name: `${event.awayTeam.name}${playerCountry(event.awayTeam)}`,
      shortName: event.awayTeam.shortName || playerShortName(event.awayTeam.name),
      logo: "🎾",
    },
    homeScore: event.homeScore?.current,
    awayScore: event.awayScore?.current,
    status: matchStatus,
    sport: "tenis",
    league:
      event.tournament?.uniqueTournament?.name ||
      event.tournament?.name ||
      "Tenis",
    startTime: new Date(event.startTimestamp * 1000).toISOString(),
    minute: tennisSetInfo(event.status),
  };
}

// ── Fetch Functions ─────────────────────────────────────────────────

/**
 * Fetch live tennis events, filtered for Chilean players
 */
export async function fetchLiveTennisEvents(): Promise<Match[]> {
  try {
    const url = `${TENNISAPI_BASE}/events/live`;
    const res = await fetch(url, { headers: tennisHeaders(), cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();

    const events: TennisApiEvent[] = data.events || [];
    return events
      .filter(involvesChileanPlayer)
      .map(transformTennisEvent);
  } catch {
    return [];
  }
}

/**
 * Fetch today's tennis events (scheduled + finished)
 */
async function fetchTennisEventsByDate(dateStr: string): Promise<TennisApiEvent[]> {
  try {
    const url = `${TENNISAPI_BASE}/events/${dateStr}`;
    const res = await fetch(url, {
      headers: tennisHeaders(),
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.events || [];
  } catch {
    return [];
  }
}

/**
 * Fetch recent and upcoming tennis matches for Chilean players
 * Queries today, yesterday, and tomorrow for comprehensive coverage
 */
export async function fetchChileanTennisEvents(): Promise<Match[]> {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const fmt = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

  const [liveEvents, todayEvents, yesterdayEvents, tomorrowEvents] =
    await Promise.all([
      fetchLiveTennisEvents(),
      fetchTennisEventsByDate(fmt(today)),
      fetchTennisEventsByDate(fmt(yesterday)),
      fetchTennisEventsByDate(fmt(tomorrow)),
    ]);

  const allDayEvents = [...todayEvents, ...yesterdayEvents, ...tomorrowEvents];
  const chileanMatches = allDayEvents
    .filter(involvesChileanPlayer)
    .map(transformTennisEvent);

  // Deduplicate (live events may overlap with day events)
  const seen = new Set<string>();
  const deduped: Match[] = [];
  for (const m of [...liveEvents, ...chileanMatches]) {
    if (!seen.has(m.id)) {
      seen.add(m.id);
      deduped.push(m);
    }
  }

  return deduped;
}
