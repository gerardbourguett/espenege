# SPNG Media — Refactor Plan

## Objetivo

Transformar SPNG Media en un portal de noticias automatizado que agregue contenido de fuentes chilenas, lo categorice, lo resuma con IA, y lo publique en Sanity CMS. El contenido heredo se trata éticamente: créditos, fuentes y links a las noticias originales.

---

## 1. Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│                    SPNG MEDIA                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  WorldNews API              Anchor FM RSS               │
│  (noticias CH)                  (podcast)              │
│         │                           │                  │
│         ▼                           ▼                  │
│  ┌─────────────┐           ┌────────────────┐         │
│  │   News      │           │    Podcast     │         │
│  │   Fetcher   │           │    Fetcher     │         │
│  └──────┬──────┘           └───────┬────────┘         │
│         │                           │                  │
│         ▼                           │                  │
│  ┌─────────────┐                   │                  │
│  │Categorizer  │                   │                  │
│  │(keyword-based)                   │                  │
│  └──────┬──────┘                    │                  │
│         │                           │                  │
│         ▼                           ▼                  │
│  ┌──────────────────────────────────────────┐         │
│  │              SANITY CMS                  │         │
│  │  (articles, categories, siteSettings)   │         │
│  └────────────────────┬───────────────────┘         │
│                       │                               │
│                       ▼                               │
│                Next.js Portal                         │
│         (nacional, internacional, deportes,           │
│          electoral, popurri, no-somos-nada,           │
│          podcast)                                     │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Ingestión de Noticias

### 2.1 Source: WorldNews API

**Endpoint:** `https://news.worldnews.com/v2/articles/?source_country=cl&text=true&number=20&api_key=...`

**Response fields usadas:**
- `id` → para deduplicar
- `title` → headline
- `text` → cuerpo de la noticia (para resumen)
- `url` → link a fuente original
- `image` → imagen principal
- `publish_date` → fecha de publicación
- `author` / `authors` → crédito
- `source_country: cl` → solo Chile

### 2.2 Categorization Logic

El campo `category` del API es unreliable (fútbol viene como "politics").

**Keyword-based classifier:**

| Categoría SPNG | Keywords (case-insensitive) |
|----------------|------------------------------|
| `deportiva` | futb, ten, baloncest, sports, copa, liga, torneo, seleccion, equipo, gol, partido, campeonato, hockey, rugby, natacion, atletis |
| `nacional` | chile, santiago, valparaiso, conce, la serena, chillan, rancagua, temuco, valdivia, pucon, antofagasta, iquique, osorno, punta arenas, govierno, presidente, ministerial, bancada, congreso, senado, camara |
| `internacional` | todo lo demás |

**Reglas:**
- Si un artículo matchea `deportiva` → `deportiva`
- Si no pero matchea `nacional` (keywords de Chile o ciudades chilenas) → `nacional`
- Si no matchea ninguna → `internacional`
- Las categorías `electoral`, `popurri`, `no-somos-nada` se asignan manualmente

### 2.3 AI Summarization

- Usar IA para resumir el campo `text` a 2-3 párrafos
- Mantener la información clave
- Traducir si viene en inglés
- **Nunca inventar datos** — solo resumir lo que existe

### 2.4 Ethical Sourcing

Cada artículo publicado incluye:
- **Crédito al autor original** (campo `author`)
- **Link a fuente original** (campo `url`)
- **Nota:** "Información agregada automáticamente desde [fuente]. Resumen generado con IA."
- **Disclaimer:** en footer del sitio

### 2.5 Deduplicación

- Guardar `id` de WorldNews en Sanity como campo `worldNewsId`
- Antes de publicar, verificar si `worldNewsId` ya existe en Sanity
- Si existe, skip (no duplicar)

### 2.6 Frecuencia

- **Cron job:** 2 veces al día (8:00 y 20:00 UTC)
- **Script:** `/home/openclaw/openclaw-projects/espenege/scripts/news-fetcher.ts`
- **Logs:** guardar último fetch en `/home/openclaw/openclaw-projects/espenege/logs/`

---

## 3. Podcast Integration (Anchor FM RSS)

### 3.1 Source

- Variable: `ANCHOR_FM_RSS_URL` en `.env.local`
- Feed RSS estándar de Anchor/Anchorage

### 3.2 Data a extraer

- `title` → título del episodio
- `description` → descripción
- `pubDate` → fecha de publicación
- `enclosure url` → link al audio (MP3)
- `duration` → duración
- `itunes:image` → carátula

### 3.3 Implementación

- Componente `PodcastWidget` en Next.js
- Fetch del RSS server-side (ISR con revalidate cada hora)
- Render como lista de episodios con player inline

---

## 4. Stack Tecnológico

