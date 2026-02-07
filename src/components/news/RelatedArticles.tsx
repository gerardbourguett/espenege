import type { Article } from "@/types/article";
import { getRelatedArticles } from "@/lib/dal";
import { NewsCardStandard } from "./NewsCardStandard";
import { SectionHeader } from "@/components/shared/SectionHeader";

interface RelatedArticlesProps {
  article: Article;
  limit?: number;
}

export async function RelatedArticles({ article, limit = 3 }: RelatedArticlesProps) {
  const related = await getRelatedArticles(article, limit);
  if (related.length === 0) return null;

  return (
    <section>
      <SectionHeader title="Articulos Relacionados" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((a) => (
          <NewsCardStandard key={a.id} article={a} />
        ))}
      </div>
    </section>
  );
}
