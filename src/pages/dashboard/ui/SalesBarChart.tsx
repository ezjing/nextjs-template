'use client';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface SalesDatum {
  day: string;
  direct: number;
  indirect: number;
}

const data: SalesDatum[] = [
  { day: '월', direct: 420, indirect: 240 },
  { day: '화', direct: 380, indirect: 310 },
  { day: '수', direct: 510, indirect: 280 },
  { day: '목', direct: 470, indirect: 350 },
  { day: '금', direct: 620, indirect: 410 },
  { day: '토', direct: 320, indirect: 190 },
  { day: '일', direct: 280, indirect: 160 },
];

interface TooltipPayloadItem {
  dataKey: string;
  name: string;
  value: number;
  fill: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-card border border-border bg-surface p-3 shadow-popover">
      <p className="mb-2 text-xs font-semibold text-fg-muted">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="text-sm font-medium" style={{ color: p.fill }}>
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
}

export function SalesBarChart() {
  return (
    <div className="rounded-card border border-border bg-surface p-5 shadow-card">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-base font-semibold text-fg">직접 vs 간접 판매</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-chart-1" />
            <span className="text-xs text-fg-muted">직접 판매</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-chart-2" />
            <span className="text-xs text-fg-muted">간접 판매</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 11, fill: 'var(--fg-subtle)' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: 'var(--fg-subtle)' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
          <Bar
            dataKey="direct"
            name="직접 판매"
            fill="var(--chart-1)"
            radius={[4, 4, 0, 0]}
            maxBarSize={24}
          />
          <Bar
            dataKey="indirect"
            name="간접 판매"
            fill="var(--chart-2)"
            radius={[4, 4, 0, 0]}
            maxBarSize={24}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
