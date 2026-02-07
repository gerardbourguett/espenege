import { create } from "zustand";

interface NewsletterStore {
  isLoading: boolean;
  isSubscribed: boolean;
  error: string | null;
  subscribe: (email: string) => Promise<boolean>;
}

export const useNewsletterStore = create<NewsletterStore>((set) => ({
  isLoading: false,
  isSubscribed: false,
  error: null,
  subscribe: async (email: string) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        set({ error: data.message || "Error al suscribirse", isLoading: false });
        return false;
      }

      set({ isSubscribed: true, isLoading: false });
      return true;
    } catch {
      set({ error: "Error de conexion", isLoading: false });
      return false;
    }
  },
}));
