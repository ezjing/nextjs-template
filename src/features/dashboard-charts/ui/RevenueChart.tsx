'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface RevenueDatum {
  month: string;
  acmePlus: number;
  acmeAdv: number;
  acmePro: number;
}

const data: RevenueDatum[] = [
  { month: '1월', acmePlus: 3200, acmeAdv: 2100, acmePro: 1400 },
  { month: '2월', acmePlus: 4100, acmeAdv: 2800, acmePro: 1800 },
  { month: '3월', acmePlus: 3800, acmeAdv: 3200, acmePro: 2100 },
  { month: '4월', acmePlus: 5200, acmeAdv: 3900, acmePro: 2400 },
  { month: '5월', acmePlus: 4700, acmeAdv: 4200, acmePro: 2800 },
  { month: '6월', acmePlus: 6100, acmeAdv: 4800, acmePro: 3200 },
  { month: '7월', acmePlus: 5800, acmeAdv: 5100, acmePro: 3500 },
  { month: '8월', acmePlus: 7200, acmeAdv: 5600, acmePro: 3900 },
  { month: '9월', acmePlus: 6900, acmeAdv: 5900, acmePro: 4100 },
  { month: '10월', acmePlus: 8100, acmeAdv: 6400, acmePro: 4500 },
  { month: '11월', acmePlus: 7800, acmeAdv: 6800, acmePro: 4800 },
  { month: '12월', acmePlus: 9200, acmeAdv: 7500, acmePro: 5200 },
];

const LINES = [
  { key: 'acmePlus', label: 'Acme Plus', color: '#8b5cf6' },
  { key: 'acmeAdv', label: 'Acme Advanced', color: '#3b82f6' },
  { key: 'acmePro', label: 'Acme Professional', color: '#10b981' },
] as const;

interface TooltipPayloadItem {
  dataKey: string;
  name: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <p className="mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="text-sm font-medium" style={{ color: p.color }}>
          {p.name}: {p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
}

export function RevenueChart() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white">매출 추이</h3>
        <div className="flex items-center gap-4">
          {LINES.map((l) => (
            <div key={l.key} className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: l.color }} />
              <span className="text-xs text-gray-500 dark:text-gray-400">{l.label}</span>
            </div>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <defs>
            {LINES.map((l) => (
              <linearGradient key={l.key} id={`grad-${l.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={l.color} stopOpacity={0.15} />
                <stop offset="95%" stopColor={l.color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          {LINES.map((l) => (
            <Area
              key={l.key}
              type="monotone"
              dataKey={l.key}
              name={l.label}
              stroke={l.color}
              strokeWidth={2}
              fill={`url(#grad-${l.key})`}
              dot={false}
              activeDot={{ r: 4 }}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
