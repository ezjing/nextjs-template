'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';

import { DashboardHeader } from '@/widgets/dashboard-header/ui/DashboardHeader';
import { AppSidebar } from '@/widgets/sidebar/ui/AppSidebar';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <AppSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
