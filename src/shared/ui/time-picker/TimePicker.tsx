'use client';

import { useEffect, useId, useRef, useState } from 'react';

import { Icon } from '@/shared/config/icons';
import { cn } from '@/shared/lib/cn';
import { useOnClickOutside } from '@/shared/lib/useOnClickOutside';

export interface TimePickerProps {
  label?: string;
  /** "HH:mm" 24시간 형식 문자열 */
  value?: string | null;
  onChange?: (value: string | null) => void;
  placeholder?: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  /** 분 단위 간격 (기본 5분) */
  minuteStep?: number;
  /** 24시간 표기 여부 (기본 true, false 면 오전/오후) */
  use24Hour?: boolean;
  clearable?: boolean;
  wrapperClassName?: string;
  className?: string;
}

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

function parseValue(value?: string | null): { h: number; m: number } | null {
  if (!value) return null;
  const [h, m] = value.split(':').map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return { h, m };
}

function formatDisplay(value: string | null | undefined, use24Hour: boolean): string {
  const parsed = parseValue(value);
  if (!parsed) return '';
  if (use24Hour) return `${pad(parsed.h)}:${pad(parsed.m)}`;
  const period = parsed.h < 12 ? '오전' : '오후';
  const h12 = parsed.h % 12 === 0 ? 12 : parsed.h % 12;
  return `${period} ${h12}:${pad(parsed.m)}`;
}

export function TimePicker({
  label,
  value,
  onChange,
  placeholder = '시간 선택',
  error,
  hint,
  fullWidth = false,
  disabled = false,
  minuteStep = 5,
  use24Hour = true,
  clearable = true,
  wrapperClassName,
  className,
}: TimePickerProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const fieldId = useId();

  useOnClickOutside(containerRef, () => setOpen(false), open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const parsed = parseValue(value);
  const selectedHour = parsed?.h ?? null;
  const selectedMinute = parsed?.m ?? null;

  const hours = use24Hour
    ? Array.from({ length: 24 }, (_, i) => i)
    : Array.from({ length: 12 }, (_, i) => (i === 0 ? 12 : i));
  const minutes = Array.from({ length: Math.ceil(60 / minuteStep) }, (_, i) => i * minuteStep);
  const periods = ['오전', '오후'];
  const currentPeriod = selectedHour === null ? null : selectedHour < 12 ? '오전' : '오후';

  const commit = (h: number, m: number) => onChange?.(`${pad(h)}:${pad(m)}`);

  const handleHour = (displayHour: number) => {
    let h24 = displayHour;
    if (!use24Hour) {
      const period = currentPeriod ?? '오전';
      const base = displayHour % 12;
      h24 = period === '오후' ? base + 12 : base;
    }
    commit(h24, selectedMinute ?? 0);
  };

  const handleMinute = (m: number) => {
    commit(selectedHour ?? (use24Hour ? 0 : 0), m);
  };

  const handlePeriod = (period: string) => {
    const base = (selectedHour ?? 0) % 12;
    const h24 = period === '오후' ? base + 12 : base;
    commit(h24, selectedMinute ?? 0);
  };

  const displayHourValue =
    selectedHour === null ? null : use24Hour ? selectedHour : selectedHour % 12 === 0 ? 12 : selectedHour % 12;

  const displayValue = formatDisplay(value, use24Hour);

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
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'flex h-control-md w-full items-center justify-between gap-2 rounded-control border bg-surface px-3 text-sm transition-colors duration-150',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
          'disabled:cursor-not-allowed disabled:bg-surface-subtle disabled:text-fg-subtle',
          error
            ? 'border-danger focus:ring-danger'
            : 'border-border-strong',
          className,
        )}
      >
        <span className={cn('flex items-center gap-2', !displayValue && 'text-fg-subtle')}>
          <Icon name="clock" size={16} className="text-fg-subtle" />
          {displayValue || placeholder}
        </span>
        {clearable && value && !disabled && (
          <span
            role="button"
            tabIndex={-1}
            aria-label="시간 초기화"
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
            'absolute top-full z-50 mt-1 flex w-auto rounded-card border border-border bg-surface p-2 shadow-popover',
          )}
        >
          {!use24Hour && (
            <TimeColumn
              items={periods}
              isSelected={(p) => p === currentPeriod}
              onSelect={handlePeriod}
              render={(p) => p}
            />
          )}
          <TimeColumn
            items={hours}
            isSelected={(h) => h === displayHourValue}
            onSelect={handleHour}
            render={(h) => (use24Hour ? pad(h) : String(h))}
          />
          <div className="flex items-center px-1 text-fg-subtle">:</div>
          <TimeColumn
            items={minutes}
            isSelected={(m) => m === selectedMinute}
            onSelect={handleMinute}
            render={(m) => pad(m)}
          />
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

interface TimeColumnProps<T> {
  items: T[];
  isSelected: (item: T) => boolean;
  onSelect: (item: T) => void;
  render: (item: T) => string;
}

function TimeColumn<T>({ items, isSelected, onSelect, render }: TimeColumnProps<T>) {
  const listRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    selectedRef.current?.scrollIntoView({ block: 'center' });
  }, []);

  return (
    <div
      ref={listRef}
      className="flex max-h-44 w-14 flex-col gap-0.5 overflow-y-auto px-0.5 [scrollbar-width:thin]"
    >
      {items.map((item) => {
        const selected = isSelected(item);
        return (
          <button
            key={render(item)}
            ref={selected ? selectedRef : undefined}
            type="button"
            onClick={() => onSelect(item)}
            className={cn(
              'shrink-0 rounded-control-sm px-2 py-1.5 text-center text-sm transition-colors',
              'hover:bg-primary-subtle',
              selected
                ? 'bg-primary font-semibold text-fg-on-primary hover:bg-primary'
                : 'text-fg-secondary',
            )}
          >
            {render(item)}
          </button>
        );
      })}
    </div>
  );
}
