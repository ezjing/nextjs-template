'use client';

import { useState } from 'react';

import { MemberFcmTable } from '@/features/member-list/ui/MemberFcmTable';
import { MemberTable } from '@/features/member-list/ui/MemberTable';
import { DashboardHeader } from '@/widgets/dashboard-header/ui/DashboardHeader';
import { AppSidebar } from '@/widgets/sidebar/ui/AppSidebar';

export function CommunityUsersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<string | undefined>(undefined);

  const handleSelectMember = (id: string, name: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
    setSelectedName(name);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <AppSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">회원 목록</h1>
            <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
              TB_BS_MEMBER 테이블의 전체 회원을 조회합니다.
            </p>
          </div>

          <MemberTable selectedId={selectedId} onSelectId={handleSelectMember} />

          {selectedId && (
            <MemberFcmTable selectedId={selectedId} selectedName={selectedName} />
          )}
        </main>
      </div>
    </div>
  );
}
