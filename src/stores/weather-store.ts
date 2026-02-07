import { create } from "zustand";

interface WeatherData {
  city: string;
  temp: number;
  condition: string;
  humidity: number;
  icon: string;
}

interface WeatherStore {
  weather: WeatherData | null;
  isLoading: boolean;
  error: string | null;
  fetchWeather: () => Promise<void>;
}

export const useWeatherStore = create<WeatherStore>((set, get) => ({
  weather: null,
  isLoading: false,
  error: null,
  fetchWeather: async () => {
    // Don't refetch if we already have data
    if (get().weather) return;

    set({ isLoading: true, error: null });
    try {
      const res = await fetch("/api/weather");
      if (!res.ok) throw new Error("Failed to fetch weather");
      const data = await res.json();
      set({ weather: data, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Error desconocido",
        isLoading: false,
      });
    }
  },
}));
