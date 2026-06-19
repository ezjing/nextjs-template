import { cn } from '@/shared/lib/cn';

type OrderStatus = '완료' | '처리중' | '취소';

interface Order {
  id: string;
  customer: string;
  product: string;
  date: string;
  amount: string;
  status: OrderStatus;
}

const ORDERS: Order[] = [
  {
    id: '#ORD-8821',
    customer: '김민준',
    product: 'Acme Plus',
    date: '2026-06-08',
    amount: '₩ 320,000',
    status: '완료',
  },
  {
    id: '#ORD-8820',
    customer: '이서연',
    product: 'Acme Advanced',
    date: '2026-06-07',
    amount: '₩ 180,000',
    status: '처리중',
  },
  {
    id: '#ORD-8819',
    customer: '박도현',
    product: 'Acme Professional',
    date: '2026-06-07',
    amount: '₩ 540,000',
    status: '완료',
  },
  {
    id: '#ORD-8818',
    customer: '최수아',
    product: 'Acme Plus',
    date: '2026-06-06',
    amount: '₩ 320,000',
    status: '취소',
  },
  {
    id: '#ORD-8817',
    customer: '정지호',
    product: 'Acme Advanced',
    date: '2026-06-06',
    amount: '₩ 180,000',
    status: '처리중',
  },
  {
    id: '#ORD-8816',
    customer: '강예린',
    product: 'Acme Professional',
    date: '2026-06-05',
    amount: '₩ 540,000',
    status: '완료',
  },
];

const STATUS_STYLE: Record<OrderStatus, string> = {
  완료: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  처리중: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  취소: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

export function RecentOrdersTable() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-700">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white">최근 주문</h3>
        <button className="text-sm text-violet-600 hover:underline dark:text-violet-400">
          전체 보기
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-700">
              {['주문번호', '고객', '상품', '날짜', '금액', '상태'].map((h) => (
                <th
                  key={h}
                  className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {ORDERS.map((order) => (
              <tr
                key={order.id}
                className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/30"
              >
                <td className="px-5 py-3 font-mono font-medium text-gray-700 dark:text-gray-200">
                  {order.id}
                </td>
                <td className="px-5 py-3 text-gray-600 dark:text-gray-300">{order.customer}</td>
                <td className="px-5 py-3 text-gray-600 dark:text-gray-300">{order.product}</td>
                <td className="px-5 py-3 text-gray-500 dark:text-gray-400">{order.date}</td>
                <td className="px-5 py-3 font-medium text-gray-700 dark:text-gray-200">
                  {order.amount}
                </td>
                <td className="px-5 py-3">
                  <span
                    className={cn(
                      'inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium',
                      STATUS_STYLE[order.status],
                    )}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
