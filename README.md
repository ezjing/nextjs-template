# Next.js + TypeScript FSD Template

**Next.js(App Router) + TypeScript** 조합 템플릿입니다. [Feature-Sliced Design](https://fsd.how/kr/docs/guides/tech/with-nextjs/) 구조를 따릅니다.

## 기술 스택

- **Next.js 16** (App Router, Turbopack)
- **TypeScript** (strict)
- **Tailwind CSS v4** (클래스 기반 다크모드)
- **Redux Toolkit** + **react-redux**
- **TanStack Query** + **axios**
- **recharts**, **lucide-react**

## 폴더 구조

Next.js 의 라우팅 폴더(`app`, `pages`)와 FSD 레이어를 분리합니다.

```
.
├─ app/                     # Next.js App Router (라우팅 전용)
│  ├─ layout.tsx            # 루트 레이아웃 (globals.css + AppProviders)
│  ├─ page.tsx              # "/"      → @/pages/dashboard re-export
│  ├─ login/page.tsx        # "/login" → @/pages/login re-export
│  └─ showcase/page.tsx     # "/showcase" → @/pages/home re-export
├─ pages/                   # 의도적으로 빈 폴더 (README 참고)
└─ src/                     # FSD 레이어
   ├─ app/                  # 앱 전역: providers, store, styles
   ├─ pages/                # FSD 페이지 (dashboard, login, home)
   ├─ widgets/              # sidebar, dashboard-header, layout
   ├─ features/             # auth, ui-preferences, dashboard-*
   ├─ entities/             # user
   └─ shared/               # api, config, constants, lib, ui
```

### 라우팅 규칙

루트 `app/<route>/page.tsx` 는 페이지 코드를 직접 담지 않고, `src/pages` 의 FSD 페이지를 re-export 합니다.

```ts
// app/page.tsx
export { DashboardPage as default, metadata } from '@/pages/dashboard';
```

> 루트의 빈 `pages/` 폴더는 Next.js 가 `src/pages` 를 Pages Router 로 오인해 빌드가 실패하는 것을 막기 위해 필요합니다.

### FSD import 방향 규칙

`eslint-plugin-import` 의 `no-restricted-paths` 로 레이어 간 import 방향을 강제합니다.

```
app > pages > widgets > features > entities > shared
```

(상위 레이어만 하위 레이어를 참조할 수 있으며, 역방향 import 는 오류로 처리됩니다.)

### 경로 별칭

`@/*` 는 `src/*` 를 가리킵니다 (`tsconfig.json`).

## 시작하기

```bash
npm run dev      # 개발 서버 (http://localhost:3000)
npm run build    # 프로덕션 빌드 (타입체크 포함)
npm run lint     # ESLint (FSD 규칙 포함)
npm run format   # Prettier 포맷팅
```

## 환경 변수

`.env.local` 에 API 베이스 URL 을 설정합니다. (클라이언트 노출 변수는 `NEXT_PUBLIC_` 접두사 필요)

```
NEXT_PUBLIC_API_BASE_URL=
```
