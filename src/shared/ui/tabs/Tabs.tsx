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
            ? 'gap-1 border-b border-border'
            : 'gap-1 rounded-lg bg-surface-muted p-1',
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
                        ? 'border-primary text-primary-fg'
                        : 'border-transparent text-fg-muted hover:text-fg-secondary',
                    )
                  : cn(
                      'rounded-md px-3.5 py-1.5',
                      selected
                        ? 'bg-surface text-fg shadow-sm'
                        : 'text-fg-muted hover:text-fg-secondary',
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
