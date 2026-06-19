'use client';

import { forwardRef, type TextareaHTMLAttributes } from 'react';

import { cn } from '@/shared/lib/cn';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
  wrapperClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    label,
    error,
    hint,
    rows = 4,
    fullWidth = false,
    className,
    wrapperClassName,
    id,
    ...props
  },
  ref,
) {
  const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={cn('flex flex-col gap-1', fullWidth && 'w-full', wrapperClassName)}>
      {label && (
        <label
          htmlFor={textareaId}
          className="text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {label}
        </label>
      )}

      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        className={cn(
          'w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 resize-y',
          'transition-colors duration-150',
          'focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent',
          'disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400',
          'dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500',
          error
            ? 'border-rose-500 focus:ring-rose-500 dark:border-rose-500'
            : 'border-slate-300 dark:border-slate-600',
          className,
        )}
        {...props}
      />

      {error && (
        <p className="text-xs text-rose-500" role="alert">
          {error}
        </p>
      )}
      {!error && hint && <p className="text-xs text-slate-500 dark:text-slate-400">{hint}</p>}
    </div>
  );
});
