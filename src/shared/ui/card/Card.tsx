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
        'overflow-hidden rounded-card border border-border bg-surface shadow-card',
        hoverable && 'transition-shadow hover:shadow-popover',
        className,
      )}
      {...props}
    >
      {hasHeader && (
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
          <div className="min-w-0">
            {title && (
              <h3 className="truncate text-base font-semibold text-fg">
                {title}
              </h3>
            )}
            {description && (
              <p className="mt-0.5 text-sm text-fg-muted">{description}</p>
            )}
          </div>
          {actions && <div className="shrink-0">{actions}</div>}
        </div>
      )}

      <div className={cn(padded && 'px-5 py-4')}>{children}</div>

      {footer && (
        <div className="border-t border-border px-5 py-3">{footer}</div>
      )}
    </div>
  );
}
