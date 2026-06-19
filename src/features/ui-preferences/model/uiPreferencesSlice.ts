import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type Theme = 'light' | 'dark';

export interface UiPreferencesState {
  theme: Theme;
  isSidebarOpen: boolean;
}

const initialState: UiPreferencesState = {
  theme: 'light',
  isSidebarOpen: true,
};

const uiPreferencesSlice = createSlice({
  name: 'uiPreferences',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
    toggleSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSidebarOpen(state, action: PayloadAction<boolean>) {
      state.isSidebarOpen = action.payload;
    },
  },
});

export const { setTheme, toggleSidebar, setSidebarOpen } = uiPreferencesSlice.actions;
export default uiPreferencesSlice.reducer;
