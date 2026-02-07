# SPNG Media - Plan de Implementacion UI

## Contexto
Portal de noticias "SPNG Media" con 6 secciones: Nacional, Internacional, Deportiva, Electoral, Popurri y Noticias Insolitas. Fase 1 enfocada exclusivamente en UI con datos mock, sin backend. El CMS se integrara posteriormente.

## Stack
- **Framework**: Next.js (App Router) + TypeScript
- **Styling**: Tailwind CSS + CSS custom properties
- **Componentes base**: Shadcn/UI (button, badge, dialog, input, tabs, sheet, skeleton, separator, scroll-area)
- **Tipografia**: Playfair Display (titulares/serif) + Inter (cuerpo/sans)
- **Iconos**: Lucide React
- **Extras**: @tailwindcss/typography (prose para articulos)
- **Dark mode**: No por ahora

## Estilo Visual (v2 — Moderno Minimalista)
- Paleta monocromatica Blanco/Negro con acento Verde Lima
- Header limpio con glass morphism al hacer scroll
- Cards con bordes suaves, sombras sutiles, y acentos de color al hover
- Badges de categoria en forma pill (rounded-full)
- Tipografia bold con contraste fuerte
- Widget de clima en la barra superior
- Ultimo Momento como strip estatico con indicador en vivo

---

## Estructura de Proyecto

```
spng/
├── public/
│   └── images/
│       ├── logo.svg
│       ├── placeholder-hero.jpg
│       ├── placeholder-thumb.jpg
│       └── authors/default-avatar.jpg
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # Root layout: fonts, nav, footer
│   │   ├── page.tsx                    # Homepage
│   │   ├── not-found.tsx               # 404
│   │   ├── globals.css                 # CSS custom properties + Tailwind
│   │   ├── (categories)/              # Route group (URL limpio sin /categories/)
│   │   │   ├── layout.tsx             # Layout compartido: sidebar
│   │   │   ├── nacional/page.tsx
│   │   │   ├── internacional/page.tsx
│   │   │   ├── deportiva/page.tsx     # Variante especial con scores
│   │   │   ├── electoral/page.tsx
│   │   │   ├── popurri/page.tsx
│   │   │   └── noticias-insolitas/page.tsx
│   │   └── articulo/[slug]/
│   │       └── page.tsx               # Pagina de articulo individual
│   ├── components/
│   │   ├── ui/                        # Shadcn/UI generados
│   │   ├── layout/                    # NavigationBar, MobileNav, Footer, BreakingNewsTicker, Sidebar
│   │   ├── news/                      # NewsCard (4 variantes), MostReadList, LatestNewsFeed, RelatedArticles, ArticleMetadata
│   │   ├── sports/                    # SportScoreCard, MatchFixtureList, LiveBadge, LeagueTable
│   │   ├── sections/                  # HeroSection, LatestSection, CategorySection, DeportivaSection, SectionHeader
│   │   └── shared/                    # CategoryBadge, SearchOverlay, BreadcrumbNav, Pagination, DateDisplay, SocialShareBar, ImageWithFallback
│   ├── data/                          # Mock data (TypeScript, no JSON)
│   │   ├── articles.ts               # 30+ articulos mock + helpers (getBySlug, getByCategory, getMostRead, etc.)
│   │   ├── categories.ts             # 6 categorias con metadata y color
│   │   ├── navigation.ts             # Items de navegacion
│   │   ├── sports-fixtures.ts        # Partidos mock
│   │   └── site-config.ts            # Metadata del sitio
│   ├── types/
│   │   ├── article.ts                # Article, Author, Category
│   │   └── sports.ts                 # Match, Team, LeagueStanding
│   ├── lib/
│   │   ├── utils.ts                  # cn() helper
│   │   ├── constants.ts              # Slugs, nav items
│   │   └── format.ts                 # Formateo de fechas, tiempo de lectura
│   └── hooks/
│       ├── use-media-query.ts
│       └── use-scroll-direction.ts
├── tailwind.config.ts
├── next.config.ts
└── components.json                    # Config Shadcn/UI
```

