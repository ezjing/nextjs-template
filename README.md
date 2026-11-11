# Next.js + TypeScript FSD Template

**Next.js(App Router) + TypeScript** 조합 템플릿입니다. [Feature-Sliced Design](https://fsd.how/kr/docs/guides/tech/with-nextjs/) 구조를 따르며, 대시보드 화면과 공통 UI 컴포넌트, 디자인 토큰까지 갖춰 두어 새 프로젝트에 복사해 바로 쓸 수 있게 만들었습니다.

## 기술 스택

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **TypeScript** (strict)
- **Tailwind CSS v4** (클래스 기반 다크모드) + **디자인 토큰** (`src/app/styles/tokens.css`)
- **Zustand** (클라이언트 전역 상태)
- **TanStack Query** + **axios** (서버 데이터)
- **mysql2** (MariaDB — Route Handler 에서 사용하는 서버 전용 DB 드라이버)
- **recharts**, **lucide-react**, **clsx** + **tailwind-merge** (`cn()`)
- **ESLint** + **Prettier** + **husky** + **lint-staged** (커밋 전 자동 검사)

## 폴더 구조

Next.js 의 라우팅 폴더(`app`, `pages`)와 FSD 레이어를 분리합니다.

```
.
├─ app/                          # Next.js App Router (라우팅 전용)
│  ├─ layout.tsx                 # 루트 레이아웃 (globals.css + AppProviders)
│  ├─ (main)/                    # 사이드바·헤더가 있는 화면 그룹 (URL 에는 안 나타남)
│  │  ├─ layout.tsx              # MainLayout 적용
│  │  ├─ page.tsx                # "/"                 → @/pages/dashboard
│  │  └─ community/users/page.tsx # "/community/users" → @/pages/community/users
│  ├─ login/page.tsx             # "/login"    → @/pages/login (사이드바 없음)
│  ├─ showcase/page.tsx          # "/showcase" → @/pages/home (컴포넌트·토큰 견본)
│  └─ api/                       # Route Handler (Controller) — 예: api/community/users
├─ pages/                        # 의도적으로 빈 폴더 (아래 참고)
├─ docs/                         # 문서 — design-tokens.md
├─ .cursor/rules/                # AI 코딩 도구 규칙 (아래 참고)
└─ src/                          # FSD 레이어
   ├─ app/                       # 앱 전역: providers, styles(globals.css, tokens.css)
   ├─ pages/                     # FSD 페이지: dashboard, community/users, login, home
   ├─ widgets/                   # sidebar, dashboard-header, layout(MainLayout)
   ├─ features/                  # auth, ui-preferences, dashboard-*, member-list
   ├─ entities/                  # member, user
   └─ shared/                    # api, config, constants, lib, ui(공통 컴포넌트 32종)
```

### 라우팅 규칙

루트 `app/<route>/page.tsx` 는 페이지 코드를 직접 담지 않고, `src/pages` 의 FSD 페이지를 re-export 합니다.

```ts
// app/(main)/page.tsx
export { DashboardPage as default, metadata } from '@/pages/dashboard';
```

- 사이드바·헤더가 필요한 화면은 `app/(main)/` 아래에 둡니다. `(main)` 은 [Route Group](https://nextjs.org/docs/app/api-reference/file-conventions/route-groups) 이라 URL 에 포함되지 않습니다.
- 로그인처럼 레이아웃이 다른 화면은 `app/` 바로 아래에 둡니다.

> 루트의 빈 `pages/` 폴더는 Next.js 가 `src/pages` 를 Pages Router 로 오인해 빌드가 실패하는 것을 막기 위해 필요합니다.

### FSD import 방향 규칙

`eslint-plugin-import` 의 `no-restricted-paths` 로 레이어 간 import 방향을 강제합니다.

```
app > pages > widgets > features > entities > shared
```

(상위 레이어만 하위 레이어를 참조할 수 있으며, 역방향 import 는 오류로 처리됩니다.)

### 서버(API) 구조

DB 를 쓰는 API 는 Route Handler 에서 Service, Queries 순서로 역할을 나눕니다.

| 역할 | 위치 | 담당 |
|---|---|---|
| Controller | `app/api/.../route.ts` | HTTP 파싱·응답 |
| Service | `src/entities/<도메인>/model/<도메인>Service.ts` | 업무 규칙·유효성 검사 |
| Repository / Query | `src/entities/<도메인>/api/<도메인>Queries.ts` | DB 접근 함수 + SQL |
| 클라이언트 호출 | `src/entities/<도메인>/api/<도메인>Api.ts` | axios 로 `/api/...` 호출 |

`shared/lib/db.ts`, `*Service.ts`, `*Queries.ts` 는 서버 전용입니다. 클라이언트 컴포넌트에서 import 하지 않습니다.

### 경로 별칭

`@/*` 는 `src/*` 를 가리킵니다 (`tsconfig.json`).

## 디자인 토큰

색·모서리·그림자·입력 요소 높이는 **디자인 토큰 클래스**로만 씁니다 (`bg-surface`, `text-fg-muted`, `rounded-card`, `shadow-card` …).
`bg-slate-500`, `dark:` 클래스, `rounded-lg`, `text-[11px]`, `fill="#8b5cf6"` 같은 원본·임의 값은 `npm run lint` 에서 에러가 납니다.
글자 크기는 토큰 없이 Tailwind 기본 스케일(`text-xs` ~)만 씁니다.

| 무엇 | 어디 |
|---|---|
| 토큰 정의 (1단계 팔레트 → 2단계 의미) | `src/app/styles/tokens.css` |
| 토큰 명세, 결정 사항, lint 규칙 | [`docs/design-tokens.md`](docs/design-tokens.md) |
| 화면 견본 (라이트·다크) | `/showcase` 맨 위 Design Tokens 섹션 |
| 사용법 — 어떤 클래스를 쓰는지 (AI 도구 규칙 겸용) | `.cursor/rules/design-tokens.mdc` |

### 새 프로젝트에 적용하기

`tokens.css` 맨 위 **브랜드 블록**(브랜드 색, 중립 회색, `--brand-radius`, 글꼴)만 바꾸면 앱 전체가 바뀝니다.
순서는 [`docs/design-tokens.md`](docs/design-tokens.md) 의 "새 프로젝트에 적용하기" 체크리스트를 따르세요.

## 시작하기

```bash
npm install          # 의존성 설치 + 커밋 전 검사 훅(husky) 설치
npm run dev          # 개발 서버 (http://localhost:3000)
npm run build        # 프로덕션 빌드 (타입체크 포함)
npm run lint         # ESLint (FSD 방향 규칙 + 디자인 토큰 규칙)
npm run format       # Prettier 포맷팅
npm run format:check # Prettier 포맷 검사만
```

### 커밋 전 자동 검사

커밋하면 husky + lint-staged 가 **바뀐 파일**(`src/`, `app/` 의 `.ts` `.tsx` `.css`)에 `eslint --fix` 와 `prettier --write` 를 실행합니다.
lint 에러가 남아 있으면 커밋이 중단됩니다. 설정은 `package.json` 의 `lint-staged`, `.husky/pre-commit` 에 있습니다.

## 환경 변수

`.env.local` 에 설정합니다. 클라이언트에 노출할 변수만 `NEXT_PUBLIC_` 접두사를 붙입니다.

```
# 별도 API 서버를 쓸 때만 (비워 두면 같은 서버의 /api 호출)
NEXT_PUBLIC_API_BASE_URL=

# MariaDB — 서버 전용 (shared/config/env.ts 의 SERVER_ENV)
DB_HOST=
DB_PORT=3306
DB_USER=
DB_PASSWORD=
DB_NAME=
```

## AI 코딩 도구 규칙 (`.cursor/rules/`)

Cursor 등 AI 도구가 이 템플릿의 규칙대로 코드를 만들도록 규칙 파일을 둡니다. 사람이 읽는 가이드로도 쓸 수 있습니다.

| 파일 | 내용 |
|---|---|
| `fsd-architecture.mdc` | FSD 레이어 import 방향, 세그먼트 구조 |
| `new-screen-guide.mdc` | 새 화면 추가 절차 (라우트 → 페이지 → 기능 조립) |
| `shared-ui-components.mdc` | 공통 UI 컴포넌트 목록과 사용법, Snackbar 규칙 |
| `design-tokens.mdc` | 디자인 토큰 클래스, 금지 패턴 |
| `state-management.mdc` | React Query / Zustand / useState 역할 구분 |
| `naming-conventions.mdc` | 파일·함수·변수 네이밍 |
| `api-route-guide.mdc` | Route Handler(Controller) 작성 규칙 |
| `server-layers-guide.mdc` | Service·Repository·Query 작성 규칙 |
