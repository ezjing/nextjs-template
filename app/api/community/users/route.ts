import { NextResponse } from 'next/server';

import {
  MemberServiceError,
  createMemberWithFcm,
  getMembers,
} from '@/entities/member/model/memberService';
import { AUTH_CD } from '@/entities/member/model/memberTypes';

export async function GET(request: Request) {
  try {
    const authCd = new URL(request.url).searchParams.get('authCd') ?? AUTH_CD.TEST;
    const members = await getMembers(authCd);
    return NextResponse.json(members);
  } catch (error) {
    if (error instanceof MemberServiceError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    console.error('[GET /api/community/users]', error);
    return NextResponse.json({ message: '회원 목록 조회에 실패했습니다.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await createMemberWithFcm(body);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof MemberServiceError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    console.error('[POST /api/community/users]', error);
    return NextResponse.json({ message: '회원 등록에 실패했습니다.' }, { status: 500 });
  }
}