---

## Sistema de Colores (v2 — Rediseno Moderno)

```css
/* Paleta principal — Blanco / Negro / Verde Lima */
--color-primary: #0a0a0a;          /* Negro - texto principal, headers */
--color-secondary: #171717;         /* Negro secundario - fondos oscuros */
--color-accent: #84cc16;           /* Verde lima - acento principal */
--color-accent-light: #a3e635;     /* Verde lima claro - gradientes, hovers */
--color-alert: #ef4444;            /* Rojo - breaking news, badges en vivo */

/* Neutrales */
--color-bg-primary: #ffffff;
--color-bg-secondary: #fafafa;      /* Fondo alternante de secciones */
--color-bg-dark: #0a0a0a;           /* Fondo oscuro (footer, top bar) */
--color-border: #e5e5e5;
--color-muted: #737373;             /* Texto gris secundario */

/* Colores por categoria */
Nacional: #2563eb (azul)
Internacional: #7c3aed (purpura)
Deportiva: #16a34a (verde)
Electoral: #dc2626 (rojo)
Popurri: #ea580c (naranja)
Insolitas: #ec4899 (rosa)
```

---

## Paginas a Construir

### 1. Homepage (`src/app/page.tsx`)
- **Hero**: 2/3 articulo destacado (imagen overlay + titular serif grande) + 1/3 stack de 2-3 cards horizontales
- **Lo Ultimo** (3 columnas): Featured cards | Feed de noticias recientes | Mas Leidas (lista numerada 1-10)
- **Bloques por categoria**: Cada uno con SectionHeader + 1 card featured + 3-4 cards compactas, layouts alternados
- **Seccion Deportiva**: Fondo gris claro, acento amarillo, score cards en scroll horizontal + tabs (Futbol/Beisbol/Otros) + news cards
- **Breaking News Ticker**: Animacion CSS marquee en la parte superior

### 2. Pagina de Categoria (template reutilizable)
- Breadcrumb + header con titulo/descripcion
- Grid de articulos (70%): 1 featured + grid de cards standard (3 cols desktop, 2 tablet, 1 mobile)
- Sidebar sticky (30%): Mas Leidas + links a otras categorias
- Paginacion
- **Variante Deportiva**: Agrega strip de scores arriba del grid

### 3. Pagina de Articulo (`src/app/articulo/[slug]/page.tsx`)
- Imagen hero full-width, aspect-ratio 16/9
- Header: CategoryBadge, titular serif grande, extracto, autor + fecha + tiempo lectura
- Cuerpo: prose container de 720px max, estilado con @tailwindcss/typography
- Share bar: fija a la izquierda (desktop) o sticky bottom (mobile)
- Articulos relacionados: 3-4 cards horizontales

### 4. Pagina 404
- Mensaje centrado + link al inicio + articulos populares

---

## Componentes Clave

### News Cards (4 variantes, archivos separados)
| Variante | Uso | Estructura |
|---|---|---|
| **Featured** | Hero, destacados | Imagen grande con overlay, titular serif, extracto |
| **Standard** | Grids de categoria | Imagen arriba, contenido abajo |
| **Horizontal** | Sidebars, listas | Imagen izq + texto der, lado a lado |
| **Compact** | Feeds, listas numeradas | Sin imagen o imagen mini, solo titular + timestamp |

### Sports (solo seccion Deportiva)
- **SportScoreCard**: Dos equipos, marcador, estado (en vivo/final/proximo)
- **LiveBadge**: Indicador rojo pulsante "EN VIVO"
- **MatchFixtureList**: Lista de partidos proximos

---

## Orden de Implementacion

