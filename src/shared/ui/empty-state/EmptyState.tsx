'use client';

import type { ReactNode } from 'react';

import { Icon, type IconType } from '@/shared/config/icons';
import { cn } from '@/shared/lib/cn';

export interface EmptyStateProps {
  /** 아이콘 이름 또는 커스텀 노드 */
  icon?: IconType | ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** 액션 버튼 등 */
  action?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const iconBox = {
  sm: 'h-10 w-10',
  md: 'h-14 w-14',
  lg: 'h-16 w-16',
} as const;

const iconSize = { sm: 20, md: 26, lg: 30 } as const;

export function EmptyState({
  icon = 'inbox',
  title,
  description,
  action,
  size = 'md',
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 px-6 py-10 text-center',
        className,
      )}
    >
      <div
        className={cn(
          'flex items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-700 dark:text-slate-500',
          iconBox[size],
        )}
      >
        {typeof icon === 'string' ? <Icon name={icon as IconType} size={iconSize[size]} /> : icon}
      </div>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{title}</p>
        {description && (
          <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
        )}
      </div>
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}
