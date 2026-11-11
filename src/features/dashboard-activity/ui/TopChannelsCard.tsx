interface Channel {
  name: string;
  sessions: number;
  percent: number;
}

const CHANNELS: Channel[] = [
  { name: '직접 방문', sessions: 4821, percent: 48 },
  { name: '검색 엔진', sessions: 2934, percent: 29 },
  { name: '소셜 미디어', sessions: 1241, percent: 12 },
  { name: '이메일', sessions: 710, percent: 7 },
  { name: '기타', sessions: 412, percent: 4 },
];

const BAR_COLORS = [
  'bg-chart-1',
  'bg-chart-2',
  'bg-chart-3',
  'bg-chart-4',
  'bg-fg-subtle', // 기타 — 중립 회색
];

export function TopChannelsCard() {
  return (
    <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
      <h3 className="mb-4 text-base font-semibold text-fg">상위 채널</h3>
      <ul className="space-y-3">
        {CHANNELS.map((ch, i) => (
          <li key={ch.name}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="font-medium text-fg-secondary">{ch.name}</span>
              <span className="text-fg-muted">
                {ch.sessions.toLocaleString()}
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
              <div
                className={`h-full rounded-full ${BAR_COLORS[i]}`}
                style={{ width: `${ch.percent}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
