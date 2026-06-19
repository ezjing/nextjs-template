import { create } from 'zustand';

export type Theme = 'light' | 'dark';

export interface UiPreferencesState {
  theme: Theme;
  isSidebarOpen: boolean;
  setTheme: (theme: Theme) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (isSidebarOpen: boolean) => void;
}

/**
 * 테마·사이드바 등 UI 환경설정 전역 상태 (Zustand)
 *
 * @example
 * const theme = useUiPreferencesStore((s) => s.theme);
 * const toggleSidebar = useUiPreferencesStore((s) => s.toggleSidebar);
 */
export const useUiPreferencesStore = create<UiPreferencesState>((set) => ({
  theme: 'light',
  isSidebarOpen: true,
  setTheme: (theme) => set({ theme }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (isSidebarOpen) => set({ isSidebarOpen }),
}));
