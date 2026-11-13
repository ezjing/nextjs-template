<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Design tokens

UI 코드는 디자인 토큰 클래스만 사용합니다 (`bg-surface`, `text-fg-muted`, `border-border`, `rounded-card`, `shadow-card`, `h-control-md` …).
팔레트 색(`bg-slate-500`), `dark:` 클래스, Tailwind 원본 모서리·그림자(`rounded-lg`, `shadow-sm`), 임의 값(`text-[11px]`, `fill="#8b5cf6"`)은 lint 에러입니다.
작업 전에 `.cursor/rules/design-tokens.mdc` 와 `docs/design-tokens.md` 를 읽으세요. 토큰 정의는 `src/app/styles/tokens.css` 입니다.

# FSD architecture (반드시 준수)

코드를 추가·이동하기 전에 `docs/fsd-architecture.md` 를 읽고 그대로 따릅니다. 요약: `.cursor/rules/fsd-architecture.mdc`.

- 레이어: `app > pages > features > entities > shared` (위 → 아래로만 import). **`widgets`·`processes` 는 쓰지 않습니다.**
- 페이지 우선: 한 화면에서만 쓰는 UI·훅은 `pages/<화면>` 안에 두고, 여러 화면에서 재사용할 때만 `features` 로 옮깁니다. 앱 공통 레이아웃은 `src/app/layouts`.
- 다른 슬라이스는 `index.ts`(public API)로만, 같은 슬라이스 안은 상대 경로로 import 합니다. 같은 레이어 슬라이스끼리 import 금지.
- DB 접근 코드는 `entities/<도메인>/server.ts` 로 공개하고 `app/api/**` 에서만 import 합니다.
- 위반은 `npm run lint` 에러입니다. lint 규칙을 끄거나 우회하지 말고, 규칙을 바꿔야 하면 사용자에게 먼저 묻습니다.
