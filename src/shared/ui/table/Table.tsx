'use client';

import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';
import { EmptyState } from '@/shared/ui/empty-state/EmptyState';
import { Skeleton } from '@/shared/ui/skeleton/Skeleton';

export type TableAlign = 'left' | 'center' | 'right';

export interface TableColumn<T> {
  key: string;
  header: ReactNode;
  /** 셀 렌더러. 미지정 시 row[key] 표시 */
  render?: (row: T, index: number) => ReactNode;
  align?: TableAlign;
  width?: number | string;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  /** 각 행의 고유 키 추출 */
  rowKey: (row: T, index: number) => string | number;
  loading?: boolean;
  /** 로딩 시 표시할 스켈레톤 행 수 */
  loadingRows?: number;
  emptyText?: ReactNode;
  onRowClick?: (row: T, index: number) => void;
  /** 행 구분 hover 효과 */
  hoverable?: boolean;
  className?: string;
}

const alignClass: Record<TableAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

export function Table<T>({
  columns,
  data,
  rowKey,
  loading = false,
  loadingRows = 4,
  emptyText = '데이터가 없습니다',
  onRowClick,
  hoverable = true,
  className,
}: TableProps<T>) {
  return (
    <div
      className={cn(
        'w-full overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700',
        className,
      )}
    >
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
            {columns.map((col) => (
              <th
                key={col.key}
                style={{ width: col.width }}
                className={cn(
                  'px-4 py-3 font-semibold text-slate-600 dark:text-slate-300',
                  alignClass[col.align ?? 'left'],
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
          {loading ? (
            Array.from({ length: loadingRows }).map((_, r) => (
              <tr key={`sk-${r}`}>
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3">
                    <Skeleton width="70%" />
                  </td>
                ))}
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length}>
                <EmptyState title={emptyText} size="sm" />
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr
                key={rowKey(row, idx)}
                onClick={onRowClick ? () => onRowClick(row, idx) : undefined}
                className={cn(
                  'bg-white dark:bg-slate-800',
                  hoverable && 'transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50',
                  onRowClick && 'cursor-pointer',
                )}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      'px-4 py-3 text-slate-700 dark:text-slate-200',
                      alignClass[col.align ?? 'left'],
                    )}
                  >
                    {col.render ? col.render(row, idx) : ((row as Record<string, ReactNode>)[col.key] ?? '-')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
