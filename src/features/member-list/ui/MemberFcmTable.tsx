'use client';

import type { MemberFcm } from '@/entities/member/model/memberFcmTypes';
import { Table, type TableColumn } from '@/shared/ui/table/Table';

import { useMemberFcmQuery } from '../model/useMemberFcmQuery';

interface MemberFcmTableProps {
  selectedId: string;
  selectedName?: string;
}

const columns: TableColumn<MemberFcm>[] = [
  { key: 'coCd', header: '회사코드', width: 100 },
  { key: 'id', header: 'ID', width: 120 },
  { key: 'deviceType', header: '기기 유형', width: 100 },
  {
    key: 'fcmToken',
    header: 'FCM 토큰',
    render: (row) => (
      <span className="block max-w-xs truncate font-mono text-xs" title={row.fcmToken ?? ''}>
        {row.fcmToken ?? '-'}
      </span>
    ),
  },
  { key: 'createDate', header: '생성일시', width: 160 },
  { key: 'updateDate', header: '수정일시', width: 160 },
];

export function MemberFcmTable({ selectedId, selectedName }: MemberFcmTableProps) {
  const { data: tokens = [], isLoading, isError, error } = useMemberFcmQuery(selectedId);

  return (
    <div className="mt-8 flex flex-col gap-3">
      <div>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          FCM 토큰
          {selectedName && (
            <span className="ml-2 text-sm font-normal text-slate-500 dark:text-slate-400">
              — {selectedName} ({selectedId})
            </span>
          )}
        </h2>
        <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
          TB_BS_MEMBER_FCM 테이블을 조회합니다.
        </p>
      </div>

      {isError ? (
        <div className="flex items-center justify-center rounded-xl border border-red-200 bg-red-50 px-6 py-8 dark:border-red-800/40 dark:bg-red-900/20">
          <p className="text-sm text-red-600 dark:text-red-400">
            {error instanceof Error ? error.message : 'FCM 토큰 조회 중 오류가 발생했습니다.'}
          </p>
        </div>
      ) : (
        <Table<MemberFcm>
          columns={columns}
          data={tokens}
          rowKey={(row) => `${row.id}-${row.deviceType}`}
          loading={isLoading}
          loadingRows={3}
          emptyText="등록된 FCM 토큰이 없습니다."
        />
      )}
    </div>
  );
}
