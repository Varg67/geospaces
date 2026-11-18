import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";
type Entry = {
  type_id?: string;
  room_type_id?: string;
  icon_source: string;
  icon_id: string;
  fallback_icons: { lucide: string; phosphor: string };
};
const catalogPath = fileURLToPath(
  new URL("../../icons/catalog.json", import.meta.url),
);
const moduleId = "virtual:geospace-icon-catalog";
/** Project canonical metadata at build time; narrative taxonomy text is not shipped. */
export function iconCatalogPlugin(): Plugin {
  return {
    name: "geospace-icon-catalog",
    resolveId(id) {
      if (id === moduleId) return `\0${moduleId}`;
    },
    generateBundle() {
      for (const file of [
        "NOTICE.md",
        "licenses/lucide-react-LICENSE.txt",
        "licenses/react-LICENSE.txt",
        "licenses/react-dom-LICENSE.txt",
      ]) {
        this.emitFile({
          type: "asset",
          fileName: file,
          source: readFileSync(new URL(`../${file}`, import.meta.url), "utf8"),
        });
      }
    },
    load(id) {
      if (id !== `\0${moduleId}`) return;
      this.addWatchFile(catalogPath);
      const catalog = JSON.parse(readFileSync(catalogPath, "utf8")) as {
        urban_places: Entry[];
        interior_rooms: Entry[];
        custom_svg_manifest: { icon_id: string; file_path: string }[];
      };
      const entries = [...catalog.urban_places, ...catalog.interior_rooms];
      const names = [
        ...new Set(entries.map((entry) => entry.fallback_icons.lucide)),
      ].sort();
      const imports = names.map(
        (name, index) =>
          `import Icon${index} from "lucide-react/icons/${name}";`,
      );
      const bindings = names.map(
        (name, index) => `${JSON.stringify(name)}:Icon${index}`,
      );
      const types = Object.fromEntries(
        entries.map((entry) => [
          entry.type_id ?? entry.room_type_id,
          {
            iconId:
              entry.icon_source === "custom-svg"
                ? entry.icon_id
                : `lucide/${entry.fallback_icons.lucide}`,
            lucide: entry.fallback_icons.lucide,
          },
        ]),
      );
      const custom = Object.fromEntries(
        catalog.custom_svg_manifest.map((entry) => [
          entry.icon_id,
          entry.file_path,
        ]),
      );
      return `${imports.join("\n")}\nexport const libraryIcons={${bindings.join(",")}};\nexport const catalogTypes=${JSON.stringify(types)};\nexport const customManifest=${JSON.stringify(custom)};`;
    },
  };
}
