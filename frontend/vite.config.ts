import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import { iconCatalogPlugin } from "./build/iconCatalogPlugin.ts";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react(), iconCatalogPlugin()],
  server: {
    fs: {
      allow: [
        fileURLToPath(new URL(".", import.meta.url)),
        fileURLToPath(new URL("../docs/design-tokens.css", import.meta.url)),
        fileURLToPath(new URL("../icons/custom", import.meta.url)),
      ],
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    restoreMocks: true,
  },
});
