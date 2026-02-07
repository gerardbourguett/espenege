import { getLatestArticles } from "@/lib/dal";
import { NewsCardHorizontal } from "./NewsCardHorizontal";

interface LatestNewsFeedProps {
  limit?: number;
}

export async function LatestNewsFeed({ limit = 8 }: LatestNewsFeedProps) {
  const articles = await getLatestArticles(limit);

  return (
    <div>
      <h3 className="font-serif text-lg font-bold text-spng-primary border-b-2 border-spng-accent pb-2 mb-2">
        Lo Ultimo
      </h3>
      <div className="divide-y divide-spng-border">
        {articles.map((article) => (
          <NewsCardHorizontal key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
