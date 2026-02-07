import type { CategorySlug } from "@/types/article";
import { getArticlesByCategory } from "@/lib/dal";
import { getCategoryBySlug } from "@/data/categories";
import { NewsCardFeatured } from "@/components/news/NewsCardFeatured";
import { NewsCardStandard } from "@/components/news/NewsCardStandard";
import { BreadcrumbNav } from "@/components/shared/BreadcrumbNav";
import { Pagination } from "@/components/shared/Pagination";
import { Sidebar } from "@/components/layout/Sidebar";

interface CategoryPageTemplateProps {
  category: CategorySlug;
  extraTop?: React.ReactNode;
}

export async function CategoryPageTemplate({ category, extraTop }: CategoryPageTemplateProps) {
  const cat = getCategoryBySlug(category);
  const articles = await getArticlesByCategory(category);

  if (!cat) return null;

  const featured = articles[0];
  const grid = articles.slice(1);
  const totalPages = Math.max(1, Math.ceil(grid.length / 9));

  return (
    <div className="max-w-7xl mx-auto px-4">
      <BreadcrumbNav items={[{ label: cat.name }]} />

      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-spng-primary flex items-center gap-3">
          <span
            className="w-1.5 h-8 rounded-full"
            style={{ backgroundColor: cat.color }}
          />
          {cat.name}
        </h1>
        <p className="text-muted-foreground mt-2">{cat.description}</p>
      </div>

      {extraTop}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        {/* Main content */}
        <div>
          {/* Featured article */}
          {featured && (
            <div className="mb-8">
              <NewsCardFeatured article={featured} priority />
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {grid.map((article) => (
              <NewsCardStandard key={article.id} article={article} />
            ))}
          </div>

          <Pagination currentPage={1} totalPages={totalPages} basePath={`/${category}`} />
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <Sidebar currentCategory={category} />
          </div>
        </div>
      </div>
    </div>
  );
}
