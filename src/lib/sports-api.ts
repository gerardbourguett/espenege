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

/**
 * Fetch tennis events from TheSportsDB
 * Tries to find Chile Davis Cup team and ATP events
 */
export async function fetchTennisEvents(): Promise<SportsDBEvent[]> {
  try {
    const events: SportsDBEvent[] = [];

    // Try to find Chile tennis team for Davis Cup
    const searchRes = await fetch(
      `${THESPORTSDB_BASE}/searchteams.php?t=Chile&s=Tennis`,
      { next: { revalidate: 300 } }
    );

    if (searchRes.ok) {
      const searchData = await searchRes.json();
      const chileTeam = searchData.teams?.[0];

      if (chileTeam) {
        // Fetch recent and upcoming events for Chile tennis team
        const [lastEvents, nextEvents] = await Promise.all([
          fetch(`${THESPORTSDB_BASE}/eventslast.php?id=${chileTeam.idTeam}`, {
            next: { revalidate: 300 },
          }).then(r => r.ok ? r.json() : null),
          fetch(`${THESPORTSDB_BASE}/eventsnext.php?id=${chileTeam.idTeam}`, {
            next: { revalidate: 300 },
          }).then(r => r.ok ? r.json() : null),
        ]);

        if (lastEvents?.results) events.push(...lastEvents.results);
        if (nextEvents?.events) events.push(...nextEvents.events);
      }
    }

    // Try ATP events
    const atpRes = await fetch(
      `${THESPORTSDB_BASE}/searchevents.php?e=ATP`,
      { next: { revalidate: 300 } }
    );

    if (atpRes.ok) {
      const atpData = await atpRes.json();
      if (atpData.event) {
        events.push(...atpData.event.slice(0, 10)); // Limit ATP results
      }
    }

    return events;
  } catch {
    return [];
  }
}

/**
 * Fetch basketball events from TheSportsDB
 * Tries to find NBA and international basketball events
 */
export async function fetchBasketballEvents(): Promise<SportsDBEvent[]> {
  try {
    const events: SportsDBEvent[] = [];

    // Try NBA events
    const nbaRes = await fetch(
      `${THESPORTSDB_BASE}/eventsnextleague.php?id=4387`,
      { next: { revalidate: 300 } }
    );

    if (nbaRes.ok) {
      const nbaData = await nbaRes.json();
      if (nbaData.events) {
        events.push(...nbaData.events.slice(0, 5)); // Limit NBA results
      }
    }

    // Try to find Chile basketball team
    const searchRes = await fetch(
      `${THESPORTSDB_BASE}/searchteams.php?t=Chile&s=Basketball`,
      { next: { revalidate: 300 } }
    );

    if (searchRes.ok) {
      const searchData = await searchRes.json();
      const chileTeam = searchData.teams?.[0];

      if (chileTeam) {
        const [lastEvents, nextEvents] = await Promise.all([
          fetch(`${THESPORTSDB_BASE}/eventslast.php?id=${chileTeam.idTeam}`, {
            next: { revalidate: 300 },
          }).then(r => r.ok ? r.json() : null),
          fetch(`${THESPORTSDB_BASE}/eventsnext.php?id=${chileTeam.idTeam}`, {
            next: { revalidate: 300 },
          }).then(r => r.ok ? r.json() : null),
        ]);

        if (lastEvents?.results) events.push(...lastEvents.results);
        if (nextEvents?.events) events.push(...nextEvents.events);
      }
    }

    return events;
  } catch {
    return [];
  }
}
