import client from '@/shared/api/client';

import type { AuthCd, Member, MemberCreateInput, MemberUpdateInput } from '../model/memberTypes';

export const memberApi = {
  getAll: (authCd: AuthCd) =>
    client.get<Member[]>('/api/community/users', { params: { authCd } }).then((res) => res.data),
  create: (data: MemberCreateInput) => client.post('/api/community/users', data),
  update: (id: string, data: MemberUpdateInput) => client.put(`/api/community/users/${id}`, data),
  remove: (id: string) => client.delete(`/api/community/users/${id}`),
};
