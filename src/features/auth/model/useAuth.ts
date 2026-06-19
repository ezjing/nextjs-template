'use client';

import { useSelector } from 'react-redux';

import type { AuthState } from './authSlice';

export function useAuth() {
  const user = useSelector((state: { auth: AuthState }) => state.auth.user);
  const isAuthenticated = useSelector((state: { auth: AuthState }) => state.auth.isAuthenticated);
  return { user, isAuthenticated };
}
