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

const designTokenRules = [
  `Literal[value=/${paletteClass}/]`,
  `TemplateElement[value.raw=/${paletteClass}/]`,
  `Literal[value=/${arbitraryColor}/]`,
  `TemplateElement[value.raw=/${arbitraryColor}/]`,
].map((selector) => ({ selector, message: tokenMessage }));

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
      "no-restricted-syntax": ["warn", ...designTokenRules],
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
