'use client';

import { useState } from 'react';

import { cn } from '@/shared/lib/cn';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away';

export interface AvatarProps {
  src?: string;
  alt?: string;
  /** 이미지가 없을 때 이니셜 생성을 위한 이름 */
  name?: string;
  size?: AvatarSize;
  shape?: 'circle' | 'square';
  status?: AvatarStatus;
  className?: string;
}

const sizeMap: Record<AvatarSize, string> = {
  xs: 'h-6 w-6 text-[10px]',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
};

const statusColor: Record<AvatarStatus, string> = {
  online: 'bg-emerald-500',
  offline: 'bg-slate-400',
  busy: 'bg-rose-500',
  away: 'bg-amber-500',
};

const statusSize: Record<AvatarSize, string> = {
  xs: 'h-1.5 w-1.5',
  sm: 'h-2 w-2',
  md: 'h-2.5 w-2.5',
  lg: 'h-3 w-3',
  xl: 'h-3.5 w-3.5',
};

function getInitials(name?: string): string {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function Avatar({
  src,
  alt,
  name,
  size = 'md',
  shape = 'circle',
  status,
  className,
}: AvatarProps) {
  const [errored, setErrored] = useState(false);
  const showImage = src && !errored;
  const radius = shape === 'circle' ? 'rounded-full' : 'rounded-lg';

  return (
    <span className={cn('relative inline-flex shrink-0', className)}>
      <span
        className={cn(
          'inline-flex items-center justify-center overflow-hidden font-semibold',
          'bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300',
          sizeMap[size],
          radius,
        )}
      >
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt ?? name ?? 'avatar'}
            className="h-full w-full object-cover"
            onError={() => setErrored(true)}
          />
        ) : (
          getInitials(name)
        )}
      </span>

      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full ring-2 ring-white dark:ring-slate-900',
            statusColor[status],
            statusSize[size],
          )}
          aria-label={status}
        />
      )}
    </span>
  );
}
