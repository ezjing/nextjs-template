# 디자인 토큰 (v0.2)

> 상태: **v0.2 코드 반영 완료 — 디자이너 검토 전** (`src/app/styles/tokens.css`)
> 화면 견본: `/showcase` 페이지 맨 위 **Design Tokens** 섹션
> 근거: 2026-11-11 기준 `src/` 전체에서 실제 사용 중인 Tailwind 클래스 빈도 분석
> 원칙: 현재 화면이 **바뀌지 않도록** 지금 쓰는 값을 그대로 토큰으로 옮겼습니다.

## 새 프로젝트에 적용하기

이 템플릿을 복사한 뒤 아래 순서대로 진행하세요. **대부분 `tokens.css` 맨 위 "브랜드" 블록만 바꾸면 됩니다.**

- [ ] **브랜드 색** — `tokens.css` 브랜드 블록에서 `violet`을 원하는 팔레트 이름으로 모두 바꾸기 (예: `blue`). 11줄
  - Tailwind 기본 팔레트에 없는 색이면 `@theme`에 `--color-{이름}-50` ~ `-950`을 먼저 추가 (mauve 예시 참고)
- [ ] **중립 회색** — 브랜드 블록에서 `gray`를 원하는 회색 계열로 모두 바꾸기 (`slate`, `zinc`, `neutral`, `stone` …). 11줄
- [ ] **모서리** — `--brand-radius` 값 바꾸기. `rounded-control`은 이 값, `rounded-card`는 1.5배로 자동 계산
- [ ] **글꼴** — `--brand-font-sans`, `--brand-font-display` 바꾸기
  - 웹폰트라면 폰트를 불러오는 코드(`app/layout.tsx`의 `next/font` 등)도 추가하기 — 현재 템플릿은 Pretendard를 불러오지 않습니다
- [ ] **상태 색** (선택) — success / warning / danger / info 색을 바꿔야 하면 Semantic 영역에서 해당 줄 수정
- [ ] **확인** — `npm run dev` 후 `/showcase`의 Design Tokens 섹션에서 라이트·다크 모두 확인
- [ ] **Figma** — 디자이너에게 같은 값으로 Figma Variables `Primitive` / `Semantic`을 맞춰 달라고 요청

## 운영 규칙

1. **원본은 Figma** — 토큰 추가/변경은 Figma Variables에서 먼저 하고, 코드(`src/app/styles/tokens.css`)에 같은 이름으로 반영합니다.
2. **화면에는 Semantic 토큰만** — 디자이너는 `Semantic` 컬렉션 변수만, 개발자는 `bg-surface`, `text-fg-muted` 같은 토큰 클래스만 사용합니다. `gray-500` 같은 팔레트 색은 직접 쓰지 않습니다.
3. **이름은 양쪽이 동일** — Figma `Semantic / fg-muted` = CSS `--fg-muted` = Tailwind `text-fg-muted`.

## Figma Variables 구성

```
📁 Primitive   Tailwind 기본 팔레트 (gray, violet, red, emerald, amber, sky, white, black)
📁 Brand       brand/50~950, neutral/50~950 — Primitive 를 참조 (프로젝트마다 바뀌는 부분)
📁 Semantic    모드: Light / Dark — 값은 Brand·Primitive 변수를 참조 (chart-1 ~ 5 포함)
📁 Size        radius, shadow, control 높이
```

---

## 0. 브랜드 (tokens.css 맨 위)

프로젝트마다 바뀌는 값만 모아 둔 영역입니다. 아래 Semantic 토큰의 표에서 `gray-*`는 실제로 `--neutral-*`, `violet-*`는 `--brand-*`를 거쳐 참조합니다.

| 변수 | 현재 값 | 영향 |
|---|---|---|
| `--brand-50` ~ `--brand-950` | violet | primary, ring 등 브랜드 색 전체 |
| `--neutral-50` ~ `--neutral-950` | gray | 배경, 글자, 테두리 전체 |
| `--brand-radius` | 0.5rem | `rounded-control`(= 값), `rounded-card`(= 1.5배) |
| `--brand-font-sans` | 시스템 폰트 | `font-sans`, 기본 글꼴 |
| `--brand-font-display` | Pretendard | `font-display` |

## 1. 색상 (Semantic)

### 배경 / 면

