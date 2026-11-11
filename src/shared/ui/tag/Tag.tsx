'use client';

import type { ReactNode } from 'react';

import { Icon } from '@/shared/config/icons';
import { cn } from '@/shared/lib/cn';

export type TagVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
export type TagSize = 'sm' | 'md' | 'lg';

export interface TagProps {
  variant?: TagVariant;
  size?: TagSize;
  leftIcon?: ReactNode;
  /** 삭제 핸들러 — 지정 시 x 버튼 표시 */
  onRemove?: () => void;
  /** 클릭 가능한 칩 */
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

const variants: Record<TagVariant, string> = {
  default: 'bg-surface-muted text-fg-secondary',
  primary: 'bg-primary-subtle text-primary-fg',
  success: 'bg-success-subtle text-success-fg',
  warning: 'bg-warning-subtle text-warning-fg',
  error: 'bg-danger-subtle text-danger-fg',
  info: 'bg-info-subtle text-info-fg',
};

const sizes: Record<TagSize, string> = {
  sm: 'h-6 pl-2 text-xs gap-1',
  md: 'h-7 pl-2.5 text-sm gap-1.5',
  lg: 'h-8 pl-3 text-sm gap-1.5',
};

const removeIconSize: Record<TagSize, number> = { sm: 12, md: 14, lg: 15 };

export function Tag({
  variant = 'default',
  size = 'md',
  leftIcon,
  onRemove,
  onClick,
  children,
  className,
}: TagProps) {
  return (
    <span
      onClick={onClick}
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        onRemove ? 'pr-1' : size === 'sm' ? 'pr-2' : size === 'lg' ? 'pr-3' : 'pr-2.5',
        onClick && 'cursor-pointer transition-opacity hover:opacity-80',
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {leftIcon}
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-0.5 inline-flex items-center justify-center rounded-full p-0.5 transition-colors hover:bg-fg/10"
          aria-label="삭제"
        >
          <Icon name="x" size={removeIconSize[size]} />
        </button>
      )}
    </span>
  );
}