### Fase 1: Fundacion
1. Inicializar proyecto Next.js con TypeScript + Tailwind
2. Configurar Shadcn/UI e instalar componentes base
3. Configurar Tailwind (colores, fuentes, typography plugin)
4. Configurar fuentes (Playfair Display + Inter) en root layout
5. Crear tipos (`types/article.ts`, `types/sports.ts`)
6. Crear datos mock (`data/articles.ts` con 30+ articulos, `data/categories.ts`, `data/sports-fixtures.ts`)
7. Crear utilidades (`lib/utils.ts`, `lib/format.ts`, `lib/constants.ts`)

### Fase 2: Layout Shell
8. NavigationBar (logo, categorias, busqueda, fecha, responsive hamburger)
9. MobileNav (Shadcn Sheet slide-in)
10. SearchOverlay (Shadcn Dialog, solo UI)
11. Footer (multi-columna, links, social, copyright)
12. BreakingNewsTicker (CSS animation marquee)
13. Root Layout (ensamblar todo)

### Fase 3: Componentes Compartidos
14. CategoryBadge, ImageWithFallback, ArticleMetadata
15. DateDisplay, SectionHeader, BreadcrumbNav
16. Pagination, SocialShareBar

### Fase 4: Sistema de News Cards
17. NewsCardFeatured (imagen overlay, hover effects)
18. NewsCardStandard (grid card)
19. NewsCardHorizontal (sidebar card)
20. NewsCardCompact (lista item)
21. MostReadList, LatestNewsFeed

### Fase 5: Componentes Deportivos
22. SportScoreCard, LiveBadge
23. MatchFixtureList

### Fase 6: Homepage
24. HeroSection
25. LatestSection (3 columnas)
26. CategorySection (reusable por categoria)
27. DeportivaSection (especial con scores + tabs)
28. Ensamblar homepage completa

### Fase 7: Paginas Secundarias
29. Template de pagina de categoria + las 6 paginas
30. Pagina de articulo con prose styling
31. Pagina 404

### Fase 8: Pulido
32. Loading skeletons
33. Hover/transition effects
34. Auditoria responsive (375px, 768px, 1024px, 1440px)
35. SEO: meta tags, Open Graph, JSON-LD
36. Accesibilidad: keyboard nav, ARIA, semantic HTML

---

## Responsive

| Breakpoint | Layout |
|---|---|
| < 768px (mobile) | 1 columna, hamburger menu, cards stacked |
| 768px (tablet) | 2 columnas, sidebar aparece |
| 1024px (desktop) | 3 columnas, nav completo visible |
| 1280px+ | Max-width container, margenes amplios |

Mobile: La seccion de 3 columnas "Lo Ultimo" se convierte en Tabs (Destacado / Recientes / Mas Leidas).

---

## Decisiones Arquitectonicas
- **Cards en archivos separados** (no un mega-componente con conditionals)
- **Route groups `(categories)`** para URLs limpias (`/nacional` en vez de `/categories/nacional`)
- **Mock data en TypeScript** (no JSON) para tipado + helpers incluidos
- **Colores de categoria via map** en vez de hardcoded por componente
- **Generacion estatica** para todas las paginas (migracion a ISR cuando llegue el CMS)

---

## Verificacion
1. `npm run dev` - verificar que todas las paginas cargan sin errores
2. Navegar por las 6 categorias y verificar que filtran articulos correctamente
3. Abrir un articulo y verificar layout completo con prose styling
4. Probar responsive: redimensionar a 375px, 768px, 1024px
5. Verificar que el menu mobile abre/cierra correctamente
6. Verificar hover effects en cards
7. `npm run build` - verificar build exitoso sin errores
8. Lighthouse audit: Performance > 90, Accessibility > 90

---

## Fase 9: Rediseno Visual Moderno (Completada)
_(Ver detalles abajo)_

---

## Fase 10: Adaptacion Chile (Completada)

