import { create } from "zustand";

interface AnalyticsStoreStoreState {
  // TODO: define state shape
  isInitialized: boolean;
}

interface AnalyticsStoreStoreActions {
  initialize: () => void;
}

export const useAnalyticsStoreStore = create<AnalyticsStoreStoreState & AnalyticsStoreStoreActions>((set) => ({
  isInitialized: false,
  initialize: () => set({ isInitialized: true }),
}));
