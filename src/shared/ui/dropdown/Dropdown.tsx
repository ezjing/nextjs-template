'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';
import { useOnClickOutside } from '@/shared/lib/useOnClickOutside';

export interface DropdownItem {
  label: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  /** 위험 동작(빨강) */
  danger?: boolean;
  /** 위쪽 구분선 */
  divider?: boolean;
}

export type DropdownAlign = 'start' | 'end';

export interface DropdownProps {
  /** 메뉴를 여는 트리거 */
  trigger: ReactNode;
  items: DropdownItem[];
  align?: DropdownAlign;
  className?: string;
  menuClassName?: string;
}

export function Dropdown({ trigger, items, align = 'start', className, menuClassName }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(containerRef, () => setOpen(false), open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div ref={containerRef} className={cn('relative inline-flex', className)}>
      <span onClick={() => setOpen((o) => !o)} className="inline-flex">
        {trigger}
      </span>

      {open && (
        <div
          role="menu"
          className={cn(
            'absolute top-full z-50 mt-1 min-w-44 overflow-hidden rounded-xl border border-border bg-surface p-1 shadow-lg',
            align === 'end' ? 'right-0' : 'left-0',
            menuClassName,
          )}
        >
          {items.map((item, idx) => (
            <div key={idx}>
              {item.divider && <div className="my-1 h-px bg-surface-muted" />}
              <button
                type="button"
                role="menuitem"
                disabled={item.disabled}
                onClick={() => {
                  item.onClick?.();
                  setOpen(false);
                }}
                className={cn(
                  'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors',
                  'disabled:cursor-not-allowed disabled:opacity-40',
                  item.danger
                    ? 'text-danger-fg hover:bg-danger-subtle'
                    : 'text-fg-secondary hover:bg-surface-muted',
                )}
              >
                {item.icon && <span className="shrink-0">{item.icon}</span>}
                {item.label}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