### Cambios realizados:
1. **Categoria renombrada**: `noticias-insolitas` -> `no-somos-nada` (slug, labels, CSS token, route)
2. **Contenido Chile**: Nacional = "Noticias de Chile, politica y sociedad", site description actualizada
3. **Deportes chilenos**: Sports fixtures con equipos chilenos (Colo-Colo, U de Chile, UC, Cobreloa), ligas Primera Division Chile, Copa Chile, Copa Libertadores
4. **Nuevos deportes**: `tenis` y `basquetbol` agregados a `SportType`, DeportivaSection con 3 tabs (Futbol / Tenis / Basquetbol)
5. **WeatherWidget**: Ciudad actualizada a Santiago, temp 22°C
6. **Redirect SEO**: `/noticias-insolitas` -> `/no-somos-nada` (301 permanente)

---

## Fase 11: Sanity CMS (Completada)

### Cambios realizados:
1. **Sanity schemas**: article, category, author, siteSettings en `src/sanity/schemas/`
2. **DAL (Data Access Layer)**: `src/lib/dal.ts` — funciones async con mismas firmas, Sanity o mock fallback
3. **Server components async**: HeroSection, CategorySection, BreakingNewsTicker, Sidebar, CategoryPageTemplate, RelatedArticles, MostReadList, LatestNewsFeed, article page, not-found
4. **Client component wrappers**: `LatestSectionWrapper` y `DeportivaSectionWrapper` (server) pasan datos como props a componentes client
5. **Sanity Studio**: Embebido en `/studio`
6. **Revalidation webhook**: `/api/revalidate` con secret validation
7. **Seed script**: `src/sanity/seed.ts` para migrar datos mock a Sanity

---

## Fase 12: APIs Reales (Completada)

### Cambios realizados:
1. **Weather API**: `/api/weather` — proxy OpenWeatherMap con cache 30min, mock fallback
2. **Sports APIs**: `/api/sports/football`, `/api/sports/tennis`, `/api/sports/basketball` — cache 5min, mock fallback
3. **Zustand stores**: `weather-store.ts`, `sports-store.ts`, `newsletter-store.ts`
4. **WeatherWidget**: Usa Zustand store, carga asincronamente, estados loading/error
5. **Sports config**: `src/lib/sports-config.ts` con IDs de ligas chilenas

---

## Fase 13: RSS Feed (Completada)

### Cambios realizados:
1. **RSS 2.0**: `/rss.xml` — genera XML con ultimos 50 articulos, incluye dc:creator y atom:link
2. **Layout metadata**: `alternates.types` con RSS link en `<head>`
3. **Footer**: Link RSS con icono Rss de lucide-react
4. **NavigationBar**: Boton RSS junto al boton de busqueda (visible en desktop)

---

## Fase 14: Newsletter con Resend (Completada)

### Cambios realizados:
1. **Welcome email template**: `src/emails/welcome.tsx` con React Email
2. **Subscribe API**: `/api/newsletter/subscribe` — validacion zod, Resend Audiences + welcome email
3. **NewsletterForm**: Componente con react-hook-form + zod, estados loading/success/error
4. **Footer**: Newsletter form integrado en nueva columna (grid 4 columnas)

---

## Fase 15: UX Polish (Completada)

### Cambios realizados:
1. **Error boundary**: `src/app/error.tsx` — pagina de error global con retry
2. **Suspense boundaries**: Homepage con `<Suspense>` por seccion y skeleton fallbacks
3. **CLAUDE.md actualizado**: Documentacion de DAL, API routes, env vars, stores
4. **PLAN.md actualizado**: Fases completadas documentadas

---

## Fase 9: Rediseno Visual Moderno (Detalles)

### Cambios realizados:
1. **Nueva paleta de colores**: Blanco/Negro/Verde Lima reemplaza Navy/Blue/Gold
2. **NavigationBar modernizado**: Logo de texto "SPNG." con punto verde lima, glass morphism al scroll, hovers en verde lima
3. **BreakingNewsTicker → Ultimo Momento**: Strip estatico con fondo negro, badge verde lima pulsante, 5 titulares con links
4. **WeatherWidget**: Nuevo componente con datos mock (temperatura, ciudad, humedad), integrado en la barra superior del nav
5. **NewsCards modernizados**:
   - Featured: rounded-xl, borde inferior verde lima, hover titulo en verde lima
   - Standard: sombra hover suave, borde verde lima/30 al hover
   - Horizontal: translate-x al hover, rounded-lg en imagenes
   - Compact: numeros en verde lima translucido, hover titulo en verde lima
