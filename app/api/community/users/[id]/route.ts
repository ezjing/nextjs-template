import { NextResponse } from 'next/server';

import {
  MemberServiceError,
  modifyMember,
  removeMember,
} from '@/entities/member/model/memberService';
import type { MemberUpdateInput } from '@/entities/member/model/memberTypes';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body: MemberUpdateInput = await request.json();
    const result = await modifyMember(id, body);
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof MemberServiceError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    console.error('[PUT /api/community/users/[id]]', error);
    return NextResponse.json({ message: '회원 수정에 실패했습니다.' }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const result = await removeMember(id);
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof MemberServiceError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    console.error('[DELETE /api/community/users/[id]]', error);
    return NextResponse.json({ message: '회원 삭제에 실패했습니다.' }, { status: 500 });
  }
}
