import Link from "next/link";
import { getMostReadArticles } from "@/lib/dal";
import { NewsCardStandard } from "@/components/news/NewsCardStandard";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default async function NotFound() {
  const popular = await getMostReadArticles(3);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="font-serif text-6xl md:text-8xl font-bold text-spng-accent mb-4">
          404
        </h1>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-spng-primary mb-4">
          Pagina no encontrada
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Lo sentimos, la pagina que buscas no existe o ha sido movida.
        </p>
        <Button asChild>
          <Link href="/" className="gap-2">
            <Home className="h-4 w-4" />
            Volver al inicio
          </Link>
        </Button>
      </div>

      {/* Popular articles */}
      {popular.length > 0 && (
        <div>
          <h3 className="font-serif text-xl font-bold text-spng-primary text-center mb-6">
            Articulos Populares
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {popular.map((article) => (
              <NewsCardStandard key={article.id} article={article} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
