import { create } from "zustand";
import type { User } from "../lib/types";

interface UserStore {
  currentUser: User | null;
  setCurrentUser: (currentUser: User | null) => void;
  getCurrentUser: () => User | null;
}

export const useUserStore = create<UserStore>((set, get) => ({
  currentUser: null,
  setCurrentUser: (currentUser) => set({ currentUser }),
  getCurrentUser: () => get().currentUser,
}));
