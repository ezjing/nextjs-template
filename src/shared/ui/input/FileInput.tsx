'use client';

import { useId, useRef, useState, type DragEvent } from 'react';

import { Icon } from '@/shared/config/icons';
import { cn } from '@/shared/lib/cn';

export interface FileInputProps {
  label?: string;
  error?: string;
  hint?: string;
  /** 선택된 파일 목록 (제어 컴포넌트) */
  value?: File[];
  onChange?: (files: File[]) => void;
  /** 다중 선택 허용 */
  multiple?: boolean;
  /** 허용 확장자/타입 (예: "image/*,.pdf") */
  accept?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  /** 안내 문구 */
  placeholder?: string;
  wrapperClassName?: string;
  className?: string;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileInput({
  label,
  error,
  hint,
  value = [],
  onChange,
  multiple = false,
  accept,
  disabled = false,
  fullWidth = false,
  placeholder = '파일을 끌어다 놓거나 클릭하여 첨부',
  wrapperClassName,
  className,
}: FileInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const fieldId = useId();

  const emit = (incoming: FileList | File[]) => {
    const next = Array.from(incoming);
    onChange?.(multiple ? [...value, ...next] : next.slice(0, 1));
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    if (disabled) return;
    if (e.dataTransfer.files?.length) emit(e.dataTransfer.files);
  };

  const removeAt = (index: number) => {
    onChange?.(value.filter((_, i) => i !== index));
  };

  return (
    <div className={cn('flex flex-col gap-1', fullWidth && 'w-full', wrapperClassName)}>
      {label && (
        <label htmlFor={fieldId} className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}

      <div
        onClick={() => !disabled && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-4 py-6 text-center transition-colors',
          dragging
            ? 'border-violet-500 bg-violet-50 dark:bg-violet-500/10'
            : 'border-slate-300 bg-slate-50 hover:border-violet-400 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800/50 dark:hover:bg-slate-800',
          error && 'border-rose-500',
          disabled && 'cursor-not-allowed opacity-60',
          className,
        )}
      >
        <Icon name="upload" size={22} className="text-slate-400" />
        <p className="text-sm text-slate-500 dark:text-slate-400">{placeholder}</p>
        {accept && <p className="text-xs text-slate-400">허용 형식: {accept}</p>}

        <input
          ref={inputRef}
          id={fieldId}
          type="file"
          className="hidden"
          multiple={multiple}
          accept={accept}
          disabled={disabled}
          onChange={(e) => {
            if (e.target.files?.length) emit(e.target.files);
            e.target.value = '';
          }}
        />
      </div>

      {value.length > 0 && (
        <ul className="mt-1 flex flex-col gap-1.5">
          {value.map((file, idx) => (
            <li
              key={`${file.name}-${idx}`}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
            >
              <Icon name="fileText" size={16} className="shrink-0 text-violet-500" />
              <span className="flex-1 truncate text-sm text-slate-700 dark:text-slate-200">
                {file.name}
              </span>
              <span className="shrink-0 text-xs text-slate-400">{formatSize(file.size)}</span>
              {!disabled && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeAt(idx);
                  }}
                  className="shrink-0 rounded p-0.5 text-slate-400 transition-colors hover:text-rose-500"
                  aria-label={`${file.name} 삭제`}
                >
                  <Icon name="x" size={15} />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {error && (
        <p className="text-xs text-rose-500" role="alert">
          {error}
        </p>
      )}
      {!error && hint && <p className="text-xs text-slate-500 dark:text-slate-400">{hint}</p>}
    </div>
  );
}
