import { TrendingDown, TrendingUp, type LucideIcon } from 'lucide-react';

import { cn } from '@/shared/lib/cn';

export interface KpiCardProps {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: LucideIcon;
  iconBg: string;
}

export function KpiCard({ title, value, change, changeLabel, icon: Icon, iconBg }: KpiCardProps) {
  const isPositive = change >= 0;

  return (
    <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-fg-muted">{title}</p>
        <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', iconBg)}>
          <Icon className="h-5 w-5 text-fg-on-primary" />
        </div>
      </div>

      <p className="mt-3 text-2xl font-bold text-fg">{value}</p>

      <div className="mt-2 flex items-center gap-1.5">
        <span
          className={cn(
            'flex items-center gap-0.5 text-sm font-medium',
            isPositive ? 'text-success-fg' : 'text-danger-fg',
          )}
        >
          {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          {isPositive ? '+' : ''}
          {change}%
        </span>
        <span className="text-sm text-fg-subtle">{changeLabel}</span>
      </div>
    </div>
  );
}
