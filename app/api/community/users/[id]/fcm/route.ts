import { NextResponse } from 'next/server';

import { getMemberFcmTokens } from '@/entities/member/model/memberService';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const tokens = await getMemberFcmTokens(id);
    return NextResponse.json(tokens);
  } catch (error) {
    console.error('[GET /api/community/users/[id]/fcm]', error);
    return NextResponse.json({ message: 'FCM 토큰 조회에 실패했습니다.' }, { status: 500 });
  }
}
