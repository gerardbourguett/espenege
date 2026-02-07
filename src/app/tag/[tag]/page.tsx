import type { Metadata } from "next";
import { getArticlesByTag } from "@/lib/dal";
import { NewsCardStandard } from "@/components/news/NewsCardStandard";
import { BreadcrumbNav } from "@/components/shared/BreadcrumbNav";
import { Sidebar } from "@/components/layout/Sidebar";
import { Tag } from "lucide-react";

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  return {
    title: `#${decoded} | SPNG Media`,
    description: `Noticias etiquetadas con #${decoded}`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const articles = await getArticlesByTag(decoded);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <BreadcrumbNav items={[{ label: "Etiquetas" }, { label: `#${decoded}` }]} />

      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-spng-primary flex items-center gap-3">
          <span className="w-10 h-10 rounded-full bg-spng-accent/10 flex items-center justify-center">
            <Tag className="h-5 w-5 text-spng-accent" />
          </span>
          #{decoded}
        </h1>
        <p className="text-muted-foreground mt-2">
          {articles.length} {articles.length === 1 ? "articulo" : "articulos"} con esta etiqueta
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        {/* Main content */}
        <div>
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <NewsCardStandard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <Tag className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">
                No hay articulos con esta etiqueta
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