6. **SectionHeader**: Barra lateral verde lima mas gruesa + linea bajo titulo
7. **CategoryBadge**: Forma pill (rounded-full) en vez de rectangulo
8. **HeroSection**: Side stack con fondo gris suave, separadores sutiles
9. **Footer**: Linea verde lima superior, marca con gradiente verde, separador sutil
10. **Sidebar, Pagination, BreadcrumbNav**: Hovers y acentos actualizados a verde lima
11. **SportScoreCard, LiveBadge**: Bordes redondeados xl, hover con sombra y borde verde
12. **CSS utilidades nuevas**: `.glass` (glass morphism), `.focus-ring`, `.text-gradient`
13. **Prose styling**: Links con decoracion verde lima en articulos

---

## Fase 16: Contenido Real Chileno (Completada)

### Cambios realizados:
1. **33 articulos reales** del 7 de febrero de 2026 reemplazaron los 32 articulos mock en Sanity CMS
2. **Fuentes de datos**: Cooperativa.cl (RSS), Emol.com — noticias reales del dia
3. **Distribucion por categoria**:
   - Nacional: 6 articulos (Kast gabinete, alerta sanitaria, incendios forestales, PDI Meiggs, fraude Calisto, atropello Huechuraba)
   - Internacional: 6 articulos (Gaza/Hamas, Haiti, muerte asistida NY, Cuba combustible, Washington Post despidos, LATAM Venezuela)
   - Deportiva: 6 articulos (Coquimbo vs Palestino, Copa Davis Tabilo, JJOO Invierno Holscher, ATP Barrios, Premier League, Otero subsecretario)
   - Electoral: 5 articulos (42 horas laborales, comisionado macrozona norte, Zelenski/guerra, Trump video racista, viviendas emergencia)
   - Popurri: 5 articulos (Bad Bunny Super Bowl, Taylor Swift Opalite, Semana Penaflorina, Vina 2026 jurado, protesta JJOO Milan)
   - No Somos Nada: 5 articulos (antivacunas/sarampion, El Monstruo Peru, Belloni Parral, Sanchez tecnoligarcas, ahogamiento/RCP)
4. **6 articulos featured** (1 por categoria) y **5 breaking news**
5. **10 autores con roles**: Editora Nacional, Corresponsal Politico, Periodista Internacional, Editor Deportivo, etc.
6. **Seed script**: `src/sanity/seed-real.ts` — elimina articulos mock y crea los reales con Portable Text
7. **Build exitoso**: 50 paginas generadas estaticamente con datos reales de Sanity

---

## Fase 17: Marcadores en Vivo y Buenas Practicas (Completada)

### Cambios realizados:

#### Marcadores deportivos en vivo:
1. **DeportivaSection ahora usa Zustand store**: Fetch de `/api/sports/*` al montar, auto-refresh cada 60 segundos
2. **DeportivaSectionWrapper simplificado**: Solo pasa articulos (server), los scores vienen del client via Zustand
3. **sports-store.ts mejorado**: Nuevo flag `hasFetched` para diferenciar loading inicial vs refresh
4. **Skeleton loading**: 5 placeholders animados mientras cargan los marcadores
5. **Tennis route**: Intenta TheSportsDB (Davis Cup Chile, ATP), fallback a datos curados (Copa Davis Chile vs Serbia, ATP Buenos Aires)
6. **Basketball route**: Intenta TheSportsDB (NBA, Chile basket), fallback a Liga Nacional de Basquetbol
7. **sports-api.ts**: Nuevas funciones `fetchTennisEvents()` y `fetchBasketballEvents()`
8. **Mock data actualizado**: Tennis = Copa Davis Chile vs Serbia + ATP Buenos Aires, Basketball = Liga Nacional Basquetbol temporada 2026

