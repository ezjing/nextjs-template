import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";

/**
 * FSD 레이어 간 import 방향 규칙
 *
 * 상위 레이어만 하위 레이어를 참조할 수 있습니다.
 * app > pages > widgets > features > entities > shared
 */
const fsdLayers = ["app", "pages", "widgets", "features", "entities", "shared"];

const fsdZones = fsdLayers.flatMap((target, targetIdx) =>
  fsdLayers
    .filter((_, fromIdx) => fromIdx < targetIdx)
    .map((from) => ({
      target: `./src/${target}`,
      from: `./src/${from}`,
      message: `${target} → ${from} import 금지 (FSD 규칙)`,
    })),
);

/**
 * 디자인 토큰 규칙
 *
 * 화면 코드에서는 팔레트 색(bg-slate-500 등)이나 임의 색(text-[#333]) 대신
 * 디자인 토큰 클래스(bg-surface, text-fg-muted 등)를 사용합니다.
 * 토큰 목록: docs/design-tokens.md, src/app/styles/tokens.css
 */
const PALETTE =
  "slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|mauve|olive|mist|taupe";
const COLOR_UTIL =
  "bg|text|border|border-[trblxy]|ring|ring-offset|divide|outline|fill|stroke|placeholder|from|via|to|accent|caret|decoration|shadow";
const paletteClass = `(^|[\\s:])(${COLOR_UTIL})-((${PALETTE})-\\d{2,3}|white|black)(\\b|$)`;
const arbitraryColor = `(^|[\\s:])(${COLOR_UTIL})-\\[(#|rgb|hsl|oklch|color)`;
const tokenMessage =
  "팔레트 색·임의 색 대신 디자인 토큰 클래스를 사용하세요 (예: bg-surface, text-fg-muted, border-border). 목록: docs/design-tokens.md";

/**
 * 임의 글자 크기 금지 (text-[11px], text-[0.8rem], text-[length:…] 등)
 * 글자 크기는 토큰 없이 Tailwind 기본 스케일(text-xs ~ text-9xl)만 사용합니다.
 */
const arbitraryFontSize = `(^|[\\s:])text-\\[(\\d|\\.\\d|length:|calc\\(|clamp\\(|var\\()`;
const fontSizeMessage =
  "임의 글자 크기 대신 Tailwind 기본 크기를 사용하세요 (text-xs, text-sm, text-base …). 규칙: docs/design-tokens.md";

/**
 * 모서리·그림자 원본 클래스 금지
 * 토큰(rounded-control-xs/-sm, rounded-control, rounded-card, shadow-card/popover/modal)은
 * --brand-radius 등 브랜드 값을 따라가므로, Tailwind 원본 크기를 쓰면 그 부분만 브랜드에서 빠집니다.
 * 허용: rounded-full, rounded-none, shadow-none, 토큰 클래스
 */
const RADIUS_SIDE = "t|r|b|l|s|e|tl|tr|bl|br|ss|se|es|ee";
const rawRadius = `(^|[\\s:])rounded(-(${RADIUS_SIDE}))?(-(xs|sm|md|lg|xl|2xl|3xl|4xl))?($|\\s)`;
const rawShadow = `(^|[\\s:])shadow(-(2xs|xs|sm|md|lg|xl|2xl))?($|\\s)`;
const arbitraryRadiusShadow = `(^|[\\s:])(rounded(-(${RADIUS_SIDE}))?|shadow)-\\[`;
const radiusShadowMessage =
  "모서리·그림자는 토큰 클래스를 사용하세요 (rounded-control-xs/-sm, rounded-control, rounded-card, shadow-card, shadow-popover, shadow-modal). 목록: docs/design-tokens.md";

/**
 * 색 값 리터럴 금지 — 클래스가 아닌 곳(차트 fill/stroke, style={{ color }} 등)에 직접 쓴 색
 * 예) fill="#8b5cf6", style={{ color: 'rgb(0 0 0)' }}
 * 대신 CSS 변수를 씁니다: fill="var(--chart-1)", style={{ color: 'var(--fg-muted)' }}
 */
const colorLiteral = `^\\s*(#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\\s*$|(rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\\()`;
const colorLiteralMessage =
  "색 값을 직접 쓰지 말고 토큰 CSS 변수를 사용하세요 (예: var(--primary), var(--chart-1), var(--fg-muted)). 목록: docs/design-tokens.md";

const selectors = (pattern, message) =>
  [`Literal[value=/${pattern}/]`, `TemplateElement[value.raw=/${pattern}/]`].map((selector) => ({
    selector,
    message,
  }));

const designTokenRules = [
  ...selectors(paletteClass, tokenMessage),
  ...selectors(arbitraryColor, tokenMessage),
  ...selectors(arbitraryFontSize, fontSizeMessage),
  ...selectors(rawRadius, radiusShadowMessage),
  ...selectors(rawShadow, radiusShadowMessage),
  ...selectors(arbitraryRadiusShadow, radiusShadowMessage),
  // href="#add" 같은 앵커는 색이 아니므로 href / id 속성은 제외
  ...[
    `:not(JSXAttribute) > Literal[value=/${colorLiteral}/]`,
    `JSXAttribute[name.name!=/^(href|id)$/] > Literal[value=/${colorLiteral}/]`,
    `TemplateElement[value.raw=/${colorLiteral}/]`,
  ].map((selector) => ({ selector, message: colorLiteralMessage })),
];

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      import: importPlugin,
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },
    rules: {
      "import/no-restricted-paths": ["error", { zones: fsdZones }],
      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal", ["parent", "sibling", "index"]],
          pathGroups: [{ pattern: "@/**", group: "internal", position: "before" }],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
  {
    files: ["src/**/*.{ts,tsx}", "app/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-syntax": ["error", ...designTokenRules],
    },
  },
  prettier,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
