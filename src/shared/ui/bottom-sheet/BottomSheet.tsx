'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { cn } from '@/shared/lib/cn';

export type BottomSheetHeight = 'auto' | 'half' | 'full';

export interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  height?: BottomSheetHeight;
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
  className?: string;
}

/**
 * 모바일 친화적 바텀시트 컴포넌트
 */
export function BottomSheet({
  open,
  onClose,
  title,
  children,
  footer,
  height = 'auto',
  closeOnBackdrop = true,
  closeOnEsc = true,
  className,
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
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
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) handleClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, handleClose, closeOnEsc]);

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

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    dragStartY.current = 'touches' in e ? e.touches[0]?.clientY : e.clientY;
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (dragStartY.current === null) return;
    const currentY = 'touches' in e ? e.touches[0]?.clientY : e.clientY;
    const diff = currentY - dragStartY.current;
    if (diff > 0) setDragOffset(diff);
  };

  const handleDragEnd = () => {
    if (dragOffset > 120) {
      handleClose();
    }
    setDragOffset(0);
    dragStartY.current = null;
  };

  if (!open && !closing) return null;

  const heightClasses: Record<BottomSheetHeight, string> = {
    auto: 'max-h-[90vh]',
    half: 'h-1/2',
    full: 'h-[90vh]',
  };

  return createPortal(
    <div
      className={cn(
        'fixed inset-0 z-50 flex flex-col justify-end',
        !open && closing && 'pointer-events-none',
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'bottom-sheet-title' : undefined}
    >
      {/* 백드롭 */}
      <div
        className={cn(
          'absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-250',
          open && !closing ? 'opacity-100' : 'opacity-0',
        )}
        aria-hidden="true"
        onClick={closeOnBackdrop ? handleClose : undefined}
      />

      {/* 시트 패널 */}
      <div
        ref={sheetRef}
        style={{ transform: `translateY(${dragOffset}px)` }}
        className={cn(
          'relative z-10 w-full rounded-t-2xl bg-white shadow-2xl ring-1 ring-slate-900/5',
          'flex flex-col',
          'dark:bg-slate-800 dark:ring-slate-700',
          heightClasses[height],
          'transition-transform',
          open && !closing ? 'duration-300 translate-y-0' : 'duration-250 translate-y-full',
          className,
        )}
      >
        {/* 드래그 핸들 */}
        <div
          className="flex cursor-grab touch-none flex-col items-center gap-3 pb-2 pt-3 active:cursor-grabbing"
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          <div className="h-1 w-10 rounded-full bg-slate-300 dark:bg-slate-600" />
          {title && (
            <h2
              id="bottom-sheet-title"
              className="text-sm font-semibold text-slate-900 dark:text-slate-100"
            >
              {title}
            </h2>
          )}
        </div>

        {/* 바디 */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">{children}</div>

        {/* 푸터 */}
        {footer && (
          <div className="border-t border-slate-200 px-4 py-3 dark:border-slate-700">{footer}</div>
        )}
      </div>
    </div>,
    document.body,
  );
}
