import { create } from 'zustand';

type AuthUser = {
  email: string;
};

type AuthStore = {
  user: AuthUser | null;
  login: (email: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,

  login: (email: string) => {
    set({ user: { email } });
  },

  logout: () => {
    set({ user: null });
  },
}));