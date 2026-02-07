import { getMostReadArticles } from "@/lib/dal";
import { NewsCardCompact } from "./NewsCardCompact";

interface MostReadListProps {
  limit?: number;
}

export async function MostReadList({ limit = 10 }: MostReadListProps) {
  const articles = await getMostReadArticles(limit);

  return (
    <div>
      <h3 className="font-serif text-lg font-bold text-spng-primary border-b-2 border-spng-accent pb-2 mb-2">
        Mas Leidas
      </h3>
      <div>
        {articles.map((article, index) => (
          <NewsCardCompact key={article.id} article={article} index={index} />
        ))}
      </div>
    </div>
  );
}
