/**
 * Sports configuration
 * Primary: SportAPI7 (RapidAPI) for Chilean football
 * Fallback: TheSportsDB for tennis/basketball, mock data
 */

// ── SportAPI7 (RapidAPI) ──────────────────────────────────────────────
export const SPORTAPI7_BASE = "https://sportapi7.p.rapidapi.com/api/v1";
export const SPORTAPI7_HOST = "sportapi7.p.rapidapi.com";

/** Team badge image URL (SofaScore CDN) */
export const teamImageUrl = (teamId: number) =>
  `https://api.sofascore.app/api/v1/team/${teamId}/image`;

/** Tournament badge image URL */
export const tournamentImageUrl = (tournamentId: number) =>
  `https://api.sofascore.app/api/v1/unique-tournament/${tournamentId}/image`;

// Chilean football leagues with season IDs for 2026
export const CHILEAN_FOOTBALL_LEAGUES = [
  { uniqueTournamentId: 11653, seasonId: 88493, name: "Primera División" },
  { uniqueTournamentId: 11157, seasonId: 89063, name: "Copa Chile" },
  { uniqueTournamentId: 18834, seasonId: 88493, name: "Segunda División" },
];

// Shorthand for the main league (used in single-league queries)
export const PRIMERA_DIVISION = CHILEAN_FOOTBALL_LEAGUES[0];

// Chilean football teams — SportAPI7 IDs
export const CHILEAN_TEAMS = [
  { id: 3155, name: "Colo Colo", shortName: "Colo Colo", nameCode: "CC" },
  { id: 3161, name: "Universidad de Chile", shortName: "U. de Chile", nameCode: "UDC" },
  { id: 3151, name: "Universidad Católica", shortName: "U. Católica", nameCode: "UC" },
  { id: 3159, name: "Cobreloa", shortName: "Cobreloa", nameCode: "COC" },
  { id: 5032, name: "Everton de Viña del Mar", shortName: "Everton", nameCode: "EVT" },
  { id: 3153, name: "Unión Española", shortName: "U. Española", nameCode: "ESP" },
  { id: 3164, name: "Huachipato", shortName: "Huachipato", nameCode: "HUA" },
  { id: 3162, name: "Audax Italiano", shortName: "Audax Italiano", nameCode: "AUD" },
  { id: 3165, name: "Coquimbo Unido", shortName: "Coquimbo", nameCode: "COQ" },
  { id: 3163, name: "O'Higgins", shortName: "O'Higgins", nameCode: "OHF" },
  { id: 3167, name: "Cobresal", shortName: "Cobresal", nameCode: "COB" },
  { id: 48242, name: "Unión La Calera", shortName: "U. La Calera", nameCode: "ULC" },
  { id: 7029, name: "Ñublense", shortName: "Ñublense", nameCode: "NUB" },
  { id: 3157, name: "Palestino", shortName: "Palestino", nameCode: "PAL" },
  { id: 33595, name: "Curicó Unido", shortName: "Curicó Unido", nameCode: "CUR" },
  { id: 5034, name: "U. de Concepción", shortName: "U. de Concepción", nameCode: "UDC" },
  { id: 5031, name: "La Serena", shortName: "La Serena", nameCode: "SER" },
  { id: 3160, name: "D. Concepción", shortName: "D. Concepción", nameCode: "DPC" },
  { id: 331131, name: "Deportes Limache", shortName: "D. Limache", nameCode: "LIM" },
];

// All Chilean-related tournament IDs to track in live events
export const TRACKED_TOURNAMENT_IDS = new Set([
  11653,  // Primera División
  11157,  // Copa Chile
  18834,  // Segunda División
  384,    // Copa Libertadores
  480,    // Copa Sudamericana
]);

// ── TennisApi (RapidAPI) ─────────────────────────────────────────────
export const TENNISAPI_HOST = "tennisapi1.p.rapidapi.com";
export const TENNISAPI_BASE = "https://tennisapi1.p.rapidapi.com/api/tennis";

/** Chilean tennis players to track (name fragments for matching) */
export const TENNIS_PLAYERS_CL = [
  { name: "Tabilo", fullName: "Alejandro Tabilo" },
  { name: "Jarry", fullName: "Nicolás Jarry" },
  { name: "Garin", fullName: "Cristian Garín" },
  { name: "Barrios", fullName: "Tomás Barrios Vera" },
];

/** Key tennis tournament IDs in TennisApi (ATP/Davis Cup) */
export const TENNIS_TOURNAMENTS = [
  { id: 96, name: "Davis Cup" },
  { id: 2519, name: "ATP Buenos Aires" },
  { id: 2523, name: "ATP Santiago" },
  { id: 2517, name: "ATP Rio de Janeiro" },
];

// ── API-Basketball (RapidAPI) ────────────────────────────────────────
export const BASKETBALL_API_HOST = "api-basketball.p.rapidapi.com";
export const BASKETBALL_API_BASE = "https://api-basketball.p.rapidapi.com";

/** Basketball leagues to track */
export const BASKETBALL_LEAGUES = {
  lnb: { id: 354, name: "Liga Nacional de Basquetbol", season: "2025-2026" },
  nba: { id: 12, name: "NBA", season: "2025-2026" },
};
