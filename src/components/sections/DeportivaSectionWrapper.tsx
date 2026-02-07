import { getArticlesByCategory } from "@/lib/dal";
import { matches, getMatchesBySport } from "@/data/sports-fixtures";
import { DeportivaSection } from "./DeportivaSection";

export async function DeportivaSectionWrapper() {
  const articles = await getArticlesByCategory("deportiva");

  return (
    <DeportivaSection
      articles={articles.slice(0, 4)}
      allMatches={matches}
    />
  );
}
