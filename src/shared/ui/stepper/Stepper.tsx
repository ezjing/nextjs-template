'use client';

import type { ReactNode } from 'react';

import { Icon } from '@/shared/config/icons';
import { cn } from '@/shared/lib/cn';

export interface Step {
  label: ReactNode;
  description?: ReactNode;
}

export interface StepperProps {
  steps: Step[];
  /** 현재 단계 (0-based). 이전 단계는 완료로 표시 */
  current: number;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function Stepper({ steps, current, orientation = 'horizontal', className }: StepperProps) {
  const isVertical = orientation === 'vertical';

  return (
    <ol
      className={cn(
        'flex',
        isVertical ? 'flex-col gap-0' : 'w-full items-start',
        className,
      )}
    >
      {steps.map((step, idx) => {
        const completed = idx < current;
        const active = idx === current;
        const isLast = idx === steps.length - 1;

        return (
          <li
            key={idx}
            className={cn(
              'flex',
              isVertical ? 'gap-3' : 'flex-1 flex-col items-center text-center',
              !isVertical && !isLast && 'relative',
            )}
          >
            <div className={cn('flex', isVertical ? 'flex-col items-center' : 'w-full items-center')}>
              {/* 가로형 왼쪽 라인 */}
              {!isVertical && (
                <span
                  className={cn(
                    'h-0.5 flex-1',
                    idx === 0 ? 'opacity-0' : completed || active ? 'bg-primary' : 'bg-surface-strong',
                  )}
                />
              )}

              <span
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors',
                  completed && 'border-primary bg-primary text-fg-on-primary',
                  active && 'border-primary bg-surface text-primary-fg',
                  !completed && !active && 'border-border-strong bg-surface text-fg-subtle',
                )}
              >
                {completed ? <Icon name="check" size={16} /> : idx + 1}
              </span>

              {/* 가로형 오른쪽 라인 */}
              {!isVertical && (
                <span
                  className={cn(
                    'h-0.5 flex-1',
                    isLast ? 'opacity-0' : completed ? 'bg-primary' : 'bg-surface-strong',
                  )}
                />
              )}

              {/* 세로형 연결선 */}
              {isVertical && !isLast && (
                <span
                  className={cn(
                    'my-1 w-0.5 flex-1',
                    completed ? 'bg-primary' : 'bg-surface-strong',
                  )}
                />
              )}
            </div>

            <div className={cn(isVertical ? 'pb-6 pt-1' : 'mt-2')}>
              <p
                className={cn(
                  'text-sm font-medium',
                  active
                    ? 'text-fg'
                    : 'text-fg-muted',
                )}
              >
                {step.label}
              </p>
              {step.description && (
                <p className="mt-0.5 text-xs text-fg-subtle">{step.description}</p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
