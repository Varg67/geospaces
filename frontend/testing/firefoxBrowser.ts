import { fileURLToPath } from "node:url";
import { join, resolve, dirname } from "node:path";
export const firefoxCache = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../.cache/firefox-1575-debian13-x64",
);
export function firefoxExecutablePath(
  override = process.env.GEOSPACE_FIREFOX_EXECUTABLE,
) {
  return override || join(firefoxCache, "firefox/firefox");
}
export function supportsPinnedFirefox(
  platform: string,
  arch: string,
  osRelease: string,
) {
  const fields = Object.fromEntries(
    osRelease
      .split("\n")
      .filter((line) => line.includes("="))
      .map((line) => {
        const index = line.indexOf("=");
        return [
          line.slice(0, index),
          line.slice(index + 1).replace(/^"|"$/g, ""),
        ];
      }),
  );
  return (
    platform === "linux" &&
    arch === "x64" &&
    fields.ID === "debian" &&
    fields.VERSION_ID === "13"
  );
}
