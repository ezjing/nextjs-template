import { AlertCircle, CheckCircle, ShoppingCart, Star, UserPlus, type LucideIcon } from 'lucide-react';

interface ActivityItem {
  id: number;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  text: string;
  time: string;
}

const ACTIVITIES: ActivityItem[] = [
  {
    id: 1,
    icon: ShoppingCart,
    iconBg: 'bg-violet-100 dark:bg-violet-900/30',
    iconColor: 'text-violet-600 dark:text-violet-400',
    text: '김민준님이 Acme Plus를 구매했습니다',
    time: '2분 전',
  },
  {
    id: 2,
    icon: UserPlus,
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400',
    text: '새 고객 이서연님이 가입했습니다',
    time: '15분 전',
  },
  {
    id: 3,
    icon: Star,
    iconBg: 'bg-amber-100 dark:bg-amber-900/30',
    iconColor: 'text-amber-600 dark:text-amber-400',
    text: '박도현님이 서비스에 5점을 남겼습니다',
    time: '1시간 전',
  },
  {
    id: 4,
    icon: AlertCircle,
    iconBg: 'bg-red-100 dark:bg-red-900/30',
    iconColor: 'text-red-600 dark:text-red-400',
    text: '결제 실패: 주문 #ORD-8818',
    time: '2시간 전',
  },
  {
    id: 5,
    icon: CheckCircle,
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    text: '월간 리포트 생성 완료',
    time: '3시간 전',
  },
];

export function RecentActivityFeed() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-4 text-base font-semibold text-gray-800 dark:text-white">최근 활동</h3>
      <ul className="space-y-4">
        {ACTIVITIES.map((activity) => (
          <li key={activity.id} className="flex items-start gap-3">
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${activity.iconBg}`}
            >
              <activity.icon className={`h-4 w-4 ${activity.iconColor}`} />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 dark:text-gray-300">{activity.text}</p>
              <p className="mt-0.5 text-xs text-gray-400">{activity.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