| Componente | Tecnología |
|------------|------------|
| Portal | Next.js 16 (existente) |
| CMS | Sanity (existente) |
| News Fetcher | Node.js script + TypeScript |
| AI Summarizer | API de IA (a definir — Gerard approves) |
| Podcast Feed | RSS parsing nativo |
| Cron | `cron` de OpenClaw o `systemd timer` |
| Storage | Sanity + logs en filesystem |

---

## 5. Archivos a Crear/Modificar

### Nuevos archivos

```
espenege/
├── scripts/
│   ├── news-fetcher.ts       # Script principal de ingestión
│   ├── categorizer.ts        # Lógica de categorización
│   ├── summarizer.ts         # Resumen con IA
│   └── podcast-fetcher.ts    # Fetch de RSS podcast
├── components/
│   └── podcast/
│       ├── PodcastWidget.tsx
│       ├── EpisodeCard.tsx
│       └── PodcastSection.tsx
└── lib/
    ├── sanity/
    │   └── mutations.ts      # Mutations para crear artículos
    └── rss/
        └── parser.ts         # RSS parser
```

### Modificar

- `src/sanity/schemas/article.ts` — añadir `worldNewsId`, `originalUrl`, `originalAuthor`
- `src/lib/dal.ts` — añadir función para fetch podcast episodes
- `src/app/page.tsx` — integrar PodcastSection
- `.env.example` — documentar `ANCHOR_FM_RSS_URL`

---

## 6. Flujo de Trabajo

### News Fetcher (detallado)

```
1. Fetch WorldNews API (últimas 20 noticias, source_country=cl)
2. Para cada noticia:
   a. Verificar worldNewsId no existe en Sanity
   b. Clasificar categoría (keyword-based)
   c. Generar resumen con IA (2-3 párrafos)
   d. Crear documento en Sanity:
      - title
      - slug (from id)
      - excerpt (resumen IA)
      - body (text original + nota de crédito)
      - category
      - publishedAt
      - mainImage (url de image)
      - worldNewsId
      - originalUrl
      - originalAuthor
   e. Log: "Published: <title> → <category>"
3. Trigger Sanity revalidate webhook (si está configurado)
4. Reportar summary: X publicadas, Y saltadas (duplicadas)
```

### Podcast Fetcher

```
1. Fetch ANCHOR_FM_RSS_URL
2. Parse RSS
3. Devolver lista de episodios (para usar en componente)
4. No guardar en Sanity — usar directamente en el componente
```

---

## 7. Categorías del Portal

| Slug | Nombre | Fuente |
|------|--------|--------|
| `nacional` | Nacional | Automatizado (WorldNews + keywords Chile) |
| `internacional` | Internacional | Automatizado (WorldNews, no match nacional) |
| `deportiva` | Deportiva | Automatizado (WorldNews + keywords sports) |
| `electoral` | Electoral | **Manual** |
| `popurri` | Popurrí | **Manual** |
| `no-somos-nada` | No Somos Nada | **Manual** |

---

## 8. Disclaimer y Legal

En el footer del sitio:

> "Las noticias publicadas en SPNG Media son agregadas automáticamente desde fuentes públicas y resúmidas con inteligencia artificial. Todo el contenido conserva los créditos, autores y links a las fuentes originales. SPNG Media no se responsibiliza del contenido de terceros."

---

## 9. Cron Setup

```bash
# News fetcher — 8:00 y 20:00 UTC
0 8,20 * * * cd /home/openclaw/openclaw-projects/espenege && npx ts-node scripts/news-fetcher.ts >> logs/news-fetcher.log 2>&1

# Podcast — cada hora (ISR alternativo)
0 * * * * cd /home/openclaw/openclaw-projects/espenege && npx ts-node scripts/podcast-fetcher.ts >> logs/podcast-fetcher.log 2>&1
```

---

## 10. Pendientes / Decisiones

| # | Tema | Estado |
|---|------|--------|
| 1 | IA summarizer — ¿qué API usar? | ⏳ Gerard decide |
| 2 | ANCHOR_FM_RSS_URL — valor pendiente | ⏳ Gerard agrega al .env.local |
| 3 | ¿Scraping de RSS chilenos adicionales como fallback? | ⏳ Pendiente |
| 4 | ¿Imágenes — usar las del API o generar placeholder? | ⏳ Pendiente |
| 5 | ¿Revalidation webhook de Sanity activar? | ⏳ Pendiente |

---

## 11. Empezar

**Orden de implementación:**

1. ✅ Script `news-fetcher.ts` (básico, sin IA)
2. ✅ Lógica `categorizer.ts`
3. ✅ Mutations en Sanity
4. ⏳ Componente `PodcastWidget`
5. ⏳ Integración IA summarizer
6. ⏳ RSS fallback sources
7. ⏳ Setup cron jobs

**Empezamos por el script de news-fetcher.** 🚀
