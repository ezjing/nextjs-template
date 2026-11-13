# FSD 아키텍처 규칙 (명세)

이 프로젝트는 [Feature-Sliced Design](https://fsd.how/docs/get-started/overview/) 공식 문서를 따릅니다.
아래 규칙은 **모든 코드 작업에서 반드시 지킵니다.** 대부분은 `npm run lint` 가 에러로 잡고,
커밋 전 검사(husky + lint-staged)에서도 막힙니다. 규칙을 바꿔야 하면 먼저 이 문서와 `eslint.config.mjs` 를 함께 고칩니다.

- 명세(이 문서): 규칙의 전체 내용과 근거
- 사용법: `.cursor/rules/fsd-architecture.mdc` (작업할 때 보는 요약), `.cursor/rules/new-screen-guide.mdc` (새 화면 절차)
- 강제: `eslint.config.mjs` 의 FSD 규칙 블록

---

## 1. 레이어

| 레이어 | 위치 | 역할 | 슬라이스 |
| --- | --- | --- | --- |
| app | `src/app` | 앱 전역: providers, styles, layouts(사이드바·헤더 등 앱 공통 레이아웃) | 없음 (세그먼트만) |
| pages | `src/pages` | 화면 하나. 그 화면에서만 쓰는 UI·조회·저장 로직까지 포함 | 화면별 |
| features | `src/features` | **여러 화면에서 재사용되는** 사용자 행동 (로그인, 좋아요 등) | 기능별 |
| entities | `src/entities` | 업무 개념(회원, 사용자 …)의 타입·API·서버 로직 | 도메인별 |
| shared | `src/shared` | 업무와 무관한 공통 코드: ui 키트, api client, lib, config | 없음 (세그먼트만) |

**쓰지 않는 레이어**

- `widgets` — 공식 문서가 사용을 권장하지 않습니다 ("using the Widgets layer is generally discouraged").
  features 와 역할이 겹치기 때문입니다. 위젯 대신 아래처럼 나눕니다.
  - 한 화면에서만 쓰는 UI 블록 → 그 화면의 `pages/<화면>/ui`
  - 여러 화면에서 재사용하는 사용자 행동 → `features`
  - 업무 맥락 없는 UI → `shared/ui`
  - 앱 전체 레이아웃 → `app/layouts`
- `processes` — 공식 문서에서 폐기(deprecated)되었습니다.
- 새 레이어를 임의로 추가하지 않습니다.

> Next.js 라우팅은 루트 `app/` (App Router) 가 담당하고, FSD 레이어는 모두 `src/` 아래에 있습니다.
> 루트 `app/<route>/page.tsx` 는 `src/pages` 를 re-export 만 합니다. 루트의 빈 `pages/` 폴더는
> Next.js 가 `src/pages` 를 Pages Router 로 오인하지 않게 하려는 것이므로 비워 둡니다.

## 2. import 방향 — 위에서 아래로만

```
app > pages > features > entities > shared
```

| 이 레이어에서 | import 가능 |
| --- | --- |
| app | pages, features, entities, shared |
| pages | features, entities, shared |
| features | entities, shared |
| entities | shared |
| shared | shared 내부만 |

**같은 레이어의 다른 슬라이스는 import 할 수 없습니다.**

- `pages/a` → `pages/b` ❌
- `features/a` → `features/b` ❌ (조합이 필요하면 pages 에서 조합)
- `entities/a` → `entities/b` ❌, 단 `@x` 표기만 허용: `@/entities/a/@x/b` (b 를 위해 a 가 따로 공개한 API)

## 3. 어디에 둘지 — 페이지 우선

공식 문서 원칙: 재사용되지 않는 UI 블록은 page 슬라이스 안에 둬도 됩니다 ("not everything needs to be a feature").

1. **새 코드는 먼저 그 화면의 `pages/<화면>/` 안에 둡니다.** (ui, model, api 세그먼트 모두 가능)
2. **두 번째 화면에서 같은 사용자 행동이 필요해질 때** `features/<기능>` 으로 옮깁니다.
3. 업무 개념의 타입·API 호출·서버 로직은 처음부터 `entities/<도메인>` 에 둡니다. (여러 화면·Route Handler 가 공유)
4. 업무와 무관한 범용 컴포넌트·유틸은 `shared` 에 둡니다. (새로 만들기 전에 `shared/ui` 에 있는지 확인)
5. 사이드바·헤더처럼 모든 화면을 감싸는 레이아웃은 `app/layouts` 에 둡니다.

| 예시 | 위치 |
| --- | --- |
| 대시보드의 KPI 카드, 차트 | `pages/dashboard/ui` |
| 회원 목록 화면의 테이블·등록 다이얼로그·조회/저장 훅 | `pages/community/users/ui`, `pages/community/users/model` |
| 로그인 (여러 곳에서 쓰는 행동) | `features/auth` |
| 회원 타입, `memberApi`, `memberService` | `entities/member` |
| Button, Table, Dialog | `shared/ui` |
| MainLayout, AppSidebar, DashboardHeader | `app/layouts` |

## 4. 슬라이스와 세그먼트

슬라이스 폴더명은 kebab-case 입니다 (`ui-preferences`, `community/users`).
슬라이스를 폴더로 묶을 수 있습니다 (슬라이스 그룹, 예: `pages/community/users`). 묶음 폴더 자체는 슬라이스가 아닙니다.

슬라이스 안은 목적별 세그먼트로 나눕니다.

| 세그먼트 | 담는 것 |
| --- | --- |
| `ui` | 컴포넌트, 화면 표현용 포매터·스타일 |
| `model` | 타입, 스토어, 조회/저장 훅, 업무 로직 |
| `api` | 백엔드 호출 함수, DB 쿼리, 매퍼 |
| `lib` | 슬라이스 안에서 여러 모듈이 같이 쓰는 코드 |
| `config` | 설정값, 기능 플래그 |

- 세그먼트 이름은 **목적**을 나타냅니다. `components`, `hooks`, `types`, `utils` 같은 이름은 쓰지 않습니다.
- app, shared 는 슬라이스 없이 세그먼트만 둡니다 (`app/providers`, `app/layouts`, `app/styles`, `shared/ui`, `shared/lib` …).

## 5. Public API (index.ts)

pages, features, entities 의 각 슬라이스는 루트에 `index.ts` 를 두고, 밖에 공개할 것만 export 합니다.

```ts
// src/features/auth/index.ts
export { useAuth } from './model/useAuth';
export { useLogin } from './model/useLogin';
```

- **슬라이스 밖에서는 `index.ts` 로만 import 합니다.**
  - ✅ `import { useAuth } from '@/features/auth';`
  - ❌ `import { useAuth } from '@/features/auth/model/useAuth';`
- **슬라이스 안에서는 상대 경로**를 씁니다 (`./`, `../model/...`). 자기 슬라이스를 `@/` 로 import 하지 않습니다.
- `export *` 는 쓰지 않고, 공개할 이름을 하나씩 적습니다.
- 세그먼트 안에 `index.ts` 를 또 만들지 않습니다 (`features/auth/ui/index.ts` ❌).
- shared 는 슬라이스가 없으므로 파일을 직접 import 합니다 (`@/shared/ui/button/Button`).
- app 레이어도 파일을 직접 import 합니다 (`@/app/layouts/MainLayout`). app 은 루트 `app/` 라우트에서만 import 합니다.

### 서버 전용 public API (`server.ts`)

DB 에 접근하는 코드(Service, Queries)는 `index.ts` 에 넣지 않고 같은 슬라이스의 `server.ts` 로 따로 공개합니다.
`index.ts` 에 넣으면 클라이언트 번들에 mysql 드라이버가 섞여 빌드가 깨집니다.

```ts
// src/entities/member/server.ts — Route Handler(app/api/**) 에서만 import
export { getMembers, MemberServiceError } from './model/memberService';
```

- `@/entities/<도메인>/server` 는 `app/api/**` 에서만 import 할 수 있습니다.

## 6. lint 가 잡는 것

| 위반 | 규칙 |
| --- | --- |
| 아래 레이어 → 위 레이어 import | `import/no-restricted-paths` |
| 같은 레이어 다른 슬라이스 import (entities 의 `@x` 제외) | `no-restricted-imports` |
| 다른 슬라이스 내부 파일 직접 import (`@/features/x/model/...`) | `no-restricted-imports` |
| 자기 슬라이스를 `@/` 절대 경로로 import | `no-restricted-imports` |
| `@/widgets`, `@/processes` import | `no-restricted-imports` |
| `src/widgets/**`, `src/processes/**` 에 파일 생성 | `no-restricted-syntax` |
| `@/entities/*/server` 를 `app/api/**` 밖에서 import | `no-restricted-imports` |

**lint 가 못 잡는 것 (리뷰로 지킴)**

- 한 화면에서만 쓰는 코드를 features 에 두는 것 → pages 로
- 세그먼트 이름을 `components`, `hooks` 등으로 짓는 것
- `export *` 사용
- 상대 경로로 슬라이스 밖(`../../다른슬라이스`)을 참조하는 것

## 7. 새 코드 작성 체크리스트

1. 이 코드는 어느 화면에서 쓰나? 한 화면이면 `pages/<화면>` 안에 둔다.
2. 여러 화면에서 같은 행동을 하나? 그때만 `features` 로 뺀다.
3. 업무 개념의 타입·API·서버 로직인가? `entities`.
4. 업무와 무관한 범용 코드인가? `shared` (먼저 기존 것 확인).
5. 다른 슬라이스에서 쓸 것을 `index.ts` 에 export 했나?
6. 다른 슬라이스는 `index.ts` 로, 같은 슬라이스는 상대 경로로 import 했나?
7. `npm run lint` 에러 0 개인가?
