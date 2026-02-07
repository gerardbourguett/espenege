import Link from "next/link";
import { getMostReadArticles } from "@/lib/dal";
import { categories } from "@/data/categories";
import type { CategorySlug } from "@/types/article";

interface SidebarProps {
  currentCategory?: CategorySlug;
}

export async function Sidebar({ currentCategory }: SidebarProps) {
  const mostRead = await getMostReadArticles(5);

  return (
    <aside className="space-y-8">
      {/* Most Read */}
      <div>
        <h3 className="text-lg font-bold text-spng-primary border-b-2 border-spng-accent pb-2 mb-4">
          Mas Leidas
        </h3>
        <ol className="space-y-4">
          {mostRead.map((article, index) => (
            <li key={article.id} className="flex gap-3 group">
              <span className="text-2xl font-bold text-spng-accent/40 shrink-0 w-8 tabular-nums">
                {index + 1}
              </span>
              <Link
                href={`/articulo/${article.slug}`}
                className="text-sm font-medium leading-snug hover:text-spng-accent transition-colors line-clamp-2"
              >
                {article.title}
              </Link>
            </li>
          ))}
        </ol>
      </div>

      {/* Other Categories */}
      <div>
        <h3 className="text-lg font-bold text-spng-primary border-b-2 border-spng-accent pb-2 mb-4">
          Secciones
        </h3>
        <nav className="flex flex-col gap-1">
          {categories
            .filter((cat) => cat.slug !== currentCategory)
            .map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-spng-bg-secondary hover:text-spng-accent transition-colors"
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: cat.color }}
                />
                {cat.name}
              </Link>
            ))}
        </nav>
      </div>
    </aside>
  );
}