#### Gitflow y buenas practicas:
9. **CLAUDE.md**: Seccion completa de Gitflow (branches, workflow, commit messages, PR checklist)
10. **CLAUDE.md**: Seccion de Vercel Deployment (config, previews, env vars, webhook)
11. **Rules actualizadas**: Gitflow obligatorio, no commitear secretos, branches cortos

---

## Fase 18: SportAPI7 — Escudos Reales y Datos Primera Division 2026

**Estado**: Completada
**Fecha**: 2026-02-07

### Objetivo:
Reemplazar TheSportsDB (datos viejos, sin escudos) por SportAPI7 (RapidAPI) como fuente primaria de datos de futbol chileno. Usar escudos reales de equipos via SofaScore CDN.

### Cambios realizados:

#### Integracion SportAPI7:
1. **sports-config.ts**: Nuevo `SPORTAPI7_BASE`, `SPORTAPI7_HOST`, helper `teamImageUrl()` y `tournamentImageUrl()` para URLs de escudos SofaScore
2. **sports-config.ts**: `CHILEAN_TEAMS` con 19 equipos chilenos y sus IDs en SportAPI7 (Colo Colo=3155, U Chile=3161, UC=3151, etc.)
3. **sports-config.ts**: `PRIMERA_DIVISION` con `uniqueTournamentId: 11653` y `seasonId: 88493` (temporada 2026)
4. **sports-api.ts**: Nuevas funciones `fetchLeagueLastEvents()`, `fetchLeagueNextEvents()`, `fetchLiveChileanEvents()` usando SportAPI7
5. **sports-api.ts**: Transformer `transformSportAPI7Event()` que mapea respuesta SportAPI7 al tipo Match con URLs de escudos reales
6. **football/route.ts**: Reescrito para usar SportAPI7 (live + last + next en paralelo), fallback a mock si falla

#### Escudos reales:
7. **TeamLogo.tsx**: Nuevo componente client que renderiza `<img>` si el logo es URL, emoji si no, con fallback a iniciales en circulo si la imagen falla
8. **SportScoreCard.tsx**: Usa `TeamLogo` en lugar de emoji directo
9. **MatchFixtureList.tsx**: Usa `TeamLogo` para ambos equipos
10. **index.ts**: Export barrel actualizado con `TeamLogo`

#### Configuracion:
11. **next.config.ts**: `api.sofascore.app` agregado a `remotePatterns` para escudos de equipos

### Datos disponibles:
- 10 partidos de fecha 1 (finalizados) con marcadores reales
- 30 partidos de fecha 2 (proximos) con horarios confirmados
- Escudos PNG reales para todos los equipos de Primera Division
- Deteccion de partidos en vivo filtrando feed global por torneos chilenos (11653, 11157, 384, 480)

### Endpoints SportAPI7 usados:
- `GET /unique-tournament/{id}/season/{sid}/events/last/0` — Ultimos partidos terminados
- `GET /unique-tournament/{id}/season/{sid}/events/next/0` — Proximos partidos
- `GET /sport/football/events/live` — Partidos en vivo (filtrado por torneos chilenos)
- `GET /event/{id}` — Detalle enriquecido de un partido

---

## Fase 19: Ligas Chilenas + APIs Tennis/Basket + Pagina Detalle Partido

**Estado**: Completada
**Fecha**: 2026-02-07

### Objetivo:
Expandir el tracking de futbol chileno (Copa Chile, Segunda Division), reemplazar TheSportsDB con APIs dedicadas para tennis y basketball, y crear pagina de detalle de partido.

### Cambios realizados:

