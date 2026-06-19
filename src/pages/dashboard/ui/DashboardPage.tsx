'use client';

import { CalendarDays, Plus } from 'lucide-react';
import { useState } from 'react';

import { RecentActivityFeed } from '@/features/dashboard-activity/ui/RecentActivityFeed';
import { RecentOrdersTable } from '@/features/dashboard-activity/ui/RecentOrdersTable';
import { TopChannelsCard } from '@/features/dashboard-activity/ui/TopChannelsCard';
import { CategoryDonutChart } from '@/features/dashboard-charts/ui/CategoryDonutChart';
import { RevenueChart } from '@/features/dashboard-charts/ui/RevenueChart';
import { SalesBarChart } from '@/features/dashboard-charts/ui/SalesBarChart';
import { KpiSection } from '@/features/dashboard-kpi/ui/KpiSection';
import { DashboardHeader } from '@/widgets/dashboard-header/ui/DashboardHeader';
import { AppSidebar } from '@/widgets/sidebar/ui/AppSidebar';

export function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* 사이드바 */}
      <AppSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* 콘텐츠 영역 */}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        {/* 헤더 */}
        <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* 메인 콘텐츠 */}
        <main className="grow px-4 py-6 sm:px-6 lg:px-8">
          {/* 페이지 제목 + 액션 */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">대시보드</h1>
              <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                비즈니스 현황을 한눈에 확인하세요
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-600 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                <CalendarDays className="h-4 w-4" />
                <span>이번 달</span>
              </button>
              <button className="flex items-center gap-2 rounded-lg bg-violet-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-violet-700">
                <Plus className="h-4 w-4" />
                <span>뷰 추가</span>
              </button>
            </div>
          </div>

          {/* KPI 카드 */}
          <KpiSection />

          {/* 차트 행 1: 매출 추이 (전체 너비) */}
          <div className="mt-6">
            <RevenueChart />
          </div>

          {/* 차트 행 2: 바 차트 + 도넛 차트 */}
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <SalesBarChart />
            <CategoryDonutChart />
          </div>

          {/* 하단 행: 채널 + 활동 피드 */}
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <TopChannelsCard />
            </div>
            <div className="lg:col-span-2">
              <RecentActivityFeed />
            </div>
          </div>

          {/* 최근 주문 테이블 */}
          <div className="mt-6">
            <RecentOrdersTable />
          </div>
        </main>
      </div>
    </div>
  );
}
