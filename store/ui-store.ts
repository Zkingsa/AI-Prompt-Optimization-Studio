import { create } from "zustand";

interface UiStoreStoreState {
  // TODO: define state shape
  isInitialized: boolean;
}

interface UiStoreStoreActions {
  initialize: () => void;
}

export const useUiStoreStore = create<UiStoreStoreState & UiStoreStoreActions>((set) => ({
  isInitialized: false,
  initialize: () => set({ isInitialized: true }),
}));