| 토큰 | Tailwind 클래스 | Light | Dark | 용도 | 현재 코드 근거 |
|---|---|---|---|---|---|
| `bg` | `bg-bg` | gray-50 | gray-900 | 페이지 바탕 | MainLayout `bg-gray-50 dark:bg-gray-900` |
| `surface` | `bg-surface` | white | gray-800 | 카드, 패널, 모달, 입력창 | `bg-white`(36) / `dark:bg-slate-800`(22) |
| `surface-muted` | `bg-surface-muted` | gray-100 | gray-700 | hover 배경, secondary 버튼 | `bg-slate-100`, `hover:bg-slate-100`(13) / `dark:bg-slate-700`(14) |
| `surface-subtle` | `bg-surface-subtle` | gray-50 | gray-800/50 | disabled 입력창, 약한 강조 | `disabled:bg-slate-50`(6) / `dark:bg-slate-800/50` |
| `surface-strong` | `bg-surface-strong` | gray-200 | gray-600 | 진한 면: Skeleton, Progress·Slider 트랙, Toggle 꺼짐, Secondary 버튼 hover | `bg-slate-200`, `bg-slate-300` |
| `surface-inverse` | `bg-surface-inverse` | gray-900 | gray-700 | 반전 면: Tooltip | `bg-slate-900 dark:bg-slate-700` |
| `overlay` | `bg-overlay` | black/50 | black/50 | 모달·드로어 뒤 dim | `bg-black/50` |

### 글자

| 토큰 | Tailwind 클래스 | Light | Dark | 용도 | 현재 코드 근거 |
|---|---|---|---|---|---|
| `fg` | `text-fg` | gray-900 | gray-100 | 제목, 강조 본문 | `text-slate-900`(14), `text-gray-800`(14) / `dark:text-slate-100`(16) |
| `fg-secondary` | `text-fg-secondary` | gray-700 | gray-300 | 일반 본문, 라벨 | `text-slate-700`(23) / `dark:text-slate-300`(29) |
| `fg-muted` | `text-fg-muted` | gray-500 | gray-400 | 보조 설명, 캡션 | `text-slate-500`(26), `text-gray-500`(19) / `dark:text-slate-400`(25) |
| `fg-subtle` | `text-fg-subtle` | gray-400 | gray-400 | placeholder, 비활성 글자, 아이콘 | `text-slate-400`(63) |
| `fg-inverse` | `text-fg-inverse` | white | white | 반전 면 위 글자 | Tooltip `text-white` |
| `fg-on-primary` | `text-fg-on-primary` | white | white | 색 배경 위 글자 | `text-white`(27) |

### 테두리 / 포커스

| 토큰 | Tailwind 클래스 | Light | Dark | 용도 | 현재 코드 근거 |
|---|---|---|---|---|---|
| `border` | `border-border` | gray-200 | gray-700 | 카드·구분선 | `border-slate-200`, `border-gray-200`(35) / `dark:border-slate-700`, `gray-700`(39) |
| `border-strong` | `border-border-strong` | gray-300 | gray-600 | 입력창, outline 버튼 | `border-slate-300`(13) / `dark:border-slate-600`(13) |
| `ring` | `ring-ring` | violet-500 | violet-500 | 포커스 링 | `focus:ring-violet-500`(10) |

### 브랜드 (Primary)

| 토큰 | Tailwind 클래스 | Light | Dark | 용도 | 현재 코드 근거 |
|---|---|---|---|---|---|
| `primary` | `bg-primary` | violet-600 | violet-600 | 주요 버튼, 선택 상태 | `bg-violet-600`(13) |
| `primary-hover` | `bg-primary-hover` | violet-700 | violet-700 | 주요 버튼 hover | `hover:bg-violet-700` |
| `primary-active` | `bg-primary-active` | violet-800 | violet-800 | 주요 버튼 눌림 | `active:bg-violet-800` |
| `primary-fg` | `text-primary-fg` | violet-600 | violet-400 | 링크, 강조 글자 | `text-violet-600`(13) / `dark:text-violet-400`(7) |
| `primary-subtle` | `bg-primary-subtle` | violet-50 | violet-500/20 | 선택된 메뉴, 약한 강조 배경 | `bg-violet-50`(5) / `dark:bg-violet-500/20` |

### 상태 (Status) — 4종 × 5단계

