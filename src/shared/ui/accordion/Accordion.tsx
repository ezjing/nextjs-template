'use client';

import { useState, type ReactNode } from 'react';

import { Icon } from '@/shared/config/icons';
import { cn } from '@/shared/lib/cn';

export interface AccordionItem {
  value: string;
  title: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** single: 한 번에 하나, multiple: 여러 개 동시 */
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
  className?: string;
}

export function Accordion({ items, type = 'single', defaultValue, className }: AccordionProps) {
  const [openValues, setOpenValues] = useState<string[]>(() => {
    if (!defaultValue) return [];
    return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
  });

  const toggle = (value: string) => {
    setOpenValues((prev) => {
      const isOpen = prev.includes(value);
      if (type === 'single') return isOpen ? [] : [value];
      return isOpen ? prev.filter((v) => v !== value) : [...prev, value];
    });
  };

  return (
    <div
      className={cn(
        'divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200',
        'dark:divide-slate-700 dark:border-slate-700',
        className,
      )}
    >
      {items.map((item) => {
        const isOpen = openValues.includes(item.value);
        return (
          <div key={item.value}>
            <button
              type="button"
              disabled={item.disabled}
              onClick={() => toggle(item.value)}
              aria-expanded={isOpen}
              className={cn(
                'flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left text-sm font-medium transition-colors',
                'hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-slate-800',
                'text-slate-800 dark:text-slate-100',
              )}
            >
              <span>{item.title}</span>
              <Icon
                name="chevronDown"
                size={18}
                className={cn(
                  'shrink-0 text-slate-400 transition-transform duration-200',
                  isOpen && 'rotate-180',
                )}
              />
            </button>

            <div
              className={cn(
                'grid transition-all duration-200',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <div className="overflow-hidden">
                <div className="px-4 pb-4 pt-0 text-sm text-slate-600 dark:text-slate-300">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
