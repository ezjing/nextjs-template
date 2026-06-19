'use client';

import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: ReactNode;
  description?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  /** 라벨 위치 */
  labelPosition?: 'left' | 'right';
  wrapperClassName?: string;
}

const trackSizes = {
  sm: 'h-5 w-9',
  md: 'h-6 w-11',
  lg: 'h-7 w-[3.25rem]',
} as const;

const thumbSizes = {
  sm: 'h-4 w-4 peer-checked:translate-x-4',
  md: 'h-5 w-5 peer-checked:translate-x-5',
  lg: 'h-6 w-6 peer-checked:translate-x-[1.625rem]',
} as const;

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(function Toggle(
  {
    label,
    description,
    size = 'md',
    labelPosition = 'right',
    className,
    wrapperClassName,
    id,
    disabled,
    ...props
  },
  ref,
) {
  const toggleId =
    id ?? (typeof label === 'string' ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  const labelNode = (label || description) && (
    <span className="flex flex-col gap-0.5">
      {label && (
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
      )}
      {description && (
        <span className="text-xs text-slate-500 dark:text-slate-400">{description}</span>
      )}
    </span>
  );

  return (
    <label
      htmlFor={toggleId}
      className={cn(
        'inline-flex items-center gap-3',
        disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
        wrapperClassName,
      )}
    >
      {labelPosition === 'left' && labelNode}

      <span className="relative inline-flex shrink-0 items-center">
        <input
          ref={ref}
          id={toggleId}
          type="checkbox"
          disabled={disabled}
          className={cn('peer sr-only', className)}
          {...props}
        />
        <span
          className={cn(
            'rounded-full bg-slate-300 transition-colors duration-200',
            'peer-checked:bg-violet-600',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-violet-500 peer-focus-visible:ring-offset-2',
            'dark:bg-slate-600 dark:peer-checked:bg-violet-600',
            trackSizes[size],
          )}
        />
        <span
          className={cn(
            'pointer-events-none absolute left-0.5 rounded-full bg-white shadow-sm transition-transform duration-200',
            thumbSizes[size],
          )}
        />
      </span>

      {labelPosition === 'right' && labelNode}
    </label>
  );
});