| 단계 | 용도 | success (emerald) | warning (amber) | danger (red) | info (sky) |
|---|---|---|---|---|---|
| `{status}` | 진한 면(버튼, 점) | 500 | 500 | **600** | 500 |
| `{status}-hover` | 진한 면 hover | 600 | 600 | 700 | 600 |
| `{status}-fg` | 글자, 아이콘 | 700 / dark 300 | 700 / dark 300 | 600 / dark 400 | 700 / dark 300 |
| `{status}-subtle` | 연한 배경 (Alert, Badge) | 50 / dark 500/10 | 50 / dark 500/10 | 50 / dark 500/10 | 50 / dark 500/10 |
| `{status}-border` | 연한 테두리 | 200 / dark 500/30 | 200 / dark 500/30 | 200 / dark 500/30 | 200 / dark 500/30 |

클래스 예: `bg-danger`, `text-success-fg`, `bg-warning-subtle`, `border-info-border`
근거: `Alert.tsx`, `Badge.tsx`, `Button.tsx`(danger = rose-600)

### 차트 데이터 (Chart)

의미 없이 **순서만 있는** 데이터 구분 색입니다. 차트의 1번째 데이터는 `chart-1`, 2번째는 `chart-2` … 순서대로 씁니다.
`success`, `danger` 같은 상태 토큰은 의미가 있으므로 차트 데이터 색으로 쓰지 않습니다.

| 토큰 | 사용법 | Light | Dark | 현재 사용처 |
|---|---|---|---|---|
| `chart-1` | `var(--chart-1)` / `bg-chart-1` | **brand-500** (violet-500) | 동일 | 매출 추이 Acme Plus, 도넛 미국, 막대 직접 판매 |
| `chart-2` | `var(--chart-2)` / `bg-chart-2` | blue-500 | 동일 | 매출 추이 Acme Advanced, 도넛 유럽, 막대 간접 판매 |
| `chart-3` | `var(--chart-3)` / `bg-chart-3` | emerald-500 | 동일 | 매출 추이 Acme Professional, 도넛 아시아 |
| `chart-4` | `var(--chart-4)` / `bg-chart-4` | amber-500 | 동일 | 도넛 기타 |
| `chart-5` | `var(--chart-5)` / `bg-chart-5` | pink-500 | 동일 | (예비) |

- `chart-1`은 브랜드 색을 따라갑니다. 나머지는 브랜드가 바뀌어도 데이터끼리 구분되도록 고정 색입니다.
- recharts의 `fill`, `stroke`, `stopColor`에는 `var(--chart-1)` 문자열을, 범례 점 같은 HTML에는 `bg-chart-1` 클래스를 씁니다.
- 축 글자는 `var(--fg-subtle)`, 격자선은 `var(--border)`, 차트 카드는 `bg-surface rounded-card shadow-card`, 툴팁은 `shadow-popover`를 씁니다.
- 데이터가 5개를 넘으면 `chart-1`부터 다시 반복합니다. 6개 이상이 자주 필요해지면 디자이너와 `chart-6` 이후를 추가합니다.

---

## 2. 모서리 (Radius)

| 토큰 | 클래스 | 값 | 용도 | 현재 코드 근거 |
|---|---|---|---|---|
| `radius-control` | `rounded-control` | `--brand-radius` (8px) | 버튼, 입력창, 드롭다운 항목 | `rounded-lg`(33) |
| `radius-card` | `rounded-card` | `--brand-radius` × 1.5 (12px) | 카드, 모달, 패널 | `rounded-xl`(25) |
| `radius-full` | `rounded-full` | 9999px | 아바타, 배지, 토글 | Tailwind 기본 그대로 |

## 3. 그림자 (Shadow)

| 토큰 | 클래스 | 값 | 용도 | 현재 코드 근거 |
|---|---|---|---|---|
| `shadow-card` | `shadow-card` | = Tailwind `shadow-sm` | 카드 | `shadow-sm`(12) |
| `shadow-popover` | `shadow-popover` | = Tailwind `shadow-lg` | 드롭다운, 툴팁, 스낵바 | `shadow-lg`(10) |
| `shadow-modal` | `shadow-modal` | = Tailwind `shadow-2xl` | 모달, 드로어 | `shadow-2xl`(2) |

## 4. 입력 요소 높이 (Control)

Button, Input, Select, Combobox, DatePicker, TimePicker가 같은 높이 토큰을 씁니다. 높이를 바꾸면 모든 입력 요소가 함께 바뀝니다.

