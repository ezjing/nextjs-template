'use client';

import { useEffect, useId, useRef, useState } from 'react';

import { Icon } from '@/shared/config/icons';
import { cn } from '@/shared/lib/cn';
import { useOnClickOutside } from '@/shared/lib/useOnClickOutside';

export interface DatePickerProps {
  label?: string;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  /** 선택 가능한 최소 날짜 */
  minDate?: Date;
  /** 선택 가능한 최대 날짜 */
  maxDate?: Date;
  /** 표시 형식 (기본 ko-KR) */
  locale?: string;
  /** 선택 초기화 버튼 표시 */
  clearable?: boolean;
  wrapperClassName?: string;
  className?: string;
}

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function DatePicker({
  label,
  value,
  onChange,
  placeholder = '날짜 선택',
  error,
  hint,
  fullWidth = false,
  disabled = false,
  minDate,
  maxDate,
  locale = 'ko-KR',
  clearable = true,
  wrapperClassName,
  className,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState<Date>(value ?? new Date());
  const containerRef = useRef<HTMLDivElement>(null);
  const fieldId = useId();

  useOnClickOutside(containerRef, () => setOpen(false), open);

  const toggleOpen = () => {
    setOpen((prev) => {
      const next = !prev;
      if (next) setViewDate(value ?? new Date());
      return next;
    });
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = startOfDay(new Date());

  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  const isDisabledDate = (d: Date) => {
    if (minDate && startOfDay(d) < startOfDay(minDate)) return true;
    if (maxDate && startOfDay(d) > startOfDay(maxDate)) return true;
    return false;
  };

  const handleSelect = (d: Date) => {
    if (isDisabledDate(d)) return;
    onChange?.(d);
    setOpen(false);
  };

  const goMonth = (delta: number) => setViewDate(new Date(year, month + delta, 1));

  const displayValue = value ? value.toLocaleDateString(locale) : '';

  return (
    <div
      ref={containerRef}
      className={cn('relative flex flex-col gap-1', fullWidth && 'w-full', wrapperClassName)}
    >
      {label && (
        <label htmlFor={fieldId} className="text-sm font-medium text-fg-secondary">
          {label}
        </label>
      )}

      <button
        id={fieldId}
        type="button"
        disabled={disabled}
        onClick={toggleOpen}
        className={cn(
          'flex h-control-md w-full items-center justify-between gap-2 rounded-control border bg-surface px-3 text-sm transition-colors duration-150',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
          'disabled:cursor-not-allowed disabled:bg-surface-subtle disabled:text-fg-subtle',
          error ? 'border-danger focus:ring-danger' : 'border-border-strong',
          className,
        )}
      >
        <span className={cn('flex items-center gap-2', !displayValue && 'text-fg-subtle')}>
          <Icon name="calendar" size={16} className="text-fg-subtle" />
          {displayValue || placeholder}
        </span>
        {clearable && value && !disabled && (
          <span
            role="button"
            tabIndex={-1}
            aria-label="날짜 초기화"
            onClick={(e) => {
              e.stopPropagation();
              onChange?.(null);
            }}
            className="rounded-control-xs p-0.5 text-fg-subtle hover:text-fg-secondary"
          >
            <Icon name="x" size={14} />
          </span>
        )}
      </button>

      {open && (
        <div
          className={cn(
            'absolute top-full z-50 mt-1 w-72 rounded-card border border-border bg-surface p-3 shadow-popover',
          )}
        >
          {/* 헤더: 월 이동 */}
          <div className="mb-2 flex items-center justify-between">
            <button
              type="button"
              onClick={() => goMonth(-1)}
              className="rounded-control-sm p-1.5 text-fg-muted hover:bg-surface-muted"
              aria-label="이전 달"
            >
              <Icon name="chevronLeft" size={16} />
            </button>
            <span className="text-sm font-semibold text-fg">
              {year}년 {month + 1}월
            </span>
            <button
              type="button"
              onClick={() => goMonth(1)}
              className="rounded-control-sm p-1.5 text-fg-muted hover:bg-surface-muted"
              aria-label="다음 달"
            >
              <Icon name="chevronRight" size={16} />
            </button>
          </div>

          {/* 요일 헤더 */}
          <div className="mb-1 grid grid-cols-7">
            {WEEKDAYS.map((w, i) => (
              <div
                key={w}
                className={cn(
                  'flex h-7 items-center justify-center text-xs font-medium',
                  i === 0 ? 'text-danger-fg' : i === 6 ? 'text-info-fg' : 'text-fg-subtle',
                )}
              >
                {w}
              </div>
            ))}
          </div>

          {/* 날짜 그리드 */}
          <div className="grid grid-cols-7 gap-0.5">
            {cells.map((d, idx) => {
              if (!d) return <div key={`empty-${idx}`} className="h-8" />;
              const selected = value ? isSameDay(d, value) : false;
              const isToday = isSameDay(d, today);
              const dimmed = isDisabledDate(d);
              return (
                <button
                  key={d.toISOString()}
                  type="button"
                  disabled={dimmed}
                  onClick={() => handleSelect(d)}
                  className={cn(
                    'flex h-8 items-center justify-center rounded-control-sm text-sm transition-colors',
                    'hover:bg-primary-subtle',
                    selected && 'bg-primary font-semibold text-fg-on-primary hover:bg-primary',
                    !selected && isToday && 'font-semibold text-primary-fg',
                    !selected && !isToday && 'text-fg-secondary',
                    dimmed && 'cursor-not-allowed text-fg-subtle hover:bg-transparent',
                  )}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>

          {/* 푸터 */}
          <div className="mt-2 flex justify-end border-t border-border pt-2">
            <button
              type="button"
              onClick={() => handleSelect(new Date())}
              className="rounded-control-sm px-2 py-1 text-xs font-medium text-primary-fg hover:bg-primary-subtle"
            >
              오늘
            </button>
          </div>
        </div>
      )}

      {error && (
        <p className="text-xs text-danger-fg" role="alert">
          {error}
        </p>
      )}
      {!error && hint && <p className="text-xs text-fg-muted">{hint}</p>}
    </div>
  );
}
