'use client';

import {
  createContext,
  forwardRef,
  useContext,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';

import { cn } from '@/shared/lib/cn';

interface RadioGroupContextValue {
  name?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: ReactNode;
  description?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  wrapperClassName?: string;
}

const dotSizes = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
} as const;

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, description, size = 'md', className, wrapperClassName, id, disabled, value, ...props },
  ref,
) {
  const group = useContext(RadioGroupContext);
  const radioId =
    id ?? (typeof label === 'string' ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  const isDisabled = disabled ?? group?.disabled;
  const checked = group ? group.value === value : props.checked;

  return (
    <label
      htmlFor={radioId}
      className={cn(
        'inline-flex items-start gap-2.5',
        isDisabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
        wrapperClassName,
      )}
    >
      <span className="relative inline-flex shrink-0 items-center justify-center">
        <input
          ref={ref}
          id={radioId}
          type="radio"
          name={group?.name ?? props.name}
          value={value}
          checked={checked}
          disabled={isDisabled}
          onChange={(e) => {
            group?.onChange?.(e.target.value);
            props.onChange?.(e);
          }}
          className={cn(
            'peer appearance-none rounded-full border bg-white transition-colors duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-1',
            'checked:border-violet-600',
            'disabled:cursor-not-allowed',
            'dark:bg-slate-800',
            'border-slate-300 dark:border-slate-600',
            dotSizes[size],
            className,
          )}
          {...props}
        />
        <span className="pointer-events-none absolute hidden h-1/2 w-1/2 rounded-full bg-violet-600 peer-checked:block" />
      </span>

      {(label || description) && (
        <span className="flex flex-col gap-0.5">
          {label && (
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
          )}
          {description && (
            <span className="text-xs text-slate-500 dark:text-slate-400">{description}</span>
          )}
        </span>
      )}
    </label>
  );
});

export interface RadioGroupProps {
  label?: string;
  name?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  error?: string;
  hint?: string;
  disabled?: boolean;
  /** 가로 정렬 여부 */
  orientation?: 'vertical' | 'horizontal';
  children: ReactNode;
  className?: string;
}

export function RadioGroup({
  label,
  name,
  value,
  onChange,
  error,
  hint,
  disabled,
  orientation = 'vertical',
  children,
  className,
}: RadioGroupProps) {
  return (
    <fieldset className={cn('flex flex-col gap-2', className)}>
      {label && (
        <legend className="mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </legend>
      )}
      <RadioGroupContext.Provider value={{ name, value, onChange, disabled }}>
        <div className={cn('flex gap-3', orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap')}>
          {children}
        </div>
      </RadioGroupContext.Provider>
      {error && (
        <p className="text-xs text-rose-500" role="alert">
          {error}
        </p>
      )}
      {!error && hint && <p className="text-xs text-slate-500 dark:text-slate-400">{hint}</p>}
    </fieldset>
  );
}
