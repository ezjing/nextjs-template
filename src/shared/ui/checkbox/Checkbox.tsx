'use client';

import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: ReactNode;
  /** 라벨 아래 보조 설명 */
  description?: ReactNode;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  wrapperClassName?: string;
}

const boxSizes = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
} as const;

const iconSizes = {
  sm: 12,
  md: 14,
  lg: 16,
} as const;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, description, error, size = 'md', className, wrapperClassName, id, disabled, ...props },
  ref,
) {
  const checkboxId =
    id ?? (typeof label === 'string' ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={cn('flex flex-col gap-1', wrapperClassName)}>
      <label
        htmlFor={checkboxId}
        className={cn(
          'inline-flex items-start gap-2.5',
          disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
        )}
      >
        <span className="relative inline-flex shrink-0 items-center justify-center">
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            disabled={disabled}
            className={cn(
              'peer appearance-none rounded-control-sm border bg-surface transition-colors duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
              'checked:border-primary checked:bg-primary',
              'disabled:cursor-not-allowed',
              error ? 'border-danger' : 'border-border-strong',
              boxSizes[size],
              className,
            )}
            {...props}
          />
          <svg
            className="pointer-events-none absolute hidden text-fg-on-primary peer-checked:block"
            width={iconSizes[size]}
            height={iconSizes[size]}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>

        {(label || description) && (
          <span className="flex flex-col gap-0.5">
            {label && <span className="text-sm font-medium text-fg-secondary">{label}</span>}
            {description && <span className="text-xs text-fg-muted">{description}</span>}
          </span>
        )}
      </label>

      {error && (
        <p className="text-xs text-danger-fg" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});
