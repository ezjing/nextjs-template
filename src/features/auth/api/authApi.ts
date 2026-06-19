import type { User } from '@/entities/user/model/userTypes';
import client from '@/shared/api/client';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
}

export const authApi = {
  login: (credentials: LoginCredentials) => client.post<LoginResponse>('/auth/login', credentials),
  logout: () => client.post('/auth/logout'),
};
