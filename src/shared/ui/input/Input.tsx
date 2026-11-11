'use client';

import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  /** 왼쪽 아이콘/텍스트 */
  leftAddon?: ReactNode;
  /** 오른쪽 아이콘/텍스트 */
  rightAddon?: ReactNode;
  fullWidth?: boolean;
  /** 라벨을 인풋 내부에서 떠오르게 표시 (Material 스타일) */
  floatingLabel?: boolean;
  /** 래퍼 div className */
  wrapperClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    error,
    hint,
    leftAddon,
    rightAddon,
    fullWidth = false,
    floatingLabel = false,
    className,
    wrapperClassName,
    id,
    placeholder,
    ...props
  },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;

  if (floatingLabel) {
    return (
      <div className={cn('flex flex-col gap-1', fullWidth && 'w-full', wrapperClassName)}>
        <div className="relative">
          {leftAddon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center text-fg-subtle">
              {leftAddon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            // 플로팅 라벨 동작을 위해 공백 placeholder 사용 (peer-placeholder-shown 판별용)
            placeholder={placeholder ?? ' '}
            className={cn(
              'peer h-12 w-full rounded-lg border bg-surface px-3 pt-4 pb-1 text-sm text-fg',
              'transition-colors duration-150 placeholder:text-transparent',
              'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
              'disabled:cursor-not-allowed disabled:bg-surface-subtle disabled:text-fg-subtle',
              error
                ? 'border-danger focus:ring-danger'
                : 'border-border-strong',
              leftAddon && 'pl-9',
              rightAddon && 'pr-9',
              className,
            )}
            {...props}
          />

          {label && (
            <label
              htmlFor={inputId}
              className={cn(
                'pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-fg-subtle transition-all duration-150',
                'peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-[11px] peer-focus:font-medium',
                'peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:font-medium',
                error
                  ? 'text-danger-fg peer-focus:text-danger-fg'
                  : 'peer-focus:text-primary-fg',
                leftAddon && 'left-9',
              )}
            >
              {label}
            </label>
          )}

          {rightAddon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-fg-subtle">
              {rightAddon}
            </span>
          )}
        </div>

        {error && (
          <p className="text-xs text-danger-fg" role="alert">
            {error}
          </p>
        )}
        {!error && hint && <p className="text-xs text-fg-muted">{hint}</p>}
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col gap-1', fullWidth && 'w-full', wrapperClassName)}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-fg-secondary">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {leftAddon && (
          <span className="absolute left-3 flex items-center text-fg-subtle">{leftAddon}</span>
        )}

        <input
          ref={ref}
          id={inputId}
          placeholder={placeholder}
          className={cn(
            'h-control-md w-full rounded-lg border bg-surface px-3 py-2 text-sm text-fg placeholder:text-fg-subtle',
            'transition-colors duration-150',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
            'disabled:cursor-not-allowed disabled:bg-surface-subtle disabled:text-fg-subtle',
            error
              ? 'border-danger focus:ring-danger'
              : 'border-border-strong',
            leftAddon && 'pl-9',
            rightAddon && 'pr-9',
            className,
          )}
          {...props}
        />

        {rightAddon && (
          <span className="absolute right-3 flex items-center text-fg-subtle">{rightAddon}</span>
        )}
      </div>

      {error && (
        <p className="text-xs text-danger-fg" role="alert">
          {error}
        </p>
      )}
      {!error && hint && <p className="text-xs text-fg-muted">{hint}</p>}
    </div>
  );
});
