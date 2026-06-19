'use client';

import { useAuthStore } from './authStore';

export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return { user, isAuthenticated };
}
