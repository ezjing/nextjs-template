'use client';

import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'outline';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  /** 둥근 알약 형태 */
  pill?: boolean;
  /** 앞쪽 점 표시 */
  dot?: boolean;
  leftIcon?: ReactNode;
}

const variants: Record<BadgeVariant, string> = {
  default: 'bg-surface-muted text-fg-secondary',
  primary: 'bg-primary-subtle text-primary-fg',
  success: 'bg-success-subtle text-success-fg',
  warning: 'bg-warning-subtle text-warning-fg',
  error: 'bg-danger-subtle text-danger-fg',
  info: 'bg-info-subtle text-info-fg',
  outline:
    'border border-border-strong text-fg-secondary',
};

const dotColors: Record<BadgeVariant, string> = {
  default: 'bg-fg-subtle',
  primary: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-danger',
  info: 'bg-info',
  outline: 'bg-fg-subtle',
};

const sizes: Record<BadgeSize, string> = {
  sm: 'h-5 px-2 text-[11px] gap-1',
  md: 'h-6 px-2.5 text-xs gap-1.5',
  lg: 'h-7 px-3 text-sm gap-1.5',
};

export function Badge({
  variant = 'default',
  size = 'md',
  pill = false,
  dot = false,
  leftIcon,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium whitespace-nowrap',
        pill ? 'rounded-full' : 'rounded-control-sm',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {dot && <span className={cn('h-1.5 w-1.5 shrink-0 rounded-full', dotColors[variant])} />}
      {leftIcon}
      {children}
    </span>
  );
}
