'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { cn } from '@/shared/lib/cn';

export type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  size?: DialogSize;
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
  className?: string;
}

export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  closeOnBackdrop = true,
  closeOnEsc = true,
  className,
}: DialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!closeOnEsc) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose, closeOnEsc]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  const sizes: Record<DialogSize, string> = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4',
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdrop && e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'dialog-title' : undefined}
      onClick={handleBackdropClick}
    >
      {/* 백드롭 */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

      {/* 패널 */}
      <div
        ref={panelRef}
        className={cn(
          'relative z-10 w-full rounded-xl bg-white shadow-xl ring-1 ring-slate-900/5',
          'flex flex-col max-h-[90vh]',
          'dark:bg-slate-800 dark:ring-slate-700',
          sizes[size],
          className,
        )}
      >
        {/* 헤더 */}
        {(title || description) && (
          <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-4 dark:border-slate-700">
            <div>
              {title && (
                <h2
                  id="dialog-title"
                  className="text-base font-semibold text-slate-900 dark:text-slate-100"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
              aria-label="닫기"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        )}

        {/* 바디 */}
        <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>

        {/* 푸터 */}
        {footer && (
          <div className="border-t border-slate-200 px-6 py-4 dark:border-slate-700">{footer}</div>
        )}
      </div>
    </div>,
    document.body,
  );
}
