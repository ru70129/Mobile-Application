import { create } from 'zustand';

// Authentication store using Zustand
export const useAuthStore = create((set, get) => ({
  user: null,

  login: (user) => set({ user }),

  logout: () => set({ user: null }),

  initializeAuth: () => {
    // No-op for simple implementation
  },

  get isAuthenticated() {
    return get().user !== null;
  },
}));
