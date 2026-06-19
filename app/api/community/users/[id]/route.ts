import { NextResponse } from 'next/server';

import type { MemberUpdateInput } from '@/entities/member/model/memberTypes';
import pool from '@/shared/lib/db';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body: MemberUpdateInput = await request.json();
    const {
      name,
      employeeNo,
      tel,
      depCd,
      position,
      rank,
      authCd,
      custCd,
      useYn,
      tbmYn,
      approvalYn,
    } = body;

    const [result] = await pool.execute<import('mysql2').ResultSetHeader>(
      `UPDATE TB_BS_MEMBER
       SET
         NAME = COALESCE(?, NAME),
         EMPLOYEE_NO = ?,
         TEL = ?,
         DEP_CD = ?,
         POSITION = ?,
         RANK = ?,
         AUTH_CD = ?,
         CUST_CD = ?,
         USE_YN = COALESCE(?, USE_YN),
         TBM_YN = ?,
         APPROVAL_YN = ?
       WHERE ID = ? AND DELETE_YN = 'N'`,
      [
        name ?? null,
        employeeNo ?? null,
        tel ?? null,
        depCd ?? null,
        position ?? null,
        rank ?? null,
        authCd ?? null,
        custCd ?? null,
        useYn ?? null,
        tbmYn ?? null,
        approvalYn ?? null,
        id,
      ],
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: '해당 회원을 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json({ message: '회원 정보가 수정되었습니다.' });
  } catch (error) {
    console.error('[PUT /api/community/users/[id]]', error);
    return NextResponse.json({ message: '회원 수정에 실패했습니다.' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const [result] = await pool.execute<import('mysql2').ResultSetHeader>(
      `UPDATE TB_BS_MEMBER SET DELETE_YN = 'Y' WHERE ID = ? AND DELETE_YN = 'N'`,
      [id],
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: '해당 회원을 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json({ message: '회원이 삭제되었습니다.' });
  } catch (error) {
    console.error('[DELETE /api/community/users/[id]]', error);
    return NextResponse.json({ message: '회원 삭제에 실패했습니다.' }, { status: 500 });
  }
}
