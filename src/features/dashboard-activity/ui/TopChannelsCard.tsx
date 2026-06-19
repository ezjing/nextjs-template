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
  'bg-violet-500',
  'bg-blue-500',
  'bg-emerald-500',
  'bg-orange-400',
  'bg-gray-400',
];

export function TopChannelsCard() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-4 text-base font-semibold text-gray-800 dark:text-white">상위 채널</h3>
      <ul className="space-y-3">
        {CHANNELS.map((ch, i) => (
          <li key={ch.name}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="font-medium text-gray-600 dark:text-gray-300">{ch.name}</span>
              <span className="text-gray-500 dark:text-gray-400">
                {ch.sessions.toLocaleString()}
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
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
