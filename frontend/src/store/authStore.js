import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '../services/authService';

const useAuthStore = create(
    persist(
        (set, get) => ({
            // State
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            // Actions
            setUser: (user) => set({ user, isAuthenticated: !!user }),
            setError: (error) => set({ error }),
            setLoading: (isLoading) => set({ isLoading }),

            // Register user
            registerUser: async (userData) => {
                try {
                    set({ isLoading: true, error: null });
                    const response = await authService.register(userData);
                    set({ user: response.user, isAuthenticated: true });
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
                    const user = await authService.login(credentials);
                    set({ user, isAuthenticated: true });
                    return user;
                } catch (error) {
                    set({ error: error.message });
                    throw error;
                } finally {
                    set({ isLoading: false });
                }
            },

            // Verify email
            verifyEmail: async (email, code) => {
                try {
                    set({ isLoading: true, error: null });
                    const response = await authService.verifyEmail({ email, code });
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
                authService.logout();
                set({ user: null, isAuthenticated: false });
            },

            // Check authentication status
            checkAuth: async () => {
                try {
                    if (authService.isAuthenticated()) {
                        const user = await authService.getCurrentUser();
                        set({ user, isAuthenticated: true });
                    }
                } catch (error) {
                    set({ user: null, isAuthenticated: false });
                }
            }
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated
            })
        }
    )
);

export default useAuthStore;
