import { create } from "zustand";
import type { Match, SportType } from "@/types/sports";

interface SportsStore {
  football: Match[];
  tennis: Match[];
  basketball: Match[];
  isLoading: boolean;
  error: string | null;
  fetchMatches: (sport: SportType) => Promise<void>;
  fetchAllSports: () => Promise<void>;
}

const sportEndpointMap: Partial<Record<SportType, string>> = {
  futbol: "/api/sports/football",
  tenis: "/api/sports/tennis",
  basquetbol: "/api/sports/basketball",
};

export const useSportsStore = create<SportsStore>((set, get) => ({
  football: [],
  tennis: [],
  basketball: [],
  isLoading: false,
  error: null,

  fetchMatches: async (sport: SportType) => {
    const endpoint = sportEndpointMap[sport];
    if (!endpoint) return;

    set({ isLoading: true, error: null });
    try {
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error(`Failed to fetch ${sport}`);
      const data: Match[] = await res.json();

      const stateKey =
        sport === "futbol"
          ? "football"
          : sport === "tenis"
            ? "tennis"
            : "basketball";

      set({ [stateKey]: data, isLoading: false } as Partial<SportsStore>);
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Error desconocido",
        isLoading: false,
      });
    }
  },

  fetchAllSports: async () => {
    const store = get();
    await Promise.all([
      store.fetchMatches("futbol"),
      store.fetchMatches("tenis"),
      store.fetchMatches("basquetbol"),
    ]);
  },
}));
