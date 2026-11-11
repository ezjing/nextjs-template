import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * 디자인 토큰(tokens.css @theme inline)의 radius / shadow / 높이 이름을 tailwind-merge 에 알려줍니다.
 * 이 설정이 없으면 cn('rounded-card', 'rounded-full'), cn('h-control-md', 'h-12') 처럼
 * 충돌하는 클래스가 정리되지 않습니다.
 * 색상 토큰(bg-surface, text-fg-muted 등)은 기본 설정으로 인식되므로 등록하지 않아도 됩니다.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      radius: ['control', 'card'],
      shadow: ['card', 'popover', 'modal'],
      spacing: ['control-sm', 'control-md', 'control-lg'],
    },
  },
});

/**
 * Tailwind 클래스 충돌 없이 조합
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
