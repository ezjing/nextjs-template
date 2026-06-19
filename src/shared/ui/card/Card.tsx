'use client';

import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode;
  description?: ReactNode;
  /** 헤더 우측 액션 영역 */
  actions?: ReactNode;
  footer?: ReactNode;
  /** 내부 패딩 사용 여부 (false 면 children 직접 제어) */
  padded?: boolean;
  /** 호버 시 강조 */
  hoverable?: boolean;
  children?: ReactNode;
}

export function Card({
  title,
  description,
  actions,
  footer,
  padded = true,
  hoverable = false,
  className,
  children,
  ...props
}: CardProps) {
  const hasHeader = title || description || actions;

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm',
        'dark:border-slate-700 dark:bg-slate-800',
        hoverable && 'transition-shadow hover:shadow-md',
        className,
      )}
      {...props}
    >
      {hasHeader && (
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4 dark:border-slate-700">
          <div className="min-w-0">
            {title && (
              <h3 className="truncate text-base font-semibold text-slate-900 dark:text-slate-100">
                {title}
              </h3>
            )}
            {description && (
              <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{description}</p>
            )}
          </div>
          {actions && <div className="shrink-0">{actions}</div>}
        </div>
      )}

      <div className={cn(padded && 'px-5 py-4')}>{children}</div>

      {footer && (
        <div className="border-t border-slate-100 px-5 py-3 dark:border-slate-700">{footer}</div>
      )}
    </div>
  );
}
