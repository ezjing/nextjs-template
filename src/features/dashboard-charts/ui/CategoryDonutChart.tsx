'use client';

import { useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

interface CategoryDatum {
  name: string;
  value: number;
}

const data: CategoryDatum[] = [
  { name: '미국', value: 38.6 },
  { name: '유럽', value: 22.5 },
  { name: '아시아', value: 18.9 },
  { name: '기타', value: 20.0 },
];

/** 데이터 순서대로 차트 토큰 색 (chart-1 ~ chart-5) */
const chartColor = (index: number) => `var(--chart-${(index % 5) + 1})`;

export function CategoryDonutChart() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = data[activeIndex];

  return (
    <div className="rounded-card border border-border bg-surface p-5 shadow-card">
      <h3 className="mb-4 text-base font-semibold text-fg">국가별 매출 비중</h3>
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <div className="relative" style={{ width: 200, height: 200 }}>
          <ResponsiveContainer width={200} height={200}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
                onMouseEnter={(_, index) => setActiveIndex(index)}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={chartColor(index)}
                    opacity={index === activeIndex ? 1 : 0.35}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* 중앙 라벨 오버레이 */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-base font-bold text-fg">{active.value}%</span>
            <span className="text-xs text-fg-subtle">{active.name}</span>
          </div>
        </div>

        <ul className="flex-1 space-y-2.5">
          {data.map((item, index) => (
            <li
              key={item.name}
              className="flex cursor-pointer items-center justify-between"
              onMouseEnter={() => setActiveIndex(index)}
            >
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: chartColor(index) }} />
                <span className="text-sm text-fg-secondary">{item.name}</span>
              </div>
              <span className="text-sm font-semibold text-fg">
                {item.value}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
