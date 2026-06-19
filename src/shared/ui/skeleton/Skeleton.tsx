'use client';

import type { CSSProperties } from 'react';

import { cn } from '@/shared/lib/cn';

export type SkeletonVariant = 'text' | 'circle' | 'rect';

export interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number | string;
  /** text 변형일 때 줄 수 */
  lines?: number;
  /** 펄스 애니메이션 사용 여부 */
  animate?: boolean;
  className?: string;
}

export function Skeleton({
  variant = 'text',
  width,
  height,
  lines = 1,
  animate = true,
  className,
}: SkeletonProps) {
  const base = cn('bg-slate-200 dark:bg-slate-700', animate && 'animate-pulse');

  if (variant === 'text' && lines > 1) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: lines }).map((_, i) => (
          <span
            key={i}
            className={cn(base, 'block h-3.5 rounded', i === lines - 1 && 'w-4/5', className)}
            style={i === lines - 1 ? undefined : { width }}
          />
        ))}
      </div>
    );
  }

  const style: CSSProperties = { width, height };
  const shape =
    variant === 'circle'
      ? 'rounded-full'
      : variant === 'rect'
        ? 'rounded-lg'
        : 'rounded h-3.5';

  return <span className={cn(base, 'block', shape, className)} style={style} />;
}
