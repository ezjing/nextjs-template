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
