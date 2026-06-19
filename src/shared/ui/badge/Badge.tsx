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
  default: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200',
  primary: 'bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300',
  success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300',
  warning: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300',
  error: 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300',
  info: 'bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300',
  outline:
    'border border-slate-300 text-slate-600 dark:border-slate-600 dark:text-slate-300',
};

const dotColors: Record<BadgeVariant, string> = {
  default: 'bg-slate-500',
  primary: 'bg-violet-500',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  error: 'bg-rose-500',
  info: 'bg-sky-500',
  outline: 'bg-slate-500',
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
        pill ? 'rounded-full' : 'rounded-md',
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
