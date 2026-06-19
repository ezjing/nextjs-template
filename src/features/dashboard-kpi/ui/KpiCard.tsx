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
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', iconBg)}>
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>

      <p className="mt-3 text-2xl font-bold text-gray-800 dark:text-white">{value}</p>

      <div className="mt-2 flex items-center gap-1.5">
        <span
          className={cn(
            'flex items-center gap-0.5 text-sm font-medium',
            isPositive ? 'text-emerald-500' : 'text-red-500',
          )}
        >
          {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          {isPositive ? '+' : ''}
          {change}%
        </span>
        <span className="text-sm text-gray-400">{changeLabel}</span>
      </div>
    </div>
  );
}
