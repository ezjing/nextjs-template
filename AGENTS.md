<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Design tokens

UI 코드는 디자인 토큰 클래스만 사용합니다 (`bg-surface`, `text-fg-muted`, `border-border`, `rounded-card`, `shadow-card`, `h-control-md` …).
팔레트 색(`bg-slate-500`), `dark:` 클래스, Tailwind 원본 모서리·그림자(`rounded-lg`, `shadow-sm`), 임의 값(`text-[11px]`, `fill="#8b5cf6"`)은 lint 에러입니다.
작업 전에 `.cursor/rules/design-tokens.mdc` 와 `docs/design-tokens.md` 를 읽으세요. 토큰 정의는 `src/app/styles/tokens.css` 입니다.
