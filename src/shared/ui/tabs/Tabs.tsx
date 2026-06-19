'use client';

import { useState, type ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';

export interface TabItem {
  value: string;
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  /** 탭 선택 시 표시할 패널 내용 */
  content?: ReactNode;
}

export type TabsVariant = 'line' | 'pill';

export interface TabsProps {
  items: TabItem[];
  /** 제어 컴포넌트 값 */
  value?: string;
  /** 비제어 초기 값 */
  defaultValue?: string;
  onChange?: (value: string) => void;
  variant?: TabsVariant;
  fullWidth?: boolean;
  className?: string;
}

export function Tabs({
  items,
  value,
  defaultValue,
  onChange,
  variant = 'line',
  fullWidth = false,
  className,
}: TabsProps) {
  const [internal, setInternal] = useState(defaultValue ?? items[0]?.value);
  const active = value ?? internal;

  const select = (next: string) => {
    if (value === undefined) setInternal(next);
    onChange?.(next);
  };

  const activeItem = items.find((it) => it.value === active);

  return (
    <div className={className}>
      <div
        role="tablist"
        className={cn(
          'flex',
          variant === 'line'
            ? 'gap-1 border-b border-slate-200 dark:border-slate-700'
            : 'gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-800',
          fullWidth && 'w-full',
        )}
      >
        {items.map((item) => {
          const selected = item.value === active;
          return (
            <button
              key={item.value}
              role="tab"
              type="button"
              aria-selected={selected}
              disabled={item.disabled}
              onClick={() => select(item.value)}
              className={cn(
                'inline-flex items-center justify-center gap-1.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40',
                fullWidth && 'flex-1',
                variant === 'line'
                  ? cn(
                      '-mb-px border-b-2 px-3.5 py-2',
                      selected
                        ? 'border-violet-600 text-violet-600 dark:text-violet-400'
                        : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200',
                    )
                  : cn(
                      'rounded-md px-3.5 py-1.5',
                      selected
                        ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-slate-100'
                        : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200',
                    ),
              )}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </div>

      {activeItem?.content !== undefined && (
        <div role="tabpanel" className="pt-4">
          {activeItem.content}
        </div>
      )}
    </div>
  );
}
