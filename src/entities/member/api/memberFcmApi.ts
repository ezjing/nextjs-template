import client from '@/shared/api/client';

import type { MemberFcm } from '../model/memberFcmTypes';

export const memberFcmApi = {
  getByMemberId: (id: string) =>
    client.get<MemberFcm[]>(`/api/community/users/${id}/fcm`).then((res) => res.data),
};
