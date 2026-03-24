import { create } from "zustand";
import type { WorldNewsArticle, WorldNewsSection } from "@/lib/worldnews-api";

// ---------------------------------------------------------------------------
// State shape — per-section slices
// ---------------------------------------------------------------------------

interface SectionSlice {
  articles: WorldNewsArticle[];
  isLoading: boolean;
  error: string | null;
  hasFetched: boolean;
}

function makeEmptySlice(): SectionSlice {
  return { articles: [], isLoading: false, error: null, hasFetched: false };
}

interface WorldNewsState {
  sections: Map<WorldNewsSection, SectionSlice>;
  fetchSection: (section: WorldNewsSection) => Promise<void>;
  getSlice: (section: WorldNewsSection) => SectionSlice;
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const useWorldNewsStore = create<WorldNewsState>((set, get) => ({
  sections: new Map(),

  getSlice: (section) => get().sections.get(section) ?? makeEmptySlice(),

  fetchSection: async (section) => {
    const existing = get().sections.get(section);

    // Guard: already fetched (success or error) — don't retry within this session
    if (existing?.hasFetched) return;

    // Set loading state for this section
    set((state) => {
      const next = new Map(state.sections);
      next.set(section, {
        ...(next.get(section) ?? makeEmptySlice()),
        isLoading: true,
        error: null,
      });
      return { sections: next };
    });

    try {
      const res = await fetch(`/api/world-news?section=${section}`);
      if (!res.ok) throw new Error("Error al cargar noticias");
      const data: WorldNewsArticle[] = await res.json();

      set((state) => {
        const next = new Map(state.sections);
        next.set(section, {
          articles: data,
          isLoading: false,
          error: null,
          hasFetched: true,
        });
        return { sections: next };
      });
    } catch (error) {
      set((state) => {
        const next = new Map(state.sections);
        next.set(section, {
          articles: [],
          isLoading: false,
          error:
            error instanceof Error ? error.message : "Error desconocido",
          hasFetched: true,
        });
        return { sections: next };
      });
    }
  },
}));
