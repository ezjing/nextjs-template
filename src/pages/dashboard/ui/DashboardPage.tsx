import { CalendarDays, Plus } from 'lucide-react';

import { RecentActivityFeed } from '@/features/dashboard-activity/ui/RecentActivityFeed';
import { RecentOrdersTable } from '@/features/dashboard-activity/ui/RecentOrdersTable';
import { TopChannelsCard } from '@/features/dashboard-activity/ui/TopChannelsCard';
import { CategoryDonutChart } from '@/features/dashboard-charts/ui/CategoryDonutChart';
import { RevenueChart } from '@/features/dashboard-charts/ui/RevenueChart';
import { SalesBarChart } from '@/features/dashboard-charts/ui/SalesBarChart';
import { KpiSection } from '@/features/dashboard-kpi/ui/KpiSection';

export function DashboardPage() {
  return (
    <>
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

      <KpiSection />

      <div className="mt-6">
        <RevenueChart />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SalesBarChart />
        <CategoryDonutChart />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <TopChannelsCard />
        </div>
        <div className="lg:col-span-2">
          <RecentActivityFeed />
        </div>
      </div>

      <div className="mt-6">
        <RecentOrdersTable />
      </div>
    </>
  );
}
