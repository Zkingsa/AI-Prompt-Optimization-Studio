import { create } from "zustand";

interface PromptStoreStoreState {
  // TODO: define state shape
  isInitialized: boolean;
}

interface PromptStoreStoreActions {
  initialize: () => void;
}

export const usePromptStoreStore = create<PromptStoreStoreState & PromptStoreStoreActions>((set) => ({
  isInitialized: false,
  initialize: () => set({ isInitialized: true }),
}));
