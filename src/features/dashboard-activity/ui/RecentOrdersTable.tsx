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
  완료: 'bg-success-subtle text-success-fg',
  처리중: 'bg-info-subtle text-info-fg',
  취소: 'bg-danger-subtle text-danger-fg',
};

export function RecentOrdersTable() {
  return (
    <div className="rounded-card border border-border bg-surface shadow-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h3 className="text-base font-semibold text-fg">최근 주문</h3>
        <button className="text-sm text-primary-fg hover:underline">
          전체 보기
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {['주문번호', '고객', '상품', '날짜', '금액', '상태'].map((h) => (
                <th
                  key={h}
                  className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-fg-subtle"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {ORDERS.map((order) => (
              <tr
                key={order.id}
                className="transition-colors hover:bg-surface-subtle"
              >
                <td className="px-5 py-3 font-mono font-medium text-fg-secondary">
                  {order.id}
                </td>
                <td className="px-5 py-3 text-fg-secondary">{order.customer}</td>
                <td className="px-5 py-3 text-fg-secondary">{order.product}</td>
                <td className="px-5 py-3 text-fg-muted">{order.date}</td>
                <td className="px-5 py-3 font-medium text-fg-secondary">
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
