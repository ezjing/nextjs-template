'use client';

import { cn } from '@/shared/lib/cn';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface SpinnerProps {
  size?: SpinnerSize;
  /** 보조 라벨 (스크린리더 및 옆 텍스트) */
  label?: string;
  /** 라벨을 시각적으로 표시할지 여부 */
  showLabel?: boolean;
  className?: string;
}

const sizeMap: Record<SpinnerSize, string> = {
  xs: 'h-3 w-3 border-2',
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-8 w-8 border-[3px]',
  xl: 'h-12 w-12 border-4',
};

export function Spinner({ size = 'md', label = '로딩 중', showLabel = false, className }: SpinnerProps) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)} role="status" aria-live="polite">
      <span
        className={cn(
          'inline-block animate-spin rounded-full border-current border-t-transparent text-violet-600',
          sizeMap[size],
        )}
      />
      {showLabel ? (
        <span className="text-sm text-slate-600 dark:text-slate-300">{label}</span>
      ) : (
        <span className="sr-only">{label}</span>
      )}
    </span>
  );
}
