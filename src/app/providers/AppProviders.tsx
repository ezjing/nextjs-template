'use client';

import type { ReactNode } from 'react';

import { ErrorBoundary } from '@/shared/ui/error-boundary/ErrorBoundary';

import { QueryProvider } from './QueryProvider';
import { StoreProvider } from './StoreProvider';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      <StoreProvider>
        <QueryProvider>{children}</QueryProvider>
      </StoreProvider>
    </ErrorBoundary>
  );
}
