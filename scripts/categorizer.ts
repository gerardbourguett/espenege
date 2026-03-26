/**
 * Categorizer for WorldNews articles
 * Classifies articles into SPNG Media categories using keyword matching
 */

export type Category = "nacional" | "internacional" | "deportiva";

const SPORTS_KEYWORDS = [
  "futbol", "futb", "tenis", "baloncest", "basketball", "sports",
  "copa", "liga", "torneo", "seleccion", "equipo", "gol", "partido",
  "campeonato", "hockey", "rugby", "natacion", "atletis", "tennis",
  "colocolo", "udechile", "catolica", "audax", "huachipato", "coquimbo",
  "la serena", "palmeiras", "boca", "river", "messi", "cr7", "brasileirao",
  "soccer", "football", "球员", "mlb", "nba", "f1", "formula", "nfl"
];

const CHILE_KEYWORDS = [
  "chile", "santiago", "valparaiso", "conce", "concepcion", "la serena",
  "chillan", "rancagua", "temuco", "valdivia", "pucon", "antofagasta",
  "iquique", "osorno", "punta arenas", "magallanes", "biobio", "maule",
  "ohiggins", "araucania", "loslagos", "losrios", "atacama", "coquimbo",
  "arica", "parinacota", ".gobierno", "presidente", "ministerio", "bancada",
  "congreso", "senado", "camara de diputados", "gobierno de chile",
  "estado de chile", "pdi", "carabineros", "fach", "ffaa", "banco central",
  "senapred", "municipalidad", "alcalde", "gobernacion", "seremi",
  "va a morir", "sin pena ni gloria", // podcast-related, not news
  "sag", "servicio agricola", "servicio agricolo y ganadero"
];

const INTERNATIONAL_KEYWORDS = [
  "estados unidos", "eeuu", "ee.uu", "united states", "trump", "biden",
  "argentina", "brasil", "peru", "colombia", "venezuela", "mexico",
  "espana", "europa", "alemania", "francia", "reino unido", "uk", "inglaterra",
  "china", "rusia", "ucrania", "otan", "onu", "naciones unidas"
];

export interface CategorizeResult {
  category: Category;
  confidence: "high" | "medium" | "low";
  matchedKeywords: string[];
}

/**
 * Classify a news article into a category based on its title and text
 */
export function categorize(title: string, text: string): CategorizeResult {
  const content = `${title} ${text}`.toLowerCase();

  // Check for sports keywords first (highest priority)
  const sportsMatches = SPORTS_KEYWORDS.filter(kw =>
    content.includes(kw.toLowerCase())
  );

  // Check for Chile/national keywords
  const chileMatches = CHILE_KEYWORDS.filter(kw =>
    content.includes(kw.toLowerCase())
  );

  // Check for explicit international
  const intlMatches = INTERNATIONAL_KEYWORDS.filter(kw =>
    content.includes(kw.toLowerCase())
  );

  // Decision logic
  if (sportsMatches.length > 0) {
    return {
      category: "deportiva",
      confidence: sportsMatches.length >= 2 ? "high" : "medium",
      matchedKeywords: sportsMatches
    };
  }

  // If it mentions international places but NOT Chile → internacional
  if (intlMatches.length > 0 && chileMatches.length === 0) {
    return {
      category: "internacional",
      confidence: intlMatches.length >= 2 ? "high" : "medium",
      matchedKeywords: intlMatches
    };
  }

  // If it mentions Chile (even with international context) → nacional
  if (chileMatches.length > 0) {
    // Check if it's primarily international news that happens to mention Chile
    if (intlMatches.length > chileMatches.length * 2) {
      return {
        category: "internacional",
        confidence: "medium",
        matchedKeywords: intlMatches
      };
    }
    return {
      category: "nacional",
      confidence: chileMatches.length >= 2 ? "high" : "medium",
      matchedKeywords: chileMatches
    };
  }

  // Default: internacional (if we can't determine, it's outside Chile)
  return {
    category: "internacional",
    confidence: "low",
    matchedKeywords: []
  };
}
