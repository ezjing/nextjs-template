import type { RowDataPacket } from 'mysql2';
import { NextResponse } from 'next/server';

import {
  AUTH_CD,
  AUTH_CD_LIST,
  type AuthCd,
  type Member,
  type MemberCreateInput,
} from '@/entities/member/model/memberTypes';
import pool from '@/shared/lib/db';

function isAuthCd(value: string): value is AuthCd {
  return AUTH_CD_LIST.includes(value as AuthCd);
}

export async function GET(request: Request) {
  try {
    const authCd = new URL(request.url).searchParams.get('authCd') ?? AUTH_CD.TEST;

    if (!isAuthCd(authCd)) {
      return NextResponse.json(
        { message: `authCd는 ${AUTH_CD_LIST.join(', ')} 중 하나여야 합니다.` },
        { status: 400 },
      );
    }

    const [rows] = await pool.query<RowDataPacket[]>(
      `
      SELECT
        CO_CD AS coCd,
        ID AS id,
        NAME AS name,
        EMPLOYEE_NO AS employeeNo,
        TEL AS tel,
        BIRTH AS birth,
        NATION AS nation,
        BLOOD_TYPE AS bloodType,
        ADDRESS AS address,
        AUTH_CD AS authCd,
        CUST_CD AS custCd,
        USE_YN AS useYn,
        POSITION AS position,
        DEP_CD AS depCd,
        DELETE_YN AS deleteYn,
        RANK AS rank,
        TBM_YN AS tbmYn,
        APPROVAL_YN AS approvalYn
      FROM TB_BS_MEMBER
      WHERE DELETE_YN = 'N'
      AND AUTH_CD = ?
      ORDER BY NAME ASC
    `,
      [authCd],
    );

    return NextResponse.json(rows as Member[]);
  } catch (error) {
    console.error('[GET /api/community/users]', error);
    return NextResponse.json({ message: '회원 목록 조회에 실패했습니다.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body: MemberCreateInput = await request.json();
    const {
      coCd,
      id,
      name,
      pw,
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

    if (!coCd || !id || !name || !pw) {
      return NextResponse.json(
        { message: 'coCd, id, name, pw는 필수 항목입니다.' },
        { status: 400 },
      );
    }

    await pool.execute(
      `INSERT INTO TB_BS_MEMBER
        (CO_CD, ID, NAME, PW, EMPLOYEE_NO, TEL, DEP_CD, POSITION, RANK, AUTH_CD, CUST_CD, USE_YN, TBM_YN, APPROVAL_YN, DELETE_YN)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'N')`,
      [
        coCd,
        id,
        name,
        pw,
        employeeNo ?? null,
        tel ?? null,
        depCd ?? null,
        position ?? null,
        rank ?? null,
        authCd ?? null,
        custCd ?? null,
        useYn ?? 'Y',
        tbmYn ?? null,
        approvalYn ?? null,
      ],
    );

    return NextResponse.json({ message: '회원이 등록되었습니다.' }, { status: 201 });
  } catch (error) {
    console.error('[POST /api/community/users]', error);
    return NextResponse.json({ message: '회원 등록에 실패했습니다.' }, { status: 500 });
  }
}
