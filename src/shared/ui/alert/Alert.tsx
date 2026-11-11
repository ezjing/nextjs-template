'use client';

import type { ReactNode } from 'react';

import { Icon, type IconType } from '@/shared/config/icons';
import { cn } from '@/shared/lib/cn';

export type AlertVariant = 'success' | 'warning' | 'error' | 'info';

export interface AlertProps {
  variant?: AlertVariant;
  title?: ReactNode;
  children?: ReactNode;
  /** 닫기 버튼 핸들러 — 지정 시 x 버튼 표시 */
  onClose?: () => void;
  /** 우측 액션 영역 */
  action?: ReactNode;
  /** 기본 아이콘 숨김 */
  hideIcon?: boolean;
  className?: string;
}

const config: Record<AlertVariant, { icon: IconType; classes: string; iconClass: string }> = {
  success: {
    icon: 'checkCircle',
    classes:
      'border-success-border bg-success-subtle text-success-fg',
    iconClass: 'text-success-fg',
  },
  warning: {
    icon: 'alertTriangle',
    classes:
      'border-warning-border bg-warning-subtle text-warning-fg',
    iconClass: 'text-warning-fg',
  },
  error: {
    icon: 'alertCircle',
    classes:
      'border-danger-border bg-danger-subtle text-danger-fg',
    iconClass: 'text-danger-fg',
  },
  info: {
    icon: 'info',
    classes:
      'border-info-border bg-info-subtle text-info-fg',
    iconClass: 'text-info-fg',
  },
};

export function Alert({
  variant = 'info',
  title,
  children,
  onClose,
  action,
  hideIcon = false,
  className,
}: AlertProps) {
  const { icon, classes, iconClass } = config[variant];

  return (
    <div className={cn('flex items-start gap-3 rounded-xl border px-4 py-3', classes, className)} role="alert">
      {!hideIcon && <Icon name={icon} size={18} className={cn('mt-0.5 shrink-0', iconClass)} />}

      <div className="flex-1">
        {title && <p className="text-sm font-semibold leading-snug">{title}</p>}
        {children && (
          <div className={cn('text-sm leading-relaxed', title && 'mt-0.5 opacity-90')}>{children}</div>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="-mr-1 shrink-0 rounded-md p-0.5 opacity-60 transition-opacity hover:opacity-100"
          aria-label="닫기"
        >
          <Icon name="x" size={16} />
        </button>
      )}
    </div>
  );
}
