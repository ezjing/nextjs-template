import { Activity, DollarSign, ShoppingCart, Users } from 'lucide-react';

import { KpiCard, type KpiCardProps } from './KpiCard';

const KPI_DATA: KpiCardProps[] = [
  {
    title: '총 매출',
    value: '₩ 24,532,000',
    change: 12.5,
    changeLabel: '지난달 대비',
    icon: DollarSign,
    iconBg: 'bg-violet-500',
  },
  {
    title: '총 주문',
    value: '1,284',
    change: 8.2,
    changeLabel: '지난달 대비',
    icon: ShoppingCart,
    iconBg: 'bg-blue-500',
  },
  {
    title: '신규 고객',
    value: '432',
    change: -3.1,
    changeLabel: '지난달 대비',
    icon: Users,
    iconBg: 'bg-emerald-500',
  },
  {
    title: '활성 세션',
    value: '87',
    change: 5.7,
    changeLabel: '어제 대비',
    icon: Activity,
    iconBg: 'bg-orange-500',
  },
];

export function KpiSection() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {KPI_DATA.map((kpi) => (
        <KpiCard key={kpi.title} {...kpi} />
      ))}
    </div>
  );
}
