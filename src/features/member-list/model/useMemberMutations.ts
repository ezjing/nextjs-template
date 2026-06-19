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
  const invalidate = useInvalidateMembers();
  return useMutation({
    mutationFn: (data: MemberCreateInput) => memberApi.create(data),
    onSuccess: invalidate,
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
