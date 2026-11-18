import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "node_modules"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: { globals: globals.node },
  },
  {
    files: ["src/**/*.ts"],
    ignores: ["src/**/*.test.ts"],
    languageOptions: { globals: {} },
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["node:*", "fs", "path", "os", "child_process", "http", "https", "net"],
              message: "The engine core performs no I/O. Use a port in src/ports instead.",
            },
          ],
        },
      ],
    },
  },
  { files: ["eslint.config.js", "scripts/**"], languageOptions: { globals: globals.node } },
);
