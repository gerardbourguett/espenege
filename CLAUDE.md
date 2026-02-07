# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (http://localhost:3000)
npm run build     # Production build
npm run lint      # ESLint
```

## Project Overview

Spanish-language news portal "SPNG Media" focused on Chile with 6 sections. Features Sanity CMS integration (DAL pattern with mock fallback), real-time weather and sports APIs, RSS feed, and newsletter subscription.

## Architecture

**Stack**: Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Shadcn/UI (new-york style, Radix primitives) + Sanity CMS + Zustand

**Routing**: Category pages use a `(categories)` route group so URLs are `/nacional` not `/categories/nacional`. Article pages are at `/articulo/[slug]` with `generateStaticParams`. Sanity Studio at `/studio`.

**Data Access Layer (DAL)**: `src/lib/dal.ts` provides async functions with the same signatures as the original mock helpers. When `NEXT_PUBLIC_SANITY_PROJECT_ID` is set, fetches from Sanity CMS. Otherwise, falls back to local mock data in `src/data/`. Server components are `async` and use `await` with DAL functions. Client components receive data via server wrapper components (`LatestSectionWrapper`, `DeportivaSectionWrapper`).

**Sanity CMS**: Schemas in `src/sanity/schemas/` (article, category, author, siteSettings). Client in `src/sanity/client.ts`. GROQ queries in `src/sanity/queries.ts`. Image helper in `src/sanity/image.ts`. Studio config in `src/sanity/studio.config.ts`. Seed script at `src/sanity/seed.ts`.

**Category system**: The 6 categories (`nacional`, `internacional`, `deportiva`, `electoral`, `popurri`, `no-somos-nada`) each have a hex color defined in `src/data/categories.ts` and as Tailwind tokens (`cat-nacional`, `cat-internacional`, etc.) in `globals.css`. The `CategorySlug` union type in `src/types/article.ts` is the source of truth.

**API Routes**:
- `/api/weather` — OpenWeatherMap proxy, 30min cache, mock fallback
- `/api/sports/football` — API-Football proxy for Chilean leagues, 5min cache
- `/api/sports/tennis` — Tennis data (mock, ready for API integration)
- `/api/sports/basketball` — Basketball data (mock, ready for API integration)
- `/api/newsletter/subscribe` — Resend integration, zod validation
- `/api/revalidate` — Sanity webhook for on-demand revalidation
- `/rss.xml` — RSS 2.0 feed with latest 50 articles

**Zustand Stores** (`src/stores/`):
- `weather-store.ts` — Weather data, loading state, fetch function
- `sports-store.ts` — Sports matches by type, fetch functions
- `newsletter-store.ts` — Subscribe function, loading/subscribed state

**News Cards**: 4 separate component files — `NewsCardFeatured` (overlay image), `NewsCardStandard` (grid card), `NewsCardHorizontal` (sidebar), `NewsCardCompact` (numbered list). These are not variants of one component.

**Custom colors**: `spng-primary` (black), `spng-secondary` (dark), `spng-accent` (lime green), `spng-alert` (red), plus per-category colors — all usable as Tailwind classes (e.g., `bg-spng-primary`, `text-cat-deportiva`).

**Fonts**: Playfair Display as `font-serif` (headings), Inter as `font-sans` (body). Set via CSS variables `--font-playfair` and `--font-inter` in the root layout.

**Custom CSS animations**: `animate-ticker` (breaking news marquee), `animate-live-pulse` (live sports badge), `hide-scrollbar` (horizontal score scroll) — all defined in `globals.css`.

## Tailwind v4 Notes

- Uses `@plugin` directive for plugins (not `@import`): `@plugin "@tailwindcss/typography"`
- Custom colors are defined in `@theme inline` block in `globals.css`, not in a tailwind.config file
- The typography plugin provides `prose` classes for article body rendering

## Key Conventions

- All content is in Spanish (Chile focus)
- `images.unoptimized: true` in next.config since placeholder images don't exist on disk — `ImageWithFallback` component renders a grey SVG fallback on error
- Client components (`"use client"`) are only used where needed: NavigationBar, MobileNav, SearchOverlay, LatestSection, DeportivaSection, SocialShareBar, ImageWithFallback, Pagination, WeatherWidget, NewsletterForm
- `@/*` path alias maps to `./src/*`
- Component barrel exports via `index.ts` in each component subdirectory

## Environment Variables

See `.env.local.example` for all required variables. The app works without any env vars (falls back to mock data).

| Variable | Service | Required |
|----------|---------|----------|
| NEXT_PUBLIC_SANITY_PROJECT_ID | Sanity | No (uses mock data) |
| NEXT_PUBLIC_SANITY_DATASET | Sanity | No (defaults to "production") |
| SANITY_API_TOKEN | Sanity | No (uses mock data) |
| SANITY_REVALIDATE_SECRET | Sanity webhook | No |
| OPENWEATHERMAP_API_KEY | OpenWeatherMap | No (uses mock data) |
| RAPIDAPI_KEY | API-Football | No (uses mock data) |
| RESEND_API_KEY | Resend | No (demo mode) |
| RESEND_AUDIENCE_ID | Resend | No |
| RESEND_FROM_EMAIL | Resend | No (defaults to noticias@spng.stream) |

## Project Plan

See `docs/PLAN.md` for detailed implementation phases and roadmap

## Rules

- No uses Server Actions, usa Route Handlers
- Para manejo de estado global usa Zustand
- Para formularios, si es que hubiere, usar react-hook-form y zod
- Cuando termines, debemos actualizar el `docs/PLAN.md`, pero seamos claros en lo que editamos.
