import { create } from "zustand";

interface SettingsStoreStoreState {
  // TODO: define state shape
  isInitialized: boolean;
}

interface SettingsStoreStoreActions {
  initialize: () => void;
}

export const useSettingsStoreStore = create<SettingsStoreStoreState & SettingsStoreStoreActions>((set) => ({
  isInitialized: false,
  initialize: () => set({ isInitialized: true }),
}));
