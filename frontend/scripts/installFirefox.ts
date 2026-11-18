import { createHash } from "node:crypto";
import {
  createReadStream,
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { join, resolve, isAbsolute } from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import {
  firefoxCache,
  firefoxExecutablePath,
  supportsPinnedFirefox,
} from "../testing/firefoxBrowser.ts";
const manifest = JSON.parse(
  readFileSync(new URL("../firefox-browser.json", import.meta.url), "utf8"),
) as { revision: string; url: string; sha256: string };
const osRelease =
  process.platform === "linux" ? readFileSync("/etc/os-release", "utf8") : "";
if (!supportsPinnedFirefox(process.platform, process.arch, osRelease)) {
  throw new Error(
    "This pinned browser installer supports Debian 13 x64 only. Set GEOSPACE_FIREFOX_EXECUTABLE to a verified fixed Playwright Firefox on other platforms.",
  );
}
const cacheRoot = fileURLToPath(new URL("../.cache/", import.meta.url));
mkdirSync(cacheRoot, { recursive: true });
const archive = join(cacheRoot, "firefox-1575-debian13-x64.zip");
async function sha256(path: string) {
  const hash = createHash("sha256");
  for await (const chunk of createReadStream(path)) hash.update(chunk);
  return hash.digest("hex");
}
if (!existsSync(archive)) {
  console.log(`Downloading official Firefox build ${manifest.revision}…`);
  const response = await fetch(manifest.url, {
    signal: AbortSignal.timeout(300_000),
  });
  if (!response.ok)
    throw new Error(`Browser download failed: HTTP ${response.status}`);
  const temporary = `${archive}.part`;
  writeFileSync(temporary, Buffer.from(await response.arrayBuffer()));
  if ((await sha256(temporary)) !== manifest.sha256) {
    rmSync(temporary);
    throw new Error("Firefox archive checksum mismatch");
  }
  renameSync(temporary, archive);
}
if ((await sha256(archive)) !== manifest.sha256)
  throw new Error(
    "Cached Firefox archive checksum mismatch; remove that cache archive and rerun.",
  );
const marker = join(firefoxCache, ".geospace-sha256");
if (
  existsSync(firefoxExecutablePath("")) &&
  existsSync(marker) &&
  readFileSync(marker, "utf8").trim() === manifest.sha256
) {
  console.log(
    `Verified Firefox ${manifest.revision} already installed: ${firefoxExecutablePath("")}`,
  );
} else {
  const names = execFileSync("unzip", ["-Z1", archive], {
    encoding: "utf8",
    maxBuffer: 10 * 1024 * 1024,
  })
    .trim()
    .split("\n");
  if (
    names.some((name) => isAbsolute(name) || name.split(/[\\/]/).includes(".."))
  )
    throw new Error("Unexpected archive path");
  const staging = resolve(cacheRoot, "firefox-1575-installing");
  rmSync(staging, { recursive: true, force: true });
  mkdirSync(staging);
  execFileSync("unzip", ["-q", archive, "-d", staging]);
  if (!existsSync(join(staging, "firefox/firefox")))
    throw new Error("Archive lacks the expected Firefox executable");
  rmSync(firefoxCache, { recursive: true, force: true });
  renameSync(staging, firefoxCache);
  writeFileSync(marker, `${manifest.sha256}\n`);
  console.log(
    `Installed verified Firefox ${manifest.revision}: ${firefoxExecutablePath("")}`,
  );
}
