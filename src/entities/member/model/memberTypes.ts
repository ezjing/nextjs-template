import type { MemberFcm } from './memberFcmTypes';

export const AUTH_CD = {
  BUSINESS_OWNER: 'BUSINESS_OWNER',
  HEAD_MANAGER: 'HEAD_MANAGER',
  EMPLOYEE: 'EMPLOYEE',
  TEST: 'TEST',
} as const;

export type AuthCd = (typeof AUTH_CD)[keyof typeof AUTH_CD];

export const AUTH_CD_LIST: AuthCd[] = [
  AUTH_CD.BUSINESS_OWNER,
  AUTH_CD.HEAD_MANAGER,
  AUTH_CD.EMPLOYEE,
  AUTH_CD.TEST,
];

export const AUTH_CD_OPTIONS: { value: AuthCd; label: string }[] = [
  { value: AUTH_CD.BUSINESS_OWNER, label: '총괄관리자' },
  { value: AUTH_CD.HEAD_MANAGER, label: '관리자' },
  { value: AUTH_CD.EMPLOYEE, label: '근로자' },
  { value: AUTH_CD.TEST, label: '테스트' },
];

/** TB_BS_MEMBER 테이블 Row 타입 (민감 컬럼 제외: PW, REFRESH_TOKEN, FCM_TOKEN, PHOTO, SIGN) */
export interface Member {
  coCd: string;
  id: string;
  name: string;
  employeeNo: string | null;
  tel: string | null;
  birth: string | null;
  nation: string | null;
  bloodType: string | null;
  address: string | null;
  authCd: string | null;
  custCd: string | null;
  useYn: string;
  position: string | null;
  depCd: string | null;
  deleteYn: string;
  rank: string | null;
  tbmYn: string | null;
  approvalYn: string | null;
}

/** 회원 등록 입력 타입 (pw 포함) */
export interface MemberCreateInput {
  coCd: string;
  id: string;
  name: string;
  pw: string;
  employeeNo?: string;
  tel?: string;
  depCd?: string;
  position?: string;
  rank?: string;
  authCd?: string;
  custCd?: string;
  useYn: string;
  tbmYn?: string;
  approvalYn?: string;
}

/** 회원 등록 API 응답 (저장 + 등록 직후 FCM 토큰 조회 결과를 한 번에 반환) */
export interface MemberCreateResult {
  message: string;
  memberId: string;
  fcmTokens: MemberFcm[];
}

/** 회원 수정 입력 타입 (id/coCd는 PK이므로 변경 불가) */
export interface MemberUpdateInput {
  name?: string;
  employeeNo?: string;
  tel?: string;
  depCd?: string;
  position?: string;
  rank?: string;
  authCd?: string;
  custCd?: string;
  useYn?: string;
  tbmYn?: string;
  approvalYn?: string;
}
