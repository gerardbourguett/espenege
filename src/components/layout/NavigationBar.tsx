"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Search, Rss } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mainNavItems } from "@/data/navigation";
import { getCurrentDateFormatted } from "@/lib/format";
import { MobileNav } from "./MobileNav";
import { SearchOverlay } from "./SearchOverlay";
import { WeatherWidget } from "@/components/shared/WeatherWidget";

export function NavigationBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top bar with date */}
      <div className="bg-spng-primary text-white">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-8">
          <span className="text-xs text-white/70">{getCurrentDateFormatted()}</span>
          <div className="flex items-center gap-4">
            <WeatherWidget />
            <span className="text-xs text-white/70 hidden sm:block">Edicion Digital</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <header
        className={`bg-white border-b border-spng-border sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "glass shadow-md" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          {/* Logo row */}
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile menu button - left */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-spng-accent/10"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menu"
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* Logo - center on mobile, left on desktop */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 lg:relative lg:left-auto lg:translate-x-0 flex items-center gap-1"
            >
              <span className="text-3xl lg:text-4xl font-bold text-spng-primary tracking-tight">
                SPNG
              </span>
              <span className="w-2 h-2 bg-spng-accent rounded-full"></span>
            </Link>

            {/* RSS + Search buttons - right */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="hover:bg-spng-accent/10 hover:ring-2 hover:ring-spng-accent/20 transition-all hidden sm:inline-flex"
              >
                <a href="/rss.xml" aria-label="RSS Feed">
                  <Rss className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                className="hover:bg-spng-accent/10 hover:ring-2 hover:ring-spng-accent/20 transition-all"
                aria-label="Buscar"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Category navigation - desktop only */}
          <nav
            className="hidden lg:flex items-center gap-1 -mb-px pb-3"
            aria-label="Secciones"
          >
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-spng-muted hover:text-spng-primary border-b-2 border-transparent hover:border-spng-accent transition-all duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <MobileNav open={mobileOpen} onOpenChange={setMobileOpen} />
      <SearchOverlay open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
