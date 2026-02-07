import type { Match } from "@/types/sports";
import {
  BASKETBALL_API_BASE,
  BASKETBALL_API_HOST,
  BASKETBALL_LEAGUES,
} from "./sports-config";

// ── API-Basketball Types ────────────────────────────────────────────

interface BasketballTeam {
  id: number;
  name: string;
  logo: string;
}

interface BasketballScore {
  quarter_1: number | null;
  quarter_2: number | null;
  quarter_3: number | null;
  quarter_4: number | null;
  over_time: number | null;
  total: number | null;
}

interface BasketballScores {
  home: BasketballScore;
  away: BasketballScore;
}

interface BasketballStatus {
  long: string;
  short: string;
  timer: string | null;
}

interface BasketballGame {
  id: number;
  date: string;
  time: string;
  timestamp: number;
  status: BasketballStatus;
  league: {
    id: number;
    name: string;
    type: string;
    season: string;
    logo: string;
  };
  country: { id: number; name: string; code: string; flag: string };
  teams: {
    home: BasketballTeam;
    away: BasketballTeam;
  };
  scores: BasketballScores;
}

// ── Helpers ──────────────────────────────────────────────────────────

function basketballHeaders(): HeadersInit {
  return {
    "x-rapidapi-key": process.env.RAPIDAPI_KEY || "",
    "x-rapidapi-host": BASKETBALL_API_HOST,
  };
}

function mapBasketballStatus(status: BasketballStatus): Match["status"] {
  const s = status.short;
  if (s === "NS" || s === "PST" || s === "CANC") return "upcoming";
  if (s === "FT" || s === "AOT" || s === "AP") return "finished";
  // Q1, Q2, Q3, Q4, OT, HT, BT — all considered live
  if (["Q1", "Q2", "Q3", "Q4", "OT", "HT", "BT"].includes(s)) return "live";
  return "upcoming";
}

function basketballMinute(status: BasketballStatus): string | undefined {
  const s = status.short;
  if (s === "Q1") return "1Q";
  if (s === "Q2") return "2Q";
  if (s === "Q3") return "3Q";
  if (s === "Q4") return "4Q";
  if (s === "OT") return "OT";
  if (s === "HT") return "ET";
  if (s === "BT") return "Descanso";
  if (status.timer) return `${s} - ${status.timer}`;
  return undefined;
}

function teamShortName(name: string): string {
  // Try to abbreviate long team names
  const parts = name.split(/\s+/);
  if (parts.length === 1) return name.substring(0, 3).toUpperCase();
  return parts
    .map((p) => p[0])
    .join("")
    .substring(0, 3)
    .toUpperCase();
}

/**
 * Transform an API-Basketball game into our Match type
 */
export function transformBasketballGame(game: BasketballGame): Match {
  const matchStatus = mapBasketballStatus(game.status);

  return {
    id: `bball-${game.id}`,
    homeTeam: {
      name: game.teams.home.name,
      shortName: teamShortName(game.teams.home.name),
      logo: game.teams.home.logo || "🏀",
    },
    awayTeam: {
      name: game.teams.away.name,
      shortName: teamShortName(game.teams.away.name),
      logo: game.teams.away.logo || "🏀",
    },
    homeScore: game.scores.home.total ?? undefined,
    awayScore: game.scores.away.total ?? undefined,
    status: matchStatus,
    sport: "basquetbol",
    league: game.league.name,
    startTime: new Date(game.timestamp * 1000).toISOString(),
    minute: matchStatus === "live" ? basketballMinute(game.status) : undefined,
  };
}

// ── Fetch Functions ─────────────────────────────────────────────────

/**
 * Fetch basketball games for a specific league by date
 */
async function fetchGamesByLeague(
  leagueId: number,
  season: string,
  date: string
): Promise<BasketballGame[]> {
  try {
    const url = `${BASKETBALL_API_BASE}/games?league=${leagueId}&season=${season}&date=${date}`;
    const res = await fetch(url, {
      headers: basketballHeaders(),
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.response || [];
  } catch {
    return [];
  }
}

/**
 * Fetch live basketball games
 */
async function fetchLiveBasketball(): Promise<BasketballGame[]> {
  try {
    const url = `${BASKETBALL_API_BASE}/games?live=all`;
    const res = await fetch(url, {
      headers: basketballHeaders(),
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    const games: BasketballGame[] = data.response || [];

    // Filter for tracked leagues
    const trackedIds = new Set(
      Object.values(BASKETBALL_LEAGUES).map((l) => l.id)
    );
    return games.filter((g) => trackedIds.has(g.league.id));
  } catch {
    return [];
  }
}

/**
 * Fetch Chilean basketball events (LNB + NBA) for recent days
 */
export async function fetchBasketballMatches(): Promise<Match[]> {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const fmt = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

  const { lnb, nba } = BASKETBALL_LEAGUES;

  const [
    liveGames,
    lnbToday,
    lnbYesterday,
    lnbTomorrow,
    nbaToday,
    nbaYesterday,
  ] = await Promise.all([
    fetchLiveBasketball(),
    fetchGamesByLeague(lnb.id, lnb.season, fmt(today)),
    fetchGamesByLeague(lnb.id, lnb.season, fmt(yesterday)),
    fetchGamesByLeague(lnb.id, lnb.season, fmt(tomorrow)),
    fetchGamesByLeague(nba.id, nba.season, fmt(today)),
    fetchGamesByLeague(nba.id, nba.season, fmt(yesterday)),
  ]);

  const allGames = [
    ...liveGames,
    ...lnbToday,
    ...lnbYesterday,
    ...lnbTomorrow,
    ...nbaToday,
    ...nbaYesterday,
  ];

  // Deduplicate
  const seen = new Set<number>();
  const deduped: BasketballGame[] = [];
  for (const g of allGames) {
    if (!seen.has(g.id)) {
      seen.add(g.id);
      deduped.push(g);
    }
  }

  return deduped.map(transformBasketballGame);
}
