'use client';

import type { ReactNode } from 'react';

import { ErrorBoundary } from '@/shared/ui/error-boundary/ErrorBoundary';
import { SnackbarProvider } from '@/shared/ui/snackbar/Snackbar';

import { QueryProvider } from './QueryProvider';
import { StoreProvider } from './StoreProvider';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      <StoreProvider>
        <QueryProvider>
          <SnackbarProvider>{children}</SnackbarProvider>
        </QueryProvider>
      </StoreProvider>
    </ErrorBoundary>
  );
}
