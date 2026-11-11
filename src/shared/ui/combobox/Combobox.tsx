'use client';

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';

import { Icon } from '@/shared/config/icons';
import { cn } from '@/shared/lib/cn';
import { useOnClickOutside } from '@/shared/lib/useOnClickOutside';

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps {
  label?: string;
  options: ComboboxOption[];
  value?: string | null;
  onChange?: (value: string | null) => void;
  placeholder?: string;
  /** 검색 결과 없음 텍스트 */
  emptyText?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  clearable?: boolean;
  fullWidth?: boolean;
  wrapperClassName?: string;
}

export function Combobox({
  label,
  options,
  value,
  onChange,
  placeholder = '선택하세요',
  emptyText = '검색 결과가 없습니다',
  error,
  hint,
  disabled = false,
  clearable = true,
  fullWidth = false,
  wrapperClassName,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fieldId = useId();

  const selected = useMemo(() => options.find((o) => o.value === value) ?? null, [options, value]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
  }, []);

  useOnClickOutside(containerRef, close, open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  const filtered = useMemo(() => {
    if (!query) return options;
    const q = query.toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  const openMenu = () => {
    if (disabled) return;
    setOpen(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

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

      <div
        onClick={openMenu}
        className={cn(
          'flex h-control-md w-full cursor-text items-center gap-2 rounded-control border bg-surface px-3 text-sm transition-colors duration-150',
          'focus-within:ring-2 focus-within:ring-ring focus-within:border-transparent',
          disabled && 'cursor-not-allowed bg-surface-subtle',
          error
            ? 'border-danger focus-within:ring-danger'
            : 'border-border-strong',
        )}
      >
        <Icon name="search" size={16} className="shrink-0 text-fg-subtle" />

        {open ? (
          <input
            ref={inputRef}
            id={fieldId}
            value={query}
            disabled={disabled}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={selected?.label ?? placeholder}
            className="w-full bg-transparent text-fg placeholder:text-fg-subtle focus:outline-none"
          />
        ) : (
          <span className={cn('flex-1 truncate', selected ? 'text-fg' : 'text-fg-subtle')}>
            {selected?.label ?? placeholder}
          </span>
        )}

        {clearable && selected && !disabled && (
          <button
            type="button"
            aria-label="선택 초기화"
            onClick={(e) => {
              e.stopPropagation();
              onChange?.(null);
            }}
            className="shrink-0 rounded-control-xs p-0.5 text-fg-subtle hover:text-fg-secondary"
          >
            <Icon name="x" size={14} />
          </button>
        )}
        <Icon name="chevronDown" size={16} className={cn('shrink-0 text-fg-subtle transition-transform', open && 'rotate-180')} />
      </div>

      {open && (
        <ul
          role="listbox"
          className={cn(
            'absolute top-full z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-card border border-border bg-surface p-1 shadow-popover',
          )}
        >
          {filtered.length === 0 ? (
            <li className="px-3 py-6 text-center text-sm text-fg-subtle">{emptyText}</li>
          ) : (
            filtered.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <li key={opt.value} role="option" aria-selected={isSelected}>
                  <button
                    type="button"
                    disabled={opt.disabled}
                    onClick={() => {
                      onChange?.(opt.value);
                      close();
                    }}
                    className={cn(
                      'flex w-full items-center justify-between gap-2 rounded-control px-3 py-2 text-left text-sm transition-colors',
                      'disabled:cursor-not-allowed disabled:opacity-40',
                      isSelected
                        ? 'bg-primary-subtle font-medium text-primary-fg'
                        : 'text-fg-secondary hover:bg-surface-muted',
                    )}
                  >
                    {opt.label}
                    {isSelected && <Icon name="check" size={16} className="shrink-0" />}
                  </button>
                </li>
              );
            })
          )}
        </ul>
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
