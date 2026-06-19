'use client';

import { Icon } from '@/shared/config/icons';
import { cn } from '@/shared/lib/cn';

export interface PaginationProps {
  /** 현재 페이지 (1-based) */
  page: number;
  /** 전체 페이지 수 */
  totalPages: number;
  onChange: (page: number) => void;
  /** 현재 페이지 양옆에 표시할 페이지 수 */
  siblingCount?: number;
  /** 처음/끝 화살표 표시 */
  className?: string;
}

const DOTS = '...';

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function getPages(page: number, totalPages: number, siblingCount: number): (number | string)[] {
  const totalNumbers = siblingCount * 2 + 5;
  if (totalNumbers >= totalPages) return range(1, totalPages);

  const leftSibling = Math.max(page - siblingCount, 1);
  const rightSibling = Math.min(page + siblingCount, totalPages);

  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < totalPages - 1;

  if (!showLeftDots && showRightDots) {
    return [...range(1, 3 + siblingCount * 2), DOTS, totalPages];
  }
  if (showLeftDots && !showRightDots) {
    return [1, DOTS, ...range(totalPages - (2 + siblingCount * 2), totalPages)];
  }
  return [1, DOTS, ...range(leftSibling, rightSibling), DOTS, totalPages];
}

export function Pagination({
  page,
  totalPages,
  onChange,
  siblingCount = 1,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPages(page, totalPages, siblingCount);

  const btnBase =
    'inline-flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40';

  return (
    <nav className={cn('flex items-center gap-1', className)} aria-label="페이지네이션">
      <button
        type="button"
        className={cn(btnBase, 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700')}
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        aria-label="이전 페이지"
      >
        <Icon name="chevronLeft" size={16} />
      </button>

      {pages.map((p, idx) =>
        typeof p === 'string' ? (
          <span key={`dots-${idx}`} className="inline-flex h-9 min-w-9 items-center justify-center text-slate-400">
            {DOTS}
          </span>
        ) : (
          <button
            key={p}
            type="button"
            aria-current={p === page ? 'page' : undefined}
            onClick={() => onChange(p)}
            className={cn(
              btnBase,
              p === page
                ? 'bg-violet-600 text-white hover:bg-violet-700'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700',
            )}
          >
            {p}
          </button>
        ),
      )}

      <button
        type="button"
        className={cn(btnBase, 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700')}
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="다음 페이지"
      >
        <Icon name="chevronRight" size={16} />
      </button>
    </nav>
  );
}
