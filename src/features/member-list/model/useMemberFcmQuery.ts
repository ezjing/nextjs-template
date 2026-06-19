'use client';

import { useQuery } from '@tanstack/react-query';

import { memberFcmApi } from '@/entities/member/api/memberFcmApi';
import { QUERY_KEYS } from '@/shared/constants/queryKeys';

export function useMemberFcmQuery(id: string | null) {
  return useQuery({
    queryKey: [QUERY_KEYS.MEMBER_FCM_LIST, id],
    queryFn: () => memberFcmApi.getByMemberId(id!),
    enabled: !!id,
  });
}