#### Expansion de ligas chilenas de futbol:
1. **sports-config.ts**: Nuevo array `CHILEAN_FOOTBALL_LEAGUES` con 3 ligas: Primera Division (11653), Copa Chile (11157), Segunda Division (18834)
2. **sports-config.ts**: Nuevo `TRACKED_TOURNAMENT_IDS` Set con 5 torneos (Primera, Copa Chile, Segunda, Libertadores, Sudamericana)
3. **sports-api.ts**: `fetchLeagueLastEvents()` y `fetchLeagueNextEvents()` ahora consultan las 3 ligas en paralelo
4. **sports-api.ts**: `fetchLiveChileanEvents()` usa `TRACKED_TOURNAMENT_IDS` para filtrar 5 torneos

#### Eliminacion de TheSportsDB:
5. **sports-api.ts**: Removidas todas las funciones TheSportsDB (`fetchTennisEvents`, `fetchBasketballEvents`, `transformSportsDBEvent`, `mapSportsDBStatus`, `getShortName`)
6. **sports-config.ts**: Eliminados `THESPORTSDB_BASE` y `CHILEAN_FOOTBALL_TEAMS` (legacy)

#### Integracion TennisApi (RapidAPI):
7. **tennis-api.ts**: Nuevo modulo con funciones `fetchChileanTennisEvents()`, `fetchLiveTennisEvents()`, `transformTennisEvent()`
8. **sports-config.ts**: `TENNISAPI_HOST`, `TENNISAPI_BASE`, `TENNIS_PLAYERS_CL` (Tabilo, Jarry, Garin, Barrios), `TENNIS_TOURNAMENTS`
9. **tennis/route.ts**: Reescrito para usar TennisApi, busca partidos de jugadores chilenos en ATP/WTA/Davis Cup
10. Consulta eventos de hoy, ayer y manana para cobertura completa, filtra por nombres de jugadores chilenos

#### Integracion API-Basketball (RapidAPI):
11. **basketball-api.ts**: Nuevo modulo con funciones `fetchBasketballMatches()`, `transformBasketballGame()`
12. **sports-config.ts**: `BASKETBALL_API_HOST`, `BASKETBALL_API_BASE`, `BASKETBALL_LEAGUES` (LNB Chile id:354, NBA id:12)
13. **basketball/route.ts**: Reescrito para usar API-Basketball, consulta LNB Chile + NBA
14. Busca partidos live, hoy, ayer y manana para ambas ligas

#### Pagina de detalle de partido:
15. **match-api.ts**: `fetchMatchById()` que consulta SportAPI7 `/event/{id}` para datos enriquecidos (venue, periodScores, round)
16. **MatchDetail.tsx**: Componente con escudos grandes (64px), marcador central, info de periodo, venue, ronda, fecha
17. **MatchDetailSkeleton.tsx**: Loading state con skeleton placeholders
18. **deportiva/partido/[matchId]/page.tsx**: Server component con `generateMetadata()` para SEO, breadcrumb, Suspense
19. **SportScoreCard.tsx**: Envuelto en `<Link>` a `/deportiva/partido/{match.id}` — cards clickeables
20. **MatchFixtureList.tsx**: Filas envueltas en `<Link>` con hover state
21. **index.ts**: Exporta `MatchDetail` y `MatchDetailSkeleton`

#### Tipos extendidos:
22. **sports.ts**: Nuevos campos opcionales en `Match`: `venue`, `round`, `periodScores` (array de `PeriodScore`)

### APIs usadas:
- **TennisApi** (tennisapi1.p.rapidapi.com): `/events/live`, `/events/{date}` — misma `RAPIDAPI_KEY`
- **API-Basketball** (api-basketball.p.rapidapi.com): `/games?league=&season=&date=`, `/games?live=all` — misma `RAPIDAPI_KEY`
- **SportAPI7**: `/event/{id}` — detalle enriquecido de partido

### Mock fallback:
- Todas las rutas API mantienen fallback a `getMatchesBySport()` si las APIs reales no retornan datos
- Mock data en `sports-fixtures.ts` sigue disponible como respaldo
