import { findFcmByMemberId } from '../api/memberFcmQueries';
import {
  findMembersByAuthCd,
  insertMember,
  softDeleteMember,
  updateMember,
} from '../api/memberQueries';

import type { MemberFcm } from './memberFcmTypes';
import {
  AUTH_CD_LIST,
  type AuthCd,
  type Member,
  type MemberCreateInput,
  type MemberCreateResult,
  type MemberUpdateInput,
} from './memberTypes';

/** Service 단계에서 발생하는, HTTP 상태로 변환 가능한 도메인 에러 */
export class MemberServiceError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = 'MemberServiceError';
  }
}

function assertAuthCd(value: string): asserts value is AuthCd {
  if (!AUTH_CD_LIST.includes(value as AuthCd)) {
    throw new MemberServiceError(`authCd는 ${AUTH_CD_LIST.join(', ')} 중 하나여야 합니다.`, 400);
  }
}

export async function getMembers(authCdParam: string): Promise<Member[]> {
  assertAuthCd(authCdParam);
  return findMembersByAuthCd(authCdParam);
}

/**
 * 회원을 저장한 뒤, 등록 직후 FCM 토큰까지 한 번에 조회해 반환한다.
 * (클라이언트-서버 통신을 1회로 줄이기 위한 .NET Service 단계 대응)
 */
export async function createMemberWithFcm(input: MemberCreateInput): Promise<MemberCreateResult> {
  if (!input.coCd || !input.id || !input.name || !input.pw) {
    throw new MemberServiceError('coCd, id, name, pw는 필수 항목입니다.', 400);
  }

  await insertMember(input);
  const fcmTokens = await findFcmByMemberId(input.id);

  return {
    message: '회원이 등록되었습니다.',
    memberId: input.id,
    fcmTokens,
  };
}

export async function modifyMember(
  id: string,
  input: MemberUpdateInput,
): Promise<{ message: string }> {
  const affectedRows = await updateMember(id, input);

  if (affectedRows === 0) {
    throw new MemberServiceError('해당 회원을 찾을 수 없습니다.', 404);
  }

  return { message: '회원 정보가 수정되었습니다.' };
}

export async function removeMember(id: string): Promise<{ message: string }> {
  const affectedRows = await softDeleteMember(id);

  if (affectedRows === 0) {
    throw new MemberServiceError('해당 회원을 찾을 수 없습니다.', 404);
  }

  return { message: '회원이 삭제되었습니다.' };
}

export async function getMemberFcmTokens(id: string): Promise<MemberFcm[]> {
  return findFcmByMemberId(id);
}
