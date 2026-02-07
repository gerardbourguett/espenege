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

  // TENIS - Live match
  {
    id: "10",
    homeTeam: {
      name: "Nicolas Jarry",
      shortName: "JAR",
      logo: "🎾",
    },
    awayTeam: {
      name: "Casper Ruud",
      shortName: "RUU",
      logo: "🎾",
    },
    homeScore: 2,
    awayScore: 1,
    status: "live",
    sport: "tenis",
    league: "ATP Santiago Open",
    startTime: "2026-02-06T18:00:00Z",
    minute: "4to set",
  },

  // TENIS - Finished matches
  {
    id: "11",
    homeTeam: {
      name: "Alejandro Tabilo",
      shortName: "TAB",
      logo: "🎾",
    },
    awayTeam: {
      name: "Carlos Alcaraz",
      shortName: "ALC",
      logo: "🎾",
    },
    homeScore: 1,
    awayScore: 2,
    status: "finished",
    sport: "tenis",
    league: "ATP Santiago Open",
    startTime: "2026-02-05T18:00:00Z",
  },
  {
    id: "12",
    homeTeam: {
      name: "Cristian Garin",
      shortName: "GAR",
      logo: "🎾",
    },
    awayTeam: {
      name: "Felix Auger-Aliassime",
      shortName: "FAA",
      logo: "🎾",
    },
    homeScore: 2,
    awayScore: 0,
    status: "finished",
    sport: "tenis",
    league: "ATP Santiago Open",
    startTime: "2026-02-05T19:30:00Z",
  },

  // TENIS - Upcoming matches
  {
    id: "13",
    homeTeam: {
      name: "Nicolas Jarry",
      shortName: "JAR",
      logo: "🎾",
    },
    awayTeam: {
      name: "Cristian Garin",
      shortName: "GAR",
      logo: "🎾",
    },
    status: "upcoming",
    sport: "tenis",
    league: "ATP Santiago Open",
    startTime: "2026-02-07T19:00:00Z",
  },

  // BASQUETBOL - Live match
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
    startTime: "2026-02-06T20:00:00Z",
    minute: "4Q",
  },

  // BASQUETBOL - Finished match
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
    startTime: "2026-02-05T18:00:00Z",
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
