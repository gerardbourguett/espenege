/**
 * Sports Components Type Definitions
 * SPNG Media News Portal - Sports Section
 */

/**
 * Team information for matches and standings
 */
export interface Team {
  /** Full team name */
  name: string;
  /** Abbreviated team name for compact displays */
  shortName: string;
  /** Team logo URL or emoji placeholder */
  logo: string;
}

/**
 * Match status indicators
 */
export type MatchStatus =
  | "live"      // Match currently in progress
  | "finished"  // Match has ended
  | "upcoming"; // Match scheduled for future

/**
 * Supported sport types
 */
export type SportType =
  | "futbol"       // Soccer/Football
  | "tenis"        // Tennis
  | "basquetbol"   // Basketball
  | "otros";       // Other sports

/**
 * Period/set scores for match detail
 */
export interface PeriodScore {
  home: number;
  away: number;
}

/**
 * Match/game information
 */
export interface Match {
  /** Unique match identifier */
  id: string;
  /** Home team details */
  homeTeam: Team;
  /** Away team details */
  awayTeam: Team;
  /** Home team score (undefined for upcoming matches) */
  homeScore?: number;
  /** Away team score (undefined for upcoming matches) */
  awayScore?: number;
  /** Current match status */
  status: MatchStatus;
  /** Sport type */
  sport: SportType;
  /** League or competition name */
  league: string;
  /** Match start time in ISO format */
  startTime: string;
  /** Current match minute for live matches (e.g., "45+2'", "HT") */
  minute?: string;
  /** Venue/stadium name (match detail) */
  venue?: string;
  /** Round info (e.g., "Fecha 2", "Cuartos de Final") */
  round?: string;
  /** Period scores: 1st half, 2nd half (football), quarters (basketball), sets (tennis) */
  periodScores?: PeriodScore[];
}

/**
 * League table/standings row
 */
export interface LeagueStanding {
  /** Current position in the table */
  position: number;
  /** Team information */
  team: Team;
  /** Matches played */
  played: number;
  /** Matches won */
  won: number;
  /** Matches drawn */
  drawn: number;
  /** Matches lost */
  lost: number;
  /** Total points */
  points: number;
}
