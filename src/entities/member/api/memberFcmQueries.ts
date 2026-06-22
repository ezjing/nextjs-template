import type { RowDataPacket } from 'mysql2';

import pool from '@/shared/lib/db';

import type { MemberFcm } from '../model/memberFcmTypes';

export async function findFcmByMemberId(id: string): Promise<MemberFcm[]> {
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

  return rows as MemberFcm[];
}
