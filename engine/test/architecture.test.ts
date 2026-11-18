import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

/**
 * Module boundaries of the engine. Each mechanic is a separately testable stage
 * and may depend only on the kernel, the ports and the mechanics listed here,
 * always through their `index.ts`.
 */
const MECHANIC_DEPENDENCIES: Record<string, readonly string[]> = {
  world: [],
  travel: ["world"],
  journey: ["world", "travel"],
  commitments: ["world", "travel", "journey"],
  presence: ["world", "journey"],
};

const SRC = resolve(dirname(fileURLToPath(import.meta.url)), "../src");

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return sourceFiles(path);
    return path.endsWith(".ts") && !path.endsWith(".test.ts") ? [path] : [];
  });
}

/** "kernel", "ports", "mechanics/<name>" or "root". */
function moduleOf(file: string): string {
  const parts = relative(SRC, file).split(sep);
  if (parts[0] === "mechanics") return `mechanics/${parts[1]}`;
  return parts.length === 1 ? "root" : (parts[0] ?? "root");
}

function relativeImports(file: string): string[] {
  const text = readFileSync(file, "utf8");
  return [...text.matchAll(/from\s+["'](\.[^"']+)["']/g)].map((m) => resolve(dirname(file), m[1] ?? ""));
}

function violations(file: string): string[] {
  const from = moduleOf(file);
  const problems: string[] = [];
  for (const target of relativeImports(file)) {
    const to = moduleOf(target);
    if (to === from || from === "root") continue;
    const where = `${relative(SRC, file)} -> ${relative(SRC, target)}`;
    if (from === "kernel") problems.push(`kernel must not import other modules: ${where}`);
    else if (from === "ports" && to !== "kernel") problems.push(`ports may import only the kernel: ${where}`);
    else if (from.startsWith("mechanics/")) {
      if (to === "kernel" || to === "ports") continue;
      const own = from.slice("mechanics/".length);
      const other = to.slice("mechanics/".length);
      if (!to.startsWith("mechanics/") || !MECHANIC_DEPENDENCIES[own]?.includes(other)) {
        problems.push(`mechanic "${own}" may not depend on "${to}": ${where}`);
      } else if (!target.endsWith(`${sep}index.ts`)) {
        problems.push(`import mechanic "${other}" through its index.ts: ${where}`);
      }
    }
  }
  return problems;
}

describe("engine architecture", () => {
  it("registers every mechanic folder with its allowed dependencies", () => {
    const folders = readdirSync(join(SRC, "mechanics")).sort();
    expect(folders).toEqual(Object.keys(MECHANIC_DEPENDENCIES).sort());
  });

  it("keeps the declared mechanic dependencies acyclic", () => {
    const visiting = new Set<string>();
    const done = new Set<string>();
    const visit = (name: string): void => {
      if (done.has(name)) return;
      if (visiting.has(name)) throw new Error(`Dependency cycle through ${name}`);
      visiting.add(name);
      for (const dep of MECHANIC_DEPENDENCIES[name] ?? []) visit(dep);
      visiting.delete(name);
      done.add(name);
    };
    for (const name of Object.keys(MECHANIC_DEPENDENCIES)) visit(name);
  });

  it("respects module boundaries in every source file", () => {
    expect(sourceFiles(SRC).flatMap(violations)).toEqual([]);
  });
});
