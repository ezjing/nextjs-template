'use client';

import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

  const variants: Record<ButtonVariant, string> = {
    primary:
      'bg-primary text-fg-on-primary hover:bg-primary-hover active:bg-primary-active focus-visible:ring-ring',
    secondary:
      'bg-surface-muted text-fg-secondary hover:bg-surface-strong active:bg-surface-strong focus-visible:ring-border-strong',
    ghost:
      'bg-transparent text-fg-secondary hover:bg-surface-muted active:bg-surface-strong focus-visible:ring-border-strong',
    danger:
      'bg-danger text-fg-on-primary hover:bg-danger-hover active:bg-danger-hover focus-visible:ring-danger',
    outline:
      'border border-border-strong bg-transparent text-fg-secondary hover:bg-surface-subtle active:bg-surface-muted focus-visible:ring-border-strong',
  };

  const sizes: Record<ButtonSize, string> = {
    sm: 'h-control-sm px-3 text-xs',
    md: 'h-control-md px-4 text-sm',
    lg: 'h-control-lg px-6 text-base',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className)}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      ) : (
        leftIcon
      )}
      {children}
      {!loading && rightIcon}
    </button>
  );
}
