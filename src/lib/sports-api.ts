import type { Match } from "@/types/sports";
import { THESPORTSDB_BASE, CHILEAN_FOOTBALL_TEAMS } from "./sports-config";

/**
 * TheSportsDB event structure (partial)
 */
interface SportsDBEvent {
  idEvent: string;
  strHomeTeam: string;
  strAwayTeam: string;
  intHomeScore: string | null;
  intAwayScore: string | null;
  dateEvent: string;
  strTime: string;
  strLeague: string;
  strStatus: string;
  strSport: string;
}

function mapStatus(status: string): Match["status"] {
  if (!status || status === "Not Started" || status === "NS") return "upcoming";
  if (status === "Match Finished" || status === "FT" || status === "AET" || status === "PEN") return "finished";
  if (status === "1H" || status === "2H" || status === "HT" || status === "ET" || status === "Live") return "live";
  return "upcoming";
}

function getShortName(name: string): string {
  const team = CHILEAN_FOOTBALL_TEAMS.find(
    (t) => t.name.toLowerCase() === name.toLowerCase()
  );
  if (team) return team.shortName;
  return name.substring(0, 3).toUpperCase();
}

/**
 * Transform a TheSportsDB event into our Match type
 */
export function transformSportsDBEvent(
  event: SportsDBEvent,
  sport: Match["sport"] = "futbol"
): Match {
  const status = mapStatus(event.strStatus);

  return {
    id: `sdb-${event.idEvent}`,
    homeTeam: {
      name: event.strHomeTeam,
      shortName: getShortName(event.strHomeTeam),
      logo: sport === "futbol" ? "⚽" : sport === "tenis" ? "🎾" : "🏀",
    },
    awayTeam: {
      name: event.strAwayTeam,
      shortName: getShortName(event.strAwayTeam),
      logo: sport === "futbol" ? "⚽" : sport === "tenis" ? "🎾" : "🏀",
    },
    homeScore:
      event.intHomeScore !== null ? parseInt(event.intHomeScore) : undefined,
    awayScore:
      event.intAwayScore !== null ? parseInt(event.intAwayScore) : undefined,
    status,
    sport,
    league: event.strLeague,
    startTime: `${event.dateEvent}T${event.strTime || "00:00:00"}Z`,
    minute: status === "live" ? event.strStatus : undefined,
  };
}

/**
 * Fetch recent (past) events for a Chilean team from TheSportsDB
 */
export async function fetchTeamLastEvents(teamId: string): Promise<SportsDBEvent[]> {
  try {
    const res = await fetch(`${THESPORTSDB_BASE}/eventslast.php?id=${teamId}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.results || []).filter(
      (e: SportsDBEvent) =>
        e.strLeague?.includes("Chile") || e.strLeague?.includes("Libertadores")
    );
  } catch {
    return [];
  }
}

/**
 * Fetch upcoming events for a Chilean team from TheSportsDB
 */
export async function fetchTeamNextEvents(teamId: string): Promise<SportsDBEvent[]> {
  try {
    const res = await fetch(`${THESPORTSDB_BASE}/eventsnext.php?id=${teamId}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.events || []).filter(
      (e: SportsDBEvent) =>
        e.strLeague?.includes("Chile") || e.strLeague?.includes("Libertadores")
    );
  } catch {
    return [];
  }
}
