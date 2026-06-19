/** TB_BS_MEMBER_FCM 테이블 Row 타입 */
export interface MemberFcm {
  coCd: string;
  id: string;
  deviceType: string | null;
  fcmToken: string | null;
  createDate: string | null;
  updateDate: string | null;
}
