import client from '@/shared/api/client';

import type { User } from '../model/userTypes';

export const userApi = {
  getMe: () => client.get<User>('/users/me'),
};
