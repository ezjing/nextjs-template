'use client';

import { forwardRef, type SelectHTMLAttributes } from 'react';

import { cn } from '@/shared/lib/cn';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options?: SelectOption[];
  placeholder?: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
  wrapperClassName?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    label,
    options = [],
    placeholder,
    error,
    hint,
    fullWidth = false,
    className,
    wrapperClassName,
    id,
    ...props
  },
  ref,
) {
  const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={cn('flex flex-col gap-1', fullWidth && 'w-full', wrapperClassName)}>
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}

      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          className={cn(
            'h-9 w-full appearance-none rounded-lg border bg-white pl-3 pr-9 py-2 text-sm text-slate-900',
            'transition-colors duration-150',
            'focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent',
            'disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400',
            'dark:bg-slate-800 dark:text-slate-100',
            error
              ? 'border-rose-500 focus:ring-rose-500 dark:border-rose-500'
              : 'border-slate-300 dark:border-slate-600',
            className,
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* 커스텀 화살표 */}
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </div>

      {error && (
        <p className="text-xs text-rose-500" role="alert">
          {error}
        </p>
      )}
      {!error && hint && <p className="text-xs text-slate-500 dark:text-slate-400">{hint}</p>}
    </div>
  );
});
