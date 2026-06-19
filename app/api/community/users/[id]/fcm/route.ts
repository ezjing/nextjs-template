import type { RowDataPacket } from 'mysql2';
import { NextResponse } from 'next/server';

import type { MemberFcm } from '@/entities/member/model/memberFcmTypes';
import pool from '@/shared/lib/db';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const [rows] = await pool.query<RowDataPacket[]>(
      `
      SELECT
        CO_CD AS coCd,
        ID AS id,
        DEVICE_TYPE AS deviceType,
        FCM_TOKEN AS fcmToken,
        DATE_FORMAT(CREATE_DATE, '%Y-%m-%d %H:%i:%s') AS createDate,
        DATE_FORMAT(UPDATE_DATE, '%Y-%m-%d %H:%i:%s') AS updateDate
      FROM TB_BS_MEMBER_FCM
      WHERE ID = ?
      ORDER BY CREATE_DATE DESC
      `,
      [id],
    );

    return NextResponse.json(rows as MemberFcm[]);
  } catch (error) {
    console.error('[GET /api/community/users/[id]/fcm]', error);
    return NextResponse.json({ message: 'FCM 토큰 조회에 실패했습니다.' }, { status: 500 });
  }
}
