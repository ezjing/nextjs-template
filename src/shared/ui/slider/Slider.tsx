'use client';

import { useId } from 'react';

import { cn } from '@/shared/lib/cn';

export interface SliderProps {
  label?: string;
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  /** 현재 값 표시 */
  showValue?: boolean;
  /** 값 표시 포맷터 */
  formatValue?: (value: number) => string;
  fullWidth?: boolean;
  wrapperClassName?: string;
  className?: string;
}

export function Slider({
  label,
  value = 0,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  showValue = false,
  formatValue,
  fullWidth = false,
  wrapperClassName,
  className,
}: SliderProps) {
  const id = useId();
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full', wrapperClassName)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && (
            <label htmlFor={id} className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {label}
            </label>
          )}
          {showValue && (
            <span className="text-sm font-medium tabular-nums text-slate-600 dark:text-slate-300">
              {formatValue ? formatValue(value) : value}
            </span>
          )}
        </div>
      )}

      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange?.(Number(e.target.value))}
        className={cn(
          'h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 dark:bg-slate-700',
          'accent-violet-600',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        style={{
          background: disabled
            ? undefined
            : `linear-gradient(to right, var(--color-violet-600) 0%, var(--color-violet-600) ${percent}%, var(--color-slate-200) ${percent}%, var(--color-slate-200) 100%)`,
        }}
      />
    </div>
  );
}
