'use client';

import { useQuery } from '@tanstack/react-query';

import { memberApi } from '@/entities/member/api/memberApi';
import type { AuthCd } from '@/entities/member/model/memberTypes';
import { QUERY_KEYS } from '@/shared/constants/queryKeys';

export function useMemberListQuery(authCd: AuthCd) {
  return useQuery({
    queryKey: [QUERY_KEYS.MEMBER_LIST, authCd],
    queryFn: () => memberApi.getAll(authCd),
  });
}
