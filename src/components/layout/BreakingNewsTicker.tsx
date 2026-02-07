import Link from "next/link";
import { getBreakingNews, getLatestArticles } from "@/lib/dal";

export async function BreakingNewsTicker() {
  const breaking = await getBreakingNews();
  const latest = breaking.length > 0 ? breaking : await getLatestArticles(5);
  const headlines = latest.slice(0, 5);

  if (headlines.length === 0) return null;

  return (
    <div className="bg-spng-primary text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 py-2 overflow-x-auto hide-scrollbar">
          {/* Badge with live indicator */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-spng-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-spng-accent"></span>
            </span>
            <span className="bg-spng-accent text-black font-bold uppercase text-xs px-3 py-1 rounded">
              Ultimo Momento
            </span>
          </div>

          {/* Headlines */}
          <div className="flex items-center gap-3 flex-nowrap">
            {headlines.map((article, index) => (
              <div key={article.id} className="flex items-center gap-3 shrink-0">
                {index > 0 && (
                  <span className="text-spng-accent text-sm">·</span>
                )}
                <Link
                  href={`/articulo/${article.slug}`}
                  className="text-sm text-white hover:text-spng-accent transition-colors duration-200 whitespace-nowrap"
                >
                  {article.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
