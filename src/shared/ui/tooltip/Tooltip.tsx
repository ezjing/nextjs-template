'use client';

import { useId, useState, type ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  placement?: TooltipPlacement;
  /** 표시 지연(ms) */
  delay?: number;
  disabled?: boolean;
  className?: string;
}

const placementClasses: Record<TooltipPlacement, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

const arrowClasses: Record<TooltipPlacement, string> = {
  top: 'top-full left-1/2 -translate-x-1/2 -mt-1',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 -mb-1',
  left: 'left-full top-1/2 -translate-y-1/2 -ml-1',
  right: 'right-full top-1/2 -translate-y-1/2 -mr-1',
};

export function Tooltip({
  content,
  children,
  placement = 'top',
  delay = 100,
  disabled = false,
  className,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
  const id = useId();

  const show = () => {
    if (disabled) return;
    const t = setTimeout(() => setVisible(true), delay);
    setTimer(t);
  };

  const hide = () => {
    if (timer) clearTimeout(timer);
    setVisible(false);
  };

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocusCapture={show}
      onBlurCapture={hide}
    >
      <span aria-describedby={visible ? id : undefined}>{children}</span>

      {visible && content && (
        <span
          id={id}
          role="tooltip"
          className={cn(
            'pointer-events-none absolute z-[70] w-max max-w-xs rounded-md bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-white shadow-lg',
            'dark:bg-slate-700',
            placementClasses[placement],
            className,
          )}
        >
          {content}
          <span
            className={cn('absolute h-2 w-2 rotate-45 bg-slate-900 dark:bg-slate-700', arrowClasses[placement])}
          />
        </span>
      )}
    </span>
  );
}
