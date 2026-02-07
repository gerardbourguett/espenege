import type { Match, PeriodScore } from "@/types/sports";
import { fetchEventById, transformSportAPI7Event } from "./sports-api";

/**
 * Fetch enriched match data by event ID.
 * Extracts the numeric ID from prefixed IDs like "sa7-12345".
 */
export async function fetchMatchById(matchId: string): Promise<Match | null> {
  // Extract numeric ID from prefix
  const numericId = matchId.replace(/^(sa7-|tennis-|bball-|sdb-)/, "");
  const eventId = parseInt(numericId, 10);
  if (isNaN(eventId)) return null;

  // Currently only SportAPI7 events support enriched detail
  if (!matchId.startsWith("sa7-")) return null;

  const event = await fetchEventById(eventId);
  if (!event) return null;

  // Base match data
  const base = transformSportAPI7Event(event);

  // Enrich with detail fields
  const periodScores: PeriodScore[] = [];
  if (event.homeScore?.period1 !== undefined && event.awayScore?.period1 !== undefined) {
    periodScores.push({
      home: event.homeScore.period1,
      away: event.awayScore.period1,
    });
  }
  if (event.homeScore?.period2 !== undefined && event.awayScore?.period2 !== undefined) {
    periodScores.push({
      home: event.homeScore.period2,
      away: event.awayScore.period2,
    });
  }

  let venue: string | undefined;
  if (event.venue) {
    const parts = [event.venue.stadium, event.venue.city?.name].filter(Boolean);
    venue = parts.join(", ") || undefined;
  }

  let round: string | undefined;
  if (event.roundInfo?.round) {
    round = `Fecha ${event.roundInfo.round}`;
  }

  return {
    ...base,
    venue,
    round,
    periodScores: periodScores.length > 0 ? periodScores : undefined,
  };
}

/**
 * Build a basic match from URL params when we can't fetch from API
 * (for tennis/basketball matches that come from stores, not SportAPI7)
 */
export function buildMatchFromStore(matchId: string, allMatches: Match[]): Match | null {
  return allMatches.find((m) => m.id === matchId) || null;
}
