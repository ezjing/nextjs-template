import type { ResultSetHeader, RowDataPacket } from 'mysql2';

import pool from '@/shared/lib/db';

import type { AuthCd, Member, MemberCreateInput, MemberUpdateInput } from '../model/memberTypes';

const MEMBER_COLUMNS = `
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
`;

export async function findMembersByAuthCd(authCd: AuthCd): Promise<Member[]> {
  const [rows] = await pool.query<RowDataPacket[]>(
    `
    SELECT ${MEMBER_COLUMNS}
    FROM TB_BS_MEMBER
    WHERE DELETE_YN = 'N'
      AND AUTH_CD = ?
    ORDER BY NAME ASC
    `,
    [authCd],
  );

  return rows as Member[];
}

export async function insertMember(input: MemberCreateInput): Promise<void> {
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
  } = input;

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
}

export async function updateMember(id: string, input: MemberUpdateInput): Promise<number> {
  const { name, employeeNo, tel, depCd, position, rank, authCd, custCd, useYn, tbmYn, approvalYn } =
    input;

  const [result] = await pool.execute<ResultSetHeader>(
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

  return result.affectedRows;
}

export async function softDeleteMember(id: string): Promise<number> {
  const [result] = await pool.execute<ResultSetHeader>(
    `UPDATE TB_BS_MEMBER SET DELETE_YN = 'Y' WHERE ID = ? AND DELETE_YN = 'N'`,
    [id],
  );

  return result.affectedRows;
}
