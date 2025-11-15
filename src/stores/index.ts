import supabase from "@/lib/supabase";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types/user.type";

interface AuthStore {
  user: User | null;
  setUser: (newUser: User | null) => void;
  reset: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (newUser: User | null) => set({ user: newUser }),

      reset: async () => {
        await supabase.auth.signOut();

        set({ user: null });
        localStorage.removeItem("auth-storage");
      },
    }),
    { name: "auth-storage", partialize: (state) => ({ user: state.user }) },
  ),
);
