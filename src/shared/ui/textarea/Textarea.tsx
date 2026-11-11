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
  { label, error, hint, rows = 4, fullWidth = false, className, wrapperClassName, id, ...props },
  ref,
) {
  const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={cn('flex flex-col gap-1', fullWidth && 'w-full', wrapperClassName)}>
      {label && (
        <label htmlFor={textareaId} className="text-sm font-medium text-fg-secondary">
          {label}
        </label>
      )}

      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        className={cn(
          'w-full rounded-control border bg-surface px-3 py-2 text-sm text-fg placeholder:text-fg-subtle resize-y',
          'transition-colors duration-150',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
          'disabled:cursor-not-allowed disabled:bg-surface-subtle disabled:text-fg-subtle',
          error ? 'border-danger focus:ring-danger' : 'border-border-strong',
          className,
        )}
        {...props}
      />

      {error && (
        <p className="text-xs text-danger-fg" role="alert">
          {error}
        </p>
      )}
      {!error && hint && <p className="text-xs text-fg-muted">{hint}</p>}
    </div>
  );
});
