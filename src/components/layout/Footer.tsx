import Link from "next/link";
import { Rss } from "lucide-react";
import { mainNavItems } from "@/data/navigation";
import { siteConfig } from "@/data/site-config";
import { Separator } from "@/components/ui/separator";
import { NewsletterForm } from "@/components/shared/NewsletterForm";

export function Footer() {
  return (
    <footer className="bg-spng-primary text-white">
      <div className="h-0.5 bg-spng-accent" />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl font-bold text-gradient mb-3">
              {siteConfig.name}
            </h3>
            <p className="text-sm text-white/70 leading-relaxed">
              {siteConfig.description}
            </p>
          </div>

          {/* Sections */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white/40 mb-4">
              Secciones
            </h4>
            <nav className="flex flex-col gap-2">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-white/60 hover:text-spng-accent transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social & contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white/40 mb-4">
              Siguenos
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/60 hover:text-spng-accent transition-colors"
              >
                Twitter / X
              </a>
              <a
                href={siteConfig.links.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/60 hover:text-spng-accent transition-colors"
              >
                Facebook
              </a>
              <a
                href={siteConfig.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/60 hover:text-spng-accent transition-colors"
              >
                Instagram
              </a>
              <a
                href="/rss.xml"
                className="text-sm text-white/60 hover:text-spng-accent transition-colors flex items-center gap-1.5"
              >
                <Rss className="h-3.5 w-3.5" />
                RSS Feed
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white/40 mb-4">
              Newsletter
            </h4>
            <p className="text-sm text-white/60 mb-3">
              Recibe las noticias mas importantes de Chile en tu email.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <Separator className="my-8 bg-white/5" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">
              Politica de Privacidad
            </Link>
            <Link href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">
              Terminos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
