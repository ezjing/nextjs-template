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
        <label htmlFor={fieldId} className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}

      <div
        onClick={openMenu}
        className={cn(
          'flex h-9 w-full cursor-text items-center gap-2 rounded-lg border bg-white px-3 text-sm transition-colors duration-150',
          'focus-within:ring-2 focus-within:ring-violet-500 focus-within:border-transparent',
          'dark:bg-slate-800',
          disabled && 'cursor-not-allowed bg-slate-50 dark:bg-slate-800/50',
          error
            ? 'border-rose-500 focus-within:ring-rose-500 dark:border-rose-500'
            : 'border-slate-300 dark:border-slate-600',
        )}
      >
        <Icon name="search" size={16} className="shrink-0 text-slate-400" />

        {open ? (
          <input
            ref={inputRef}
            id={fieldId}
            value={query}
            disabled={disabled}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={selected?.label ?? placeholder}
            className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-slate-100"
          />
        ) : (
          <span className={cn('flex-1 truncate', selected ? 'text-slate-900 dark:text-slate-100' : 'text-slate-400')}>
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
            className="shrink-0 rounded p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <Icon name="x" size={14} />
          </button>
        )}
        <Icon name="chevronDown" size={16} className={cn('shrink-0 text-slate-400 transition-transform', open && 'rotate-180')} />
      </div>

      {open && (
        <ul
          role="listbox"
          className={cn(
            'absolute top-full z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white p-1 shadow-lg',
            'dark:border-slate-700 dark:bg-slate-800',
          )}
        >
          {filtered.length === 0 ? (
            <li className="px-3 py-6 text-center text-sm text-slate-400">{emptyText}</li>
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
                      'flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors',
                      'disabled:cursor-not-allowed disabled:opacity-40',
                      isSelected
                        ? 'bg-violet-50 font-medium text-violet-700 dark:bg-violet-500/15 dark:text-violet-300'
                        : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700',
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
        <p className="text-xs text-rose-500" role="alert">
          {error}
        </p>
      )}
      {!error && hint && <p className="text-xs text-slate-500 dark:text-slate-400">{hint}</p>}
    </div>
  );
}
