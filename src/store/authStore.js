import { create } from 'zustand';

// Authentication store using Zustand
export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  initializeAuth: async () => {
    // To be implemented
  },

  login: async (credentials) => {
    // To be implemented
  },

  signup: async (userData) => {
    // To be implemented
  },

  logout: () => {
    // To be implemented
  },

  resetPassword: async (email) => {
    // To be implemented
  },
}));
