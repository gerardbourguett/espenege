import { Match, SportType } from "@/types/sports";

export const matches: Match[] = [
  // FUTBOL - Live matches
  {
    id: "1",
    homeTeam: {
      name: "Colo-Colo",
      shortName: "COL",
      logo: "⚽",
    },
    awayTeam: {
      name: "Universidad de Chile",
      shortName: "UCH",
      logo: "⚽",
    },
    homeScore: 2,
    awayScore: 1,
    status: "live",
    sport: "futbol",
    league: "Primera Division Chile",
    startTime: "2026-02-06T20:00:00Z",
    minute: "67'",
  },
  {
    id: "2",
    homeTeam: {
      name: "Universidad Catolica",
      shortName: "UC",
      logo: "⚽",
    },
    awayTeam: {
      name: "Cobreloa",
      shortName: "COB",
      logo: "⚽",
    },
    homeScore: 1,
    awayScore: 1,
    status: "live",
    sport: "futbol",
    league: "Primera Division Chile",
    startTime: "2026-02-06T21:30:00Z",
    minute: "HT",
  },
  {
    id: "3",
    homeTeam: {
      name: "Huachipato",
      shortName: "HUA",
      logo: "⚽",
    },
    awayTeam: {
      name: "Audax Italiano",
      shortName: "AUD",
      logo: "⚽",
    },
    homeScore: 0,
    awayScore: 0,
    status: "live",
    sport: "futbol",
    league: "Primera Division Chile",
    startTime: "2026-02-06T19:00:00Z",
    minute: "23'",
  },

  // FUTBOL - Finished matches
  {
    id: "4",
    homeTeam: {
      name: "O'Higgins",
      shortName: "OHI",
      logo: "⚽",
    },
    awayTeam: {
      name: "Everton de Vina",
      shortName: "EVE",
      logo: "⚽",
    },
    homeScore: 3,
    awayScore: 2,
    status: "finished",
    sport: "futbol",
    league: "Primera Division Chile",
    startTime: "2026-02-05T22:00:00Z",
  },
  {
    id: "5",
    homeTeam: {
      name: "Union Espanola",
      shortName: "UES",
      logo: "⚽",
    },
    awayTeam: {
      name: "Cobresal",
      shortName: "CBS",
      logo: "⚽",
    },
    homeScore: 0,
    awayScore: 2,
    status: "finished",
    sport: "futbol",
    league: "Primera Division Chile",
    startTime: "2026-02-05T19:00:00Z",
  },
  {
    id: "6",
    homeTeam: {
      name: "Colo-Colo",
      shortName: "COL",
      logo: "⚽",
    },
    awayTeam: {
      name: "Flamengo",
      shortName: "FLA",
      logo: "⚽",
    },
    homeScore: 1,
    awayScore: 1,
    status: "finished",
    sport: "futbol",
    league: "Copa Libertadores",
    startTime: "2026-02-05T23:00:00Z",
  },

  // FUTBOL - Upcoming matches
  {
    id: "7",
    homeTeam: {
      name: "Universidad de Chile",
      shortName: "UCH",
      logo: "⚽",
    },
    awayTeam: {
      name: "Universidad Catolica",
      shortName: "UC",
      logo: "⚽",
    },
    status: "upcoming",
    sport: "futbol",
    league: "Primera Division Chile",
    startTime: "2026-02-07T21:00:00Z",
  },
  {
    id: "8",
    homeTeam: {
      name: "Cobreloa",
      shortName: "COB",
      logo: "⚽",
    },
    awayTeam: {
      name: "Coquimbo Unido",
      shortName: "COQ",
      logo: "⚽",
    },
    status: "upcoming",
    sport: "futbol",
    league: "Copa Chile",
    startTime: "2026-02-07T22:30:00Z",
  },
  {
    id: "9",
    homeTeam: {
      name: "Union La Calera",
      shortName: "ULC",
      logo: "⚽",
    },
    awayTeam: {
      name: "Nublense",
      shortName: "NUB",
      logo: "⚽",
    },
    status: "upcoming",
    sport: "futbol",
    league: "Primera Division Chile",
    startTime: "2026-02-08T19:00:00Z",
  },

  // TENIS - Copa Davis Chile vs Serbia (Live - Feb 7-8, 2026)
  {
    id: "10",
    homeTeam: {
      name: "Alejandro Tabilo (CHI)",
      shortName: "TAB",
      logo: "🎾",
    },
    awayTeam: {
      name: "Novak Djokovic (SRB)",
      shortName: "DJO",
      logo: "🎾",
    },
    homeScore: 1,
    awayScore: 1,
    status: "live",
    sport: "tenis",
    league: "Copa Davis - Primera Ronda",
    startTime: "2026-02-07T17:00:00Z",
    minute: "3er set",
  },

  // TENIS - Copa Davis finished
  {
    id: "11",
    homeTeam: {
      name: "Tomas Barrios (CHI)",
      shortName: "BAR",
      logo: "🎾",
    },
    awayTeam: {
      name: "Miomir Kecmanovic (SRB)",
      shortName: "KEC",
      logo: "🎾",
    },
    homeScore: 0,
    awayScore: 2,
    status: "finished",
    sport: "tenis",
    league: "Copa Davis - Primera Ronda",
    startTime: "2026-02-07T14:00:00Z",
  },

  // TENIS - ATP Buenos Aires
  {
    id: "12",
    homeTeam: {
      name: "Cristian Garin",
      shortName: "GAR",
      logo: "🎾",
    },
    awayTeam: {
      name: "Diego Schwartzman",
      shortName: "SCH",
      logo: "🎾",
    },
    homeScore: 2,
    awayScore: 1,
    status: "finished",
    sport: "tenis",
    league: "ATP Buenos Aires 250",
    startTime: "2026-02-06T18:00:00Z",
  },
  {
    id: "12b",
    homeTeam: {
      name: "Alejandro Tabilo",
      shortName: "TAB",
      logo: "🎾",
    },
    awayTeam: {
      name: "Sebastian Baez",
      shortName: "BAE",
      logo: "🎾",
    },
    homeScore: 2,
    awayScore: 0,
    status: "finished",
    sport: "tenis",
    league: "ATP Buenos Aires 250",
    startTime: "2026-02-06T20:30:00Z",
  },

  // TENIS - Upcoming Copa Davis
  {
    id: "13",
    homeTeam: {
      name: "Cristian Garin (CHI)",
      shortName: "GAR",
      logo: "🎾",
    },
    awayTeam: {
      name: "Laslo Djere (SRB)",
      shortName: "DJE",
      logo: "🎾",
    },
    status: "upcoming",
    sport: "tenis",
    league: "Copa Davis - Primera Ronda",
    startTime: "2026-02-08T15:00:00Z",
  },
  {
    id: "13b",
    homeTeam: {
      name: "Chile Dobles",
      shortName: "CHI",
      logo: "🎾",
    },
    awayTeam: {
      name: "Serbia Dobles",
      shortName: "SRB",
      logo: "🎾",
    },
    status: "upcoming",
    sport: "tenis",
    league: "Copa Davis - Primera Ronda",
    startTime: "2026-02-08T18:00:00Z",
  },

  // BASQUETBOL - Live matches (Liga Nacional - Feb 7, 2026)
  {
    id: "14",
    homeTeam: {
      name: "CD Valdivia",
      shortName: "VAL",
      logo: "🏀",
    },
    awayTeam: {
      name: "ABA Ancud",
      shortName: "ANC",
      logo: "🏀",
    },
    homeScore: 78,
    awayScore: 72,
    status: "live",
    sport: "basquetbol",
    league: "Liga Nacional de Basquetbol",
    startTime: "2026-02-07T20:00:00Z",
    minute: "4Q - 3:45",
  },

  // BASQUETBOL - Finished matches
  {
    id: "15",
    homeTeam: {
      name: "Puente Alto",
      shortName: "PTA",
      logo: "🏀",
    },
    awayTeam: {
      name: "Las Animas",
      shortName: "ANI",
      logo: "🏀",
    },
    homeScore: 85,
    awayScore: 90,
    status: "finished",
    sport: "basquetbol",
    league: "Liga Nacional de Basquetbol",
    startTime: "2026-02-06T21:30:00Z",
  },
  {
    id: "15b",
    homeTeam: {
      name: "CD Universidad Catolica",
      shortName: "UC",
      logo: "🏀",
    },
    awayTeam: {
      name: "Colegio Los Leones",
      shortName: "LEO",
      logo: "🏀",
    },
    homeScore: 92,
    awayScore: 88,
    status: "finished",
    sport: "basquetbol",
    league: "Liga Nacional de Basquetbol",
    startTime: "2026-02-06T19:00:00Z",
  },
  {
    id: "15c",
    homeTeam: {
      name: "Boston College",
      shortName: "BOS",
      logo: "🏀",
    },
    awayTeam: {
      name: "Stadio Italiano",
      shortName: "STI",
      logo: "🏀",
    },
    homeScore: 76,
    awayScore: 81,
    status: "finished",
    sport: "basquetbol",
    league: "Liga Nacional de Basquetbol",
    startTime: "2026-02-05T20:00:00Z",
  },

  // BASQUETBOL - Upcoming matches
  {
    id: "16",
    homeTeam: {
      name: "Municipal Puente Alto",
      shortName: "MPA",
      logo: "🏀",
    },
    awayTeam: {
      name: "CD Valdivia",
      shortName: "VAL",
      logo: "🏀",
    },
    status: "upcoming",
    sport: "basquetbol",
    league: "Liga Nacional de Basquetbol",
    startTime: "2026-02-08T19:30:00Z",
  },
  {
    id: "16b",
    homeTeam: {
      name: "Colegio Los Leones",
      shortName: "LEO",
      logo: "🏀",
    },
    awayTeam: {
      name: "ABA Ancud",
      shortName: "ANC",
      logo: "🏀",
    },
    status: "upcoming",
    sport: "basquetbol",
    league: "Liga Nacional de Basquetbol",
    startTime: "2026-02-08T21:00:00Z",
  },
];

/**
 * Get matches by sport type
 */
export function getMatchesBySport(sport: SportType): Match[] {
  return matches.filter((match) => match.sport === sport);
}

/**
 * Get all live matches
 */
export function getLiveMatches(): Match[] {
  return matches.filter((match) => match.status === "live");
}

/**
 * Get finished matches
 */
export function getFinishedMatches(): Match[] {
  return matches.filter((match) => match.status === "finished");
}

/**
 * Get upcoming matches
 */
export function getUpcomingMatches(): Match[] {
  return matches.filter((match) => match.status === "upcoming");
}

/**
 * Get matches by league
 */
export function getMatchesByLeague(league: string): Match[] {
  return matches.filter((match) => match.league === league);
}
