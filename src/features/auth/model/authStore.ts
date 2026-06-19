import { create } from 'zustand';

import type { User } from '@/entities/user/model/userTypes';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

/**
 * 로그인 사용자 전역 상태 (Zustand)
 *
 * @example
 * const user = useAuthStore((s) => s.user);
 * const setUser = useAuthStore((s) => s.setUser);
 */
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  clearUser: () => set({ user: null, isAuthenticated: false }),
}));
