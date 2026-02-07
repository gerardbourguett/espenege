import { getFeaturedArticles, getLatestArticles } from "@/lib/dal";
import { NewsCardFeatured } from "@/components/news/NewsCardFeatured";
import { NewsCardHorizontal } from "@/components/news/NewsCardHorizontal";

export async function HeroSection() {
  const featured = await getFeaturedArticles();
  const mainArticle = featured[0];
  const sideArticles = featured.length > 1 ? featured.slice(1, 4) : await getLatestArticles(3);

  if (!mainArticle) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main featured article - 2/3 */}
        <div className="lg:col-span-2">
          <NewsCardFeatured article={mainArticle} priority />
        </div>

        {/* Side stack - 1/3 */}
        <div className="bg-spng-bg-secondary rounded-xl p-4">
          <div className="flex flex-col space-y-1">
            {sideArticles.map((article, index) => (
              <div key={article.id}>
                <NewsCardHorizontal article={article} />
                {index < sideArticles.length - 1 && (
                  <div className="h-px bg-spng-border my-3" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
