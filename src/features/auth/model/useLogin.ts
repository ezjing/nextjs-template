'use client';

import { useCallback } from 'react';

import { useAuthStore } from './authStore';
import { authApi, type LoginCredentials } from '../api/authApi';

export function useLogin() {
  const setUser = useAuthStore((state) => state.setUser);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      const { data } = await authApi.login(credentials);
      setUser(data.user);
    },
    [setUser],
  );

  return { login };
}
