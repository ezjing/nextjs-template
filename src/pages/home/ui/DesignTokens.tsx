/**
 * 디자인 토큰 견본
 * - src/app/styles/tokens.css 에 정의된 토큰을 화면으로 보여줍니다.
 * - 토큰을 추가·삭제하면 아래 목록도 함께 수정하세요. (명세: docs/design-tokens.md)
 * - 다크모드 토글을 켜면 Dark 값으로 바뀝니다.
 */

interface ColorToken {
  name: string;
  /** 사용 예시 클래스 */
  usage: string;
  kind: 'fill' | 'text' | 'border';
}

const COLOR_GROUPS: { title: string; tokens: ColorToken[] }[] = [
  {
    title: '배경 / 면',
    tokens: [
      { name: 'bg', usage: 'bg-bg', kind: 'fill' },
      { name: 'surface', usage: 'bg-surface', kind: 'fill' },
      { name: 'surface-muted', usage: 'bg-surface-muted', kind: 'fill' },
      { name: 'surface-subtle', usage: 'bg-surface-subtle', kind: 'fill' },
      { name: 'surface-strong', usage: 'bg-surface-strong', kind: 'fill' },
      { name: 'surface-inverse', usage: 'bg-surface-inverse', kind: 'fill' },
      { name: 'overlay', usage: 'bg-overlay', kind: 'fill' },
    ],
  },
  {
    title: '글자',
    tokens: [
      { name: 'fg', usage: 'text-fg', kind: 'text' },
      { name: 'fg-secondary', usage: 'text-fg-secondary', kind: 'text' },
      { name: 'fg-muted', usage: 'text-fg-muted', kind: 'text' },
      { name: 'fg-subtle', usage: 'text-fg-subtle', kind: 'text' },
      { name: 'fg-on-primary', usage: 'text-fg-on-primary', kind: 'text' },
      { name: 'fg-inverse', usage: 'text-fg-inverse', kind: 'text' },
    ],
  },
  {
    title: '테두리 / 포커스',
    tokens: [
      { name: 'border', usage: 'border-border', kind: 'border' },
      { name: 'border-strong', usage: 'border-border-strong', kind: 'border' },
      { name: 'ring', usage: 'ring-ring', kind: 'border' },
    ],
  },
  {
    title: '브랜드',
    tokens: [
      { name: 'primary', usage: 'bg-primary', kind: 'fill' },
      { name: 'primary-hover', usage: 'bg-primary-hover', kind: 'fill' },
      { name: 'primary-active', usage: 'bg-primary-active', kind: 'fill' },
      { name: 'primary-fg', usage: 'text-primary-fg', kind: 'text' },
      { name: 'primary-subtle', usage: 'bg-primary-subtle', kind: 'fill' },
    ],
  },
  ...(['success', 'warning', 'danger', 'info'] as const).map((status) => ({
    title: `상태 — ${status}`,
    tokens: [
      { name: status, usage: `bg-${status}`, kind: 'fill' as const },
      { name: `${status}-hover`, usage: `bg-${status}-hover`, kind: 'fill' as const },
      { name: `${status}-fg`, usage: `text-${status}-fg`, kind: 'text' as const },
      { name: `${status}-subtle`, usage: `bg-${status}-subtle`, kind: 'fill' as const },
      { name: `${status}-border`, usage: `border-${status}-border`, kind: 'border' as const },
    ],
  })),
  {
    title: '차트 데이터 (순서대로 사용)',
    tokens: [1, 2, 3, 4, 5].map((n) => ({
      name: `chart-${n}`,
      usage: `var(--chart-${n}) · bg-chart-${n}`,
      kind: 'fill' as const,
    })),
  },
];

const RADIUS_TOKENS = [
  { usage: 'rounded-control', desc: '버튼, 입력창', value: 'var(--radius-control)' },
  { usage: 'rounded-card', desc: '카드, 모달', value: 'var(--radius-card)' },
  { usage: 'rounded-full', desc: '아바타, 배지', value: '9999px' },
];

