import { getFeaturedArticles, getLatestArticles, getMostReadArticles } from "@/lib/dal";
import { LatestSection } from "./LatestSection";

export async function LatestSectionWrapper() {
  const featured = await getFeaturedArticles();
  const latest = await getLatestArticles(8);
  const mostRead = await getMostReadArticles(10);

  return (
    <LatestSection
      featured={featured.slice(0, 3)}
      latest={latest}
      mostRead={mostRead}
    />
  );
}
