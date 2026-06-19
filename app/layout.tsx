import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { AppProviders } from '@/app/providers/AppProviders';

import '@/app/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Next.js FSD Template',
    template: '%s | Next.js FSD Template',
  },
  description: 'React + JS FSD 템플릿을 Next.js + TS 로 이식한 FSD 구조 템플릿',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
