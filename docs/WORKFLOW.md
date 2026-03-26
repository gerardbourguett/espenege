# SPNG Media — Workflow Policy

## Índice
1. [Estructura de Ramas](#estructura-de-ramas)
2. [Commits](#commits)
3. [Issues y Features](#issues-y-features)
4. [Flujo a Producción](#flujo-a-producción)
5. [Sanity CMS](#sanity-cms)
6. [Servidor](#servidor)

---

## Estructura de Ramas

```
main          ← Producción (Vercel Production)
  ↑
develop       ← Integración (Vercel Preview)
  ↑
feature/*     ← Features nuevas
  ↑
fix/*         ← Bug fixes
  ↑
hotfix/*      ← Urgentes en producción
  ↑
release/*     ← Preparación de release
```

| Rama | Propósito | Deploy |
|------|-----------|--------|
| `main` | Código producción-ready | Vercel Production |
| `develop` | Integración de features | Vercel Preview |
| `feature/*` | Nuevas funcionalidades | — |
| `fix/*` | Bug fixes | — |
| `hotfix/*` | Urgencias producción | Vercel Production |
| `release/*` | Preparar release vX.Y.Z | — |

---

## Commits

### Formato: Conventional Commits

```
<tipo>(<ámbito>): <descripción>

[tipo可选]
feat     → Nueva funcionalidad
fix      → Bug fix
refactor → Refactorización (sin cambio de funcionalidad)
chore    → Mantenimiento, dependencias, config
docs     → Documentación
style    → Estilo (formato, indentación, etc)
test     → Tests
perf     → Mejora de performance
ci       → CI/CD

[ejemplos]
feat(news): add worldnews API fetcher
fix(categorizer): correct SAG keyword matching for Chile
docs(workflow): add commit and release policy
chore(deps): update sanity to v5.8.1
refactor(sanity): extract mutations to separate module
```

### Reglas

1. **Mensaje claro y descriptivo** — Describe *qué* y *por qué*, no *cómo*
2. **Una preocupación por commit** — No mezclar refactors con features
3. **Línea subject ≤ 72 caracteres**
4. **Body es opcional** — Usar para explicar *por qué* si no es obvio
5. **NO commitear secretos** — `.env`, tokens, keys → `.gitignore`

### Ejemplo de commit completo

```
feat(news-fetcher): add WorldNews API integration

- Fetch articles from WorldNews API (source_country=cl, language=es)
- Add keyword-based categorizer (deporte/nacional/internacional)
- Integrate OpenRouter for AI summarization
- Add Sanity CMS mutations for article creation

Closes #12
```

---

## Issues y Features

### Crear Issue

Antes de codear, crear issue con:

```
Título: Descripción corta del problema o feature

Descripción:
- Contexto: ¿Por qué es necesario?
- Criterios de aceptación: ¿Cómo sabemos que está listo?
- Notas adicionales: screenshots, links, consideraciones

Labels:
- `feature` | `bug` | `improvement` | `question`
- `priority: high` | `priority: medium` | `priority: low`
- `area: frontend` | `area: backend` | `area: infra` | `area: content`
```

### Ciclo de vida de un Feature

```
1. Issue creado con descripción completa
2. Asignar a alguien (o self-assign)
3. Crear rama desde develop: git checkout -b feature/ticket-descripcion
4. Desarrollar + commits frecuentes
5. Push + abrir PR a develop
6. Review: build passing + lint passing
7. Squash-merge a develop
8. Deploy automático a Vercel Preview
9. Testing en Preview
10. Merge develop → main cuando está listo para producción
```

### Pull Request Checklist

- [ ] `npm run build` pasa sin errores
- [ ] `npm run lint` pasa sin errores
- [ ] No hay `.env` ni secretos en el diff
- [ ] Documentación actualizada si aplica
- [ ] Responsive probado (mobile + desktop)
- [ ] Tests si corresponde

---

## Flujo a Producción

### Environmentos

| Entorno | URL | Trigger |
|---------|-----|---------|
| Development local | `localhost:3000` | `npm run dev` |
| Preview | Vercel Preview URL | Push a cualquier branch |
| Production | spng.stream | Merge a `main` |

### Pasos para subir a producción

```
1. Asegurar que develop está listo:
   - Todos los features mergeados
   - Tests pasan en Preview
   - No hay errores en Sanity Studio

2. Crear rama de release:
   git checkout develop
   git checkout -b release/vX.Y.Z

3. Actualizar versión en package.json si aplica

4. Hacer PR de release a main:
   - Título: "Release vX.Y.Z"
   - Lista de cambios
   - Asignar reviewers

5. Approval + merge squash a main
   → Deploy automático a producción

6. Merge main → develop:
   git checkout develop
   git merge main

7. Eliminar rama de release:
   git branch -d release/vX.Y.Z
```

### Hotfix (urgencias en producción)

```
1. Crear hotfix desde main:
   git checkout main
   git checkout -b hotfix/descripcion

2. Fix urgente + commit con mensaje claro

3. PR a main (con review mínimo)

4. Merge → deploy automático

5. Merge main → develop para sincronizar
```

---

## Sanity CMS

### Datos públicos vs privados

| Dato | Público | Privado |
|------|---------|---------|
| Artículos | ✅ | — |
| Categorías | ✅ | — |
| Autores | ✅ | — |
| Site Settings | ✅ | — |
| Tokens API | — | ⚠️ Solo server-side |
| Webhook secrets | — | ⚠️ Nunca commitear |

### Variables de entorno (nunca commitear)

```bash
# .env.local (NUNCA commitear)
NEXT_PUBLIC_SANITY_PROJECT_ID=xxx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk...        # Server-only
SANITY_REVALIDATE_SECRET=xxx  # Server-only
OPENWEATHERMAP_API_KEY=xxx
RAPIDAPI_KEY=xxx
RESEND_API_KEY=xxx
WORLDNEWS_API_KEY=xxx
OPEN_AI_COMPATIBLE_API_KEY=xxx
ANCHOR_FM_RSS_URL=xxx
```

### News Fetcher (automático)

El script `scripts/news-fetcher.ts` corre via cron:
- **8:00 UTC** — Fetch 20 artículos de WorldNews API
- **20:00 UTC** — Fetch 20 artículos de WorldNews API

Para ejecutar manualmente:
```bash
cd /home/openclaw/openclaw-projects/espenege
npx tsx scripts/news-fetcher.ts
```

### Disclaimer obligatorio

Todo artículo agregado automáticamente debe mantener:
- Crédito al autor original (`originalAuthor`)
- Link a fuente original (`originalUrl`)
- Nota: "Contenido agregado automáticamente desde [fuente]"

---

## Servidor

### Acceso SSH

```bash
ssh openclaw@45.63.74.140
```

### Reiniciar Next.js

```bash
# Si el servidor no está corriendo:
cd /home/openclaw/openclaw-projects/espenege
npm run dev

# Si está corriendo y quieres reiniciar:
pkill -f "next dev"
npm run dev
```

### Logs

```bash
# Últimas líneas del server:
cd /home/openclaw/openclaw-projects/espenege
tail -n 50 logs/news-fetcher.log
tail -n 50 logs/podcast-fetcher.log
```

### Respaldo de .env

El archivo `.env.local` contiene todas las claves. Si se pierde:
1. Regenerar claves en los servicios correspondientes
2. Actualizar `.env.local` con nuevos valores

---

## Resumen Rápido

```
Nueva feature:
  issue → feature/* → PR a develop → squash merge → Vercel Preview → merge develop → main → producción

Bug fix:
  issue → fix/* → PR a develop → squash merge → Vercel Preview → merge develop → main → producción

Hotfix:
  hotfix/* → PR directo a main → merge → producción → sync a develop
```

---

_Last updated: 2026-03-26_
