'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';

import { Icon, type IconType } from '@/shared/config/icons';
import { cn } from '@/shared/lib/cn';

export type SnackbarVariant = 'success' | 'warning' | 'error' | 'info';
export type SnackbarPosition =
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right';

export interface SnackbarOptions {
  /** 표시 유형 — success / warning / error / info */
  variant?: SnackbarVariant;
  /** 자동 닫힘 시간(ms). 0 이면 자동으로 닫히지 않음 */
  duration?: number;
  /** 액션 버튼 라벨 */
  actionLabel?: string;
  /** 액션 버튼 클릭 핸들러 */
  onAction?: () => void;
}

interface SnackbarItem extends Required<Omit<SnackbarOptions, 'actionLabel' | 'onAction'>> {
  id: number;
  message: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

interface SnackbarContextValue {
  show: (message: ReactNode, options?: SnackbarOptions) => number;
  success: (message: ReactNode, options?: Omit<SnackbarOptions, 'variant'>) => number;
  warning: (message: ReactNode, options?: Omit<SnackbarOptions, 'variant'>) => number;
  error: (message: ReactNode, options?: Omit<SnackbarOptions, 'variant'>) => number;
  info: (message: ReactNode, options?: Omit<SnackbarOptions, 'variant'>) => number;
  dismiss: (id: number) => void;
}

const SnackbarContext = createContext<SnackbarContextValue | null>(null);

export function useSnackbar(): SnackbarContextValue {
  const ctx = useContext(SnackbarContext);
  if (!ctx) {
    throw new Error('useSnackbar 는 <SnackbarProvider> 내부에서만 사용할 수 있습니다.');
  }
  return ctx;
}

const variantConfig: Record<
  SnackbarVariant,
  { icon: IconType; classes: string; iconClass: string }
> = {
  success: {
    icon: 'checkCircle',
    classes: 'border-success-border bg-success-subtle text-success-fg',
    iconClass: 'text-success-fg',
  },
  warning: {
    icon: 'alertTriangle',
    classes: 'border-warning-border bg-warning-subtle text-warning-fg',
    iconClass: 'text-warning-fg',
  },
  error: {
    icon: 'alertCircle',
    classes: 'border-danger-border bg-danger-subtle text-danger-fg',
    iconClass: 'text-danger-fg',
  },
  info: {
    icon: 'info',
    classes: 'border-info-border bg-info-subtle text-info-fg',
    iconClass: 'text-info-fg',
  },
};

const positionClasses: Record<SnackbarPosition, string> = {
  top: 'top-4 left-1/2 -translate-x-1/2 items-center',
  'top-left': 'top-4 left-4 items-start',
  'top-right': 'top-4 right-4 items-end',
  bottom: 'bottom-4 left-1/2 -translate-x-1/2 items-center',
  'bottom-left': 'bottom-4 left-4 items-start',
  'bottom-right': 'bottom-4 right-4 items-end',
};

export interface SnackbarProviderProps {
  children: ReactNode;
  position?: SnackbarPosition;
  /** 기본 자동 닫힘 시간(ms) */
  defaultDuration?: number;
  /** 동시에 표시할 최대 개수 */
  max?: number;
}

export function SnackbarProvider({
  children,
  position = 'bottom',
  defaultDuration = 3000,
  max = 4,
}: SnackbarProviderProps) {
  const [items, setItems] = useState<SnackbarItem[]>([]);
  const idRef = useRef(0);
  const timers = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const show = useCallback(
    (message: ReactNode, options?: SnackbarOptions) => {
      const id = ++idRef.current;
      const item: SnackbarItem = {
        id,
        message,
        variant: options?.variant ?? 'info',
        duration: options?.duration ?? defaultDuration,
        actionLabel: options?.actionLabel,
        onAction: options?.onAction,
      };

      setItems((prev) => {
        const next = [...prev, item];
        return next.length > max ? next.slice(next.length - max) : next;
      });

      if (item.duration > 0) {
        const timer = setTimeout(() => dismiss(id), item.duration);
        timers.current.set(id, timer);
      }

      return id;
    },
    [defaultDuration, dismiss, max],
  );

  useEffect(() => {
    const map = timers.current;
    return () => {
      map.forEach((timer) => clearTimeout(timer));
      map.clear();
    };
  }, []);

  const value = useMemo<SnackbarContextValue>(
    () => ({
      show,
      success: (message, options) => show(message, { ...options, variant: 'success' }),
      warning: (message, options) => show(message, { ...options, variant: 'warning' }),
      error: (message, options) => show(message, { ...options, variant: 'error' }),
      info: (message, options) => show(message, { ...options, variant: 'info' }),
      dismiss,
    }),
    [show, dismiss],
  );

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      {items.length > 0 &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className={cn(
              'pointer-events-none fixed z-[60] flex w-auto max-w-[calc(100vw-2rem)] flex-col gap-2',
              positionClasses[position],
            )}
            aria-live="polite"
            aria-atomic="false"
          >
            {items.map((item) => {
              const config = variantConfig[item.variant];
              return (
                <div
                  key={item.id}
                  role="status"
                  className={cn(
                    'snackbar-enter pointer-events-auto flex w-full min-w-[16rem] max-w-md items-start gap-3 rounded-card border px-4 py-3 shadow-popover',
                    config.classes,
                  )}
                >
                  <Icon
                    name={config.icon}
                    size={18}
                    className={cn('mt-0.5 shrink-0', config.iconClass)}
                  />
                  <div className="flex-1 text-sm font-medium leading-snug">{item.message}</div>

                  {item.actionLabel && (
                    <button
                      type="button"
                      onClick={() => {
                        item.onAction?.();
                        dismiss(item.id);
                      }}
                      className="shrink-0 text-sm font-semibold underline-offset-2 hover:underline"
                    >
                      {item.actionLabel}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => dismiss(item.id)}
                    className="-mr-1 shrink-0 rounded-control-sm p-0.5 opacity-60 transition-opacity hover:opacity-100"
                    aria-label="닫기"
                  >
                    <Icon name="x" size={16} />
                  </button>
                </div>
              );
            })}
          </div>,
          document.body,
        )}
    </SnackbarContext.Provider>
  );
}
