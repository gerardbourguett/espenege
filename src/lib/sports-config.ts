/**
 * Chilean sports configuration for TheSportsDB API
 * Free API: https://www.thesportsdb.com/api.php
 */

export const THESPORTSDB_BASE = "https://www.thesportsdb.com/api/v1/json/3";

// Chilean football team IDs in TheSportsDB
export const CHILEAN_FOOTBALL_TEAMS = [
  { id: "137724", name: "Colo-Colo", shortName: "COL" },
  { id: "137725", name: "Universidad de Chile", shortName: "UCH" },
  { id: "137726", name: "Universidad Católica", shortName: "UC" },
  { id: "137727", name: "Cobreloa", shortName: "COB" },
  { id: "137730", name: "Huachipato", shortName: "HUA" },
  { id: "137728", name: "Audax Italiano", shortName: "AUD" },
];

// Chilean football league IDs
export const FOOTBALL_LEAGUES = {
  primeraChile: { id: "4627", name: "Chile Primera Division" },
  copaChile: { id: "5378", name: "Copa Chile" },
};

// Chilean tennis players (ATP)
export const TENNIS_PLAYERS_CL = [
  "Nicolas Jarry",
  "Alejandro Tabilo",
  "Cristian Garin",
  "Tomas Barrios",
];

export const BASKETBALL_LEAGUE = {
  name: "Liga Nacional de Basquetbol",
  country: "Chile",
};
