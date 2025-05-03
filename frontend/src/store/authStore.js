import { create } from "zustand";
import { authService } from "../services/authService";

const useAuthStore = create((set, get) => ({
  // State
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  verificationUserId: null,

  // Actions
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setError: (error) => set({ error }),
  setLoading: (isLoading) => set({ isLoading }),

  // Register user
  registerUser: async (userData) => {
    try {
      set({ isLoading: true, error: null });
      const response = await authService.register(userData);
      set({ verificationUserId: response.userId });
      return response;
    } catch (error) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Login user
  loginUser: async (credentials) => {
    try {
      set({ isLoading: true, error: null });
      const { token, user } = await authService.login(credentials);
      set({ user, token, isAuthenticated: true });
      return user;
    } catch (error) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Verify email
  verifyEmail: async (code) => {
    try {
      set({ isLoading: true, error: null });
      const { verificationUserId } = get();
      const response = await authService.verifyEmail({
        userId: verificationUserId,
        code,
      });
      set({ user: response.user, isAuthenticated: true });
      return response;
    } catch (error) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Logout user
  logout: () => {
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      verificationUserId: null,
    });
  },

  // Check authentication status
  checkAuth: async () => {
    try {
      const { token } = get();
      if (token) {
        const user = await authService.getCurrentUser();
        set({ user, isAuthenticated: true });
      }
    } catch (error) {
      set({ user: null, token: null, isAuthenticated: false });
    }
  },
}));

export default useAuthStore;
