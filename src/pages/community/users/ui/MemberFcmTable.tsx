'use client';

import { RefreshCw } from 'lucide-react';

import type { MemberFcm } from '@/entities/member';
import { Button } from '@/shared/ui/button/Button';
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
  const {
    data: tokens = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useMemberFcmQuery(selectedId);

  return (
    <div className="mt-8 flex flex-col gap-3">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-fg">
            FCM 토큰
            {selectedName && (
              <span className="ml-2 text-sm font-normal text-fg-muted">
                — {selectedName} ({selectedId})
              </span>
            )}
          </h2>
          <p className="mt-0.5 text-sm text-fg-muted">
            TB_BS_MEMBER_FCM 테이블을 조회합니다.
            {isFetching && !isLoading && <span className="ml-2 text-primary-fg">갱신 중...</span>}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          leftIcon={<RefreshCw className="h-4 w-4" />}
          loading={isFetching}
          onClick={() => refetch()}
        >
          새로고침
        </Button>
      </div>

      {isError ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-card border border-danger-border bg-danger-subtle px-6 py-8">
          <p className="text-sm text-danger-fg">
            {error instanceof Error ? error.message : 'FCM 토큰 조회 중 오류가 발생했습니다.'}
          </p>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<RefreshCw className="h-4 w-4" />}
            loading={isFetching}
            onClick={() => refetch()}
          >
            새로고침
          </Button>
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
