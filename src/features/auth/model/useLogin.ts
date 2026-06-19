'use client';

import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { setUser } from './authSlice';
import { authApi, type LoginCredentials } from '../api/authApi';


export function useLogin() {
  const dispatch = useDispatch();

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      const { data } = await authApi.login(credentials);
      dispatch(setUser(data.user));
    },
    [dispatch],
  );

  return { login };
}
