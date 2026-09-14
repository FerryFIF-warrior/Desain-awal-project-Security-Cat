import { create } from 'zustand';

// State UI murni (client). TIDAK menyimpan data API apa pun —
// data server hanya hidup di TanStack Query (cache hook).
export type SelectedCategory = 'semua' | 'aktif' | 'selesai';
export type ThemeMode = 'dark' | 'light';

interface UIState {
  isSidebarOpen: boolean;
  selectedCategory: SelectedCategory;
  themeMode: ThemeMode;
  setSelectedCategory: (c: SelectedCategory) => void;
  toggleSidebar: () => void;
  toggleTheme: () => void;
}

export const useUIStore = create<UIState>()((set) => ({
  isSidebarOpen: true,
  selectedCategory: 'semua',
  themeMode: 'dark',
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),
  toggleTheme: () =>
    set((s) => ({ themeMode: s.themeMode === 'dark' ? 'light' : 'dark' })),
}));