| 토큰 | 클래스 | 값 | 사용처 |
|---|---|---|---|
| `spacing-control-sm` | `h-control-sm` | 2rem (32px) | Button `size="sm"` |
| `spacing-control-md` | `h-control-md` | 2.25rem (36px) | Button `size="md"`, Input, Select, Combobox, DatePicker, TimePicker |
| `spacing-control-lg` | `h-control-lg` | 2.75rem (44px) | Button `size="lg"` |

> Input의 플로팅 라벨형(`h-12`)은 구조가 달라 토큰 대상에서 제외했습니다.

## 5. 글꼴

이미 정리가 잘 되어 있어 **Tailwind 기본 스케일을 그대로** 씁니다 (`text-xs` 52, `text-sm` 123, `text-base` 12 …).
`font-medium`, `font-semibold`, `font-bold` 3단계만 사용합니다.

---

## 결정 사항

| # | 항목 | 현재 코드 | 결정 | 이유 |
|---|---|---|---|---|
| 1 | 회색 계열 | `slate`(shared/ui) + `gray`(features·widgets) 혼용 | **gray** | 디자인 시스템·Figma 라이브러리에서 가장 보편적인 중립 회색 이름 |
| 2 | 빨간색 계열 | `rose`(대부분) + `red`(일부) 혼용 | **red** | 에러/위험 색의 가장 보편적인 이름 |
| 3 | 커스텀 팔레트 mauve·olive·mist·taupe | 등록만 되어 있고 사용처 0곳 | 그대로 둠 | Primitive로 유지 |
| 4 | `text-[11px]`, `text-[10px]` 임의 크기 | 4곳 | 이번에는 토큰화하지 않음 | |

> 1·2번은 Semantic 토큰이 가리키는 Primitive만 바꾸면 되므로, 디자이너가 Figma에서 다르게 정하면 `tokens.css`의 값만 바꾸면 됩니다.
> 토큰 교체(2026-11-11)로 shared/ui 의 slate·rose 가 gray·red 로 바뀌었습니다.

## 코드 적용 현황

- [x] `tokens.css`에 토큰 추가 (`globals.css`에서 import) (기존 클래스와 공존, 화면 변화 없음)
- [x] `shared/lib/cn.ts` — tailwind-merge가 `rounded-control`, `shadow-card`, `h-control-md` 등을 인식하도록 설정
- [x] 브랜드 블록 (`--brand-*`, `--neutral-*`, `--brand-radius`, `--brand-font-*`)
- [x] 입력 요소 높이 토큰 — Button, Input, Select, Combobox, DatePicker, TimePicker 적용 (값 동일, 화면 변화 없음)
- [x] lint 규칙 — 팔레트 색·임의 색 사용 금지 (`eslint.config.mjs`의 `designTokenRules`)
- [x] `/showcase` 토큰 견본 섹션 (`src/pages/home/ui/DesignTokens.tsx`)
- [x] 차트 토큰 `chart-1` ~ `chart-5` + 대시보드 차트 3개 적용 (`src/features/dashboard-charts`)
- [ ] Figma Variables 구성 (디자이너)
- [x] shared/ui, features, widgets, pages 전체를 토큰 클래스로 교체 (팔레트 색 사용 0곳)
- [x] lint 규칙 경고 → **에러**

## lint 규칙

`src/`, `app/`의 `.ts`, `.tsx`에서 아래 패턴이 있으면 **에러**입니다.

| 잡는 것 | 예 | 대신 |
|---|---|---|
| 팔레트 색 | `bg-slate-500`, `dark:text-violet-400`, `text-white`, `bg-black/50` | `bg-surface`, `text-primary-fg`, `text-fg-on-primary`, `bg-overlay` |
| 임의 색 | `text-[#333]`, `bg-[rgb(0,0,0)]` | 필요한 토큰을 Figma와 협의해 추가 |

- 인라인 `style={{ color: 'var(--fg)' }}`처럼 CSS 변수를 쓰는 것은 허용합니다.
- 장식용 색(KPI 아이콘, 채널 막대 등)도 `chart-1` ~ `chart-5`를 씁니다.
- 꼭 필요한 예외는 해당 줄에 `// eslint-disable-next-line no-restricted-syntax`와 이유를 적습니다.

## 사용 예

```tsx
// Before
'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600'
// After — dark: 불필요
'bg-surface-muted text-fg-secondary rounded-control'
```
