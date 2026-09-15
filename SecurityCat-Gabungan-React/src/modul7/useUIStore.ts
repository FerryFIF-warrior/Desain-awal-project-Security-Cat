import { create } from "zustand";

export type Category = "semua" | "aktif" | "selesai";
export type ThemeMode = "dark" | "light";

export interface UIState {
  isSidebarOpen: boolean;
  selectedCategory: Category;
  themeMode: ThemeMode;
  setSelectedCategory: (selectedCategory: Category) => void;
  toggleSidebar: () => void;
  toggleTheme: () => void;
}

// Asli dari Modul 7: src/store/useUIStore.ts
// State UI murni (client). TIDAK menyimpan data API apa pun —
// data server hanya hidup di TanStack Query (cache hook).
export const useUIStore = create<UIState>()((set) => ({
  isSidebarOpen: true,
  selectedCategory: "semua",
  themeMode: "dark",
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),
  toggleTheme: () => set((s) => ({ themeMode: s.themeMode === "dark" ? "light" : "dark" })),
}));
