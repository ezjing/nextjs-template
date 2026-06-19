'use client';

import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { Icon } from '@/shared/config/icons';
import { cn } from '@/shared/lib/cn';

export type DrawerSide = 'left' | 'right' | 'top' | 'bottom';
export type DrawerSize = 'sm' | 'md' | 'lg' | 'xl';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: DrawerSide;
  size?: DrawerSize;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
  className?: string;
}

const horizontalSize: Record<DrawerSize, string> = {
  sm: 'w-72',
  md: 'w-96',
  lg: 'w-[28rem]',
  xl: 'w-[34rem]',
};

const verticalSize: Record<DrawerSize, string> = {
  sm: 'h-1/4',
  md: 'h-1/3',
  lg: 'h-1/2',
  xl: 'h-2/3',
};

const positionBase: Record<DrawerSide, string> = {
  left: 'left-0 top-0 h-full',
  right: 'right-0 top-0 h-full',
  top: 'top-0 left-0 w-full',
  bottom: 'bottom-0 left-0 w-full',
};

const closedTransform: Record<DrawerSide, string> = {
  left: '-translate-x-full',
  right: 'translate-x-full',
  top: '-translate-y-full',
  bottom: 'translate-y-full',
};

export function Drawer({
  open,
  onClose,
  side = 'right',
  size = 'md',
  title,
  children,
  footer,
  closeOnBackdrop = true,
  closeOnEsc = true,
  className,
}: DrawerProps) {
  const [closing, setClosing] = useState(false);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 250);
  }, [onClose]);

  useEffect(() => {
    if (!closeOnEsc) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) handleClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, handleClose, closeOnEsc]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open && !closing) return null;
  if (typeof document === 'undefined') return null;

  const isHorizontal = side === 'left' || side === 'right';
  const visible = open && !closing;

  return createPortal(
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={title}>
      {/* 백드롭 */}
      <div
        className={cn(
          'absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-250',
          visible ? 'opacity-100' : 'opacity-0',
        )}
        aria-hidden="true"
        onClick={closeOnBackdrop ? handleClose : undefined}
      />

      {/* 패널 */}
      <div
        className={cn(
          'absolute flex flex-col bg-white shadow-2xl ring-1 ring-slate-900/5 transition-transform duration-250 ease-out',
          'dark:bg-slate-800 dark:ring-slate-700',
          positionBase[side],
          isHorizontal ? horizontalSize[size] : verticalSize[size],
          isHorizontal ? 'max-w-[90vw]' : 'max-h-[90vh]',
          visible ? 'translate-x-0 translate-y-0' : closedTransform[side],
          className,
        )}
      >
        {title && (
          <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-4 dark:border-slate-700">
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
              aria-label="닫기"
            >
              <Icon name="x" size={18} />
            </button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>

        {footer && (
          <div className="border-t border-slate-200 px-5 py-4 dark:border-slate-700">{footer}</div>
        )}
      </div>
    </div>,
    document.body,
  );
}