const SHADOW_TOKENS = [
  { usage: 'shadow-card', desc: '카드', value: 'var(--shadow-card)' },
  { usage: 'shadow-popover', desc: '드롭다운, 툴팁', value: 'var(--shadow-popover)' },
  { usage: 'shadow-modal', desc: '모달, 드로어', value: 'var(--shadow-modal)' },
];

const CONTROL_HEIGHT_TOKENS = [
  { usage: 'h-control-sm', value: 'var(--spacing-control-sm)', px: '32px' },
  { usage: 'h-control-md', value: 'var(--spacing-control-md)', px: '36px' },
  { usage: 'h-control-lg', value: 'var(--spacing-control-lg)', px: '44px' },
];

function Swatch({ token }: { token: ColorToken }) {
  const color = `var(--${token.name})`;
  const onPrimary = token.name === 'fg-on-primary';
  const onInverse = token.name === 'fg-inverse';

  return (
    <div className="flex items-center gap-3">
      {token.kind === 'fill' && (
        <div className="size-10 shrink-0 rounded-control border border-border" style={{ background: color }} />
      )}
      {token.kind === 'text' && (
        <div
          className="flex size-10 shrink-0 items-center justify-center rounded-control border border-border text-sm font-semibold"
          style={{
            color,
            background: onPrimary ? 'var(--primary)' : onInverse ? 'var(--surface-inverse)' : 'var(--surface)',
          }}
        >
          Aa
        </div>
      )}
      {token.kind === 'border' && (
        <div className="size-10 shrink-0 rounded-control border-2 bg-surface" style={{ borderColor: color }} />
      )}
      <div className="min-w-0">
        <p className="truncate font-mono text-xs font-semibold text-fg">{token.name}</p>
        <p className="truncate font-mono text-xs text-fg-muted">{token.usage}</p>
      </div>
    </div>
  );
}

function GroupTitle({ children }: { children: string }) {
  return <h3 className="text-xs font-semibold text-fg-secondary">{children}</h3>;
}

export function DesignTokens() {
  return (
    <section className="space-y-6 rounded-card border border-border bg-surface p-6 shadow-card">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-fg-subtle">
          Design Tokens
        </h2>
        <p className="mt-1 text-xs text-fg-muted">
          src/app/styles/tokens.css · 명세 docs/design-tokens.md · 다크모드에서 값이 바뀝니다
        </p>
      </div>

      {COLOR_GROUPS.map((group) => (
        <div key={group.title} className="space-y-3">
          <GroupTitle>{group.title}</GroupTitle>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {group.tokens.map((token) => (
              <Swatch key={token.name} token={token} />
            ))}
          </div>
        </div>
      ))}

      <div className="space-y-3">
        <GroupTitle>모서리 (Radius)</GroupTitle>
        <div className="flex flex-wrap gap-4">
          {RADIUS_TOKENS.map((t) => (
            <div key={t.usage} className="space-y-1">
              <div
                className="size-16 border-2 border-primary bg-primary-subtle"
                style={{ borderRadius: t.value }}
              />
              <p className="font-mono text-xs font-semibold text-fg">{t.usage}</p>
              <p className="text-xs text-fg-muted">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <GroupTitle>그림자 (Shadow)</GroupTitle>
        <div className="flex flex-wrap gap-6">
          {SHADOW_TOKENS.map((t) => (
            <div key={t.usage} className="space-y-2">
              <div className="size-20 rounded-card bg-surface" style={{ boxShadow: t.value }} />
              <p className="font-mono text-xs font-semibold text-fg">{t.usage}</p>
              <p className="text-xs text-fg-muted">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <GroupTitle>입력 요소 높이 (Button · Input · Select …)</GroupTitle>
        <div className="flex flex-wrap items-end gap-4">
          {CONTROL_HEIGHT_TOKENS.map((t) => (
            <div key={t.usage} className="space-y-1">
              <div
                className="flex w-28 items-center justify-center rounded-control border border-border-strong bg-surface-muted text-xs text-fg-secondary"
                style={{ height: t.value }}
              >
                {t.px}
              </div>
              <p className="font-mono text-xs font-semibold text-fg">{t.usage}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
