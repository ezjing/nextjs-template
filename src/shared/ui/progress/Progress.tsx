'use client';

import { cn } from '@/shared/lib/cn';

export type ProgressVariant = 'primary' | 'success' | 'warning' | 'error';
export type ProgressSize = 'sm' | 'md' | 'lg';

export interface ProgressProps {
  /** 0~max 사이 값 */
  value?: number;
  max?: number;
  variant?: ProgressVariant;
  size?: ProgressSize;
  /** 진행률 텍스트 표시 */
  showLabel?: boolean;
  /** 값 미정 무한 로딩 */
  indeterminate?: boolean;
  className?: string;
}

const barColor: Record<ProgressVariant, string> = {
  primary: 'bg-violet-600',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  error: 'bg-rose-500',
};

const heights: Record<ProgressSize, string> = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-3.5',
};

export function Progress({
  value = 0,
  max = 100,
  variant = 'primary',
  size = 'md',
  showLabel = false,
  indeterminate = false,
  className,
}: ProgressProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div
        className={cn(
          'relative w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700',
          heights[size],
        )}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : Math.round(percent)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {indeterminate ? (
          <div className={cn('progress-indeterminate absolute inset-y-0 w-1/3 rounded-full', barColor[variant])} />
        ) : (
          <div
            className={cn('h-full rounded-full transition-[width] duration-300', barColor[variant])}
            style={{ width: `${percent}%` }}
          />
        )}
      </div>
      {showLabel && !indeterminate && (
        <span className="w-9 shrink-0 text-right text-xs font-medium tabular-nums text-slate-600 dark:text-slate-300">
          {Math.round(percent)}%
        </span>
      )}
    </div>
  );
}
