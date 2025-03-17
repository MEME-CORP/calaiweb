import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    email: string;
    name: string;
  } | null;
  login: (email: string, rememberMe: boolean) => void;
  register: (email: string, name: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      
      login: (email, rememberMe) => {
        // In a real app, this would make an API call to authenticate
        set({
          isAuthenticated: true,
          user: {
            email,
            name: email.split('@')[0], // Use part before @ as placeholder name
          },
        });
      },
      
      register: (email, name) => {
        // In a real app, this would make an API call to register
        set({
          isAuthenticated: true,
          user: {
            email,
            name,
          },
        });
      },
      
      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
        });
      },
    }),
    {
      name: 'nutrition-auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
);

export default useAuthStore;