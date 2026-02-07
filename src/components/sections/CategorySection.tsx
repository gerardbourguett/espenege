import type { CategorySlug } from "@/types/article";
import { getArticlesByCategory } from "@/lib/dal";
import { getCategoryBySlug } from "@/data/categories";
import { NewsCardFeatured } from "@/components/news/NewsCardFeatured";
import { NewsCardStandard } from "@/components/news/NewsCardStandard";
import { SectionHeader } from "@/components/shared/SectionHeader";

interface CategorySectionProps {
  category: CategorySlug;
  reversed?: boolean;
}

export async function CategorySection({ category, reversed = false }: CategorySectionProps) {
  const articles = await getArticlesByCategory(category);
  const cat = getCategoryBySlug(category);
  if (!cat || articles.length === 0) return null;

  const featured = articles[0];
  const rest = articles.slice(1, 4);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <SectionHeader title={cat.name} href={`/${category}`} accentColor={cat.color} />
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6`}>
        <div className={reversed ? "lg:order-2" : ""}>
          <NewsCardFeatured article={featured} />
        </div>
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5 ${reversed ? "lg:order-1" : ""}`}>
          {rest.map((article) => (
            <NewsCardStandard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
