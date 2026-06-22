'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { memberApi } from '@/entities/member/api/memberApi';
import type { MemberCreateInput, MemberUpdateInput } from '@/entities/member/model/memberTypes';
import { QUERY_KEYS } from '@/shared/constants/queryKeys';

function useInvalidateMembers() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MEMBER_LIST] });
}

export function useCreateMember() {
  const queryClient = useQueryClient();
  const invalidate = useInvalidateMembers();
  return useMutation({
    mutationFn: (data: MemberCreateInput) => memberApi.create(data),
    onSuccess: (result) => {
      invalidate();
      // 서버가 등록 응답에 함께 내려준 FCM 토큰을 재조회 없이 캐시에 주입
      queryClient.setQueryData([QUERY_KEYS.MEMBER_FCM_LIST, result.memberId], result.fcmTokens);
    },
  });
}

export function useUpdateMember() {
  const invalidate = useInvalidateMembers();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: MemberUpdateInput }) =>
      memberApi.update(id, data),
    onSuccess: invalidate,
  });
}

export function useRemoveMember() {
  const invalidate = useInvalidateMembers();
  return useMutation({
    mutationFn: (id: string) => memberApi.remove(id),
    onSuccess: invalidate,
  });
}
