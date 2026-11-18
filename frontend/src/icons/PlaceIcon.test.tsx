import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { resolvePlaceIcon } from "./resolvePlaceIcon";
import { PlaceIcon } from "./PlaceIcon";
import { catalogTypes, customManifest } from "virtual:geospace-icon-catalog";
type Entry = {
  type_id?: string;
  room_type_id?: string;
  icon_source: string;
  icon_id: string;
  fallback_icons: { lucide: string };
};
const iconRoot = resolve(process.cwd(), "../icons");
const catalog = JSON.parse(
  readFileSync(resolve(iconRoot, "catalog.json"), "utf8"),
) as {
  urban_places: Entry[];
  interior_rooms: Entry[];
  custom_svg_manifest: { icon_id: string; file_path: string }[];
};
describe("canonical icon adapter", () => {
  it("resolves all589 types from the current catalog with custom priority and exact Lucide bindings", () => {
    const entries = [...catalog.urban_places, ...catalog.interior_rooms];
    expect(entries).toHaveLength(589);
    expect(Object.keys(catalogTypes)).toHaveLength(entries.length);
    for (const entry of entries) {
      const id = entry.type_id ?? entry.room_type_id!;
      const icon = resolvePlaceIcon(id);
      expect(icon.source, id).toBe(
        entry.icon_source === "custom-svg" ? "custom" : "lucide",
      );
      expect(icon.iconId, id).toBe(
        entry.icon_source === "custom-svg"
          ? entry.icon_id
          : `lucide/${entry.fallback_icons.lucide}`,
      );
    }
  });
  it("exposes all48 original custom SVGs as assets without injecting their markup", () => {
    expect(Object.keys(customManifest)).toHaveLength(48);
    const urls = new Set<string>();
    for (const entry of catalog.custom_svg_manifest) {
      const binding = [...catalog.urban_places, ...catalog.interior_rooms].find(
        (e) => e.icon_id === entry.icon_id,
      )!;
      const icon = resolvePlaceIcon(binding.type_id ?? binding.room_type_id);
      expect(icon.source).toBe("custom");
      if (icon.source !== "custom") throw new Error("Expected custom asset");
      expect(icon.url).toContain(entry.file_path.split("/").at(-1));
      urls.add(icon.url);
      const svg = readFileSync(resolve(iconRoot, entry.file_path), "utf8");
      expect(svg).toContain('stroke="currentColor"');
      expect(svg).not.toMatch(
        /<(script|foreignObject|image|use)\b|\bon\w+=|\bhref=|url\(/i,
      );
    }
    expect(urls.size).toBe(48);
  });
  it("identifies unspecified, unknown and prototype-shaped inputs as generic instead of inventing a binding", () => {
    expect(resolvePlaceIcon()).toMatchObject({
      source: "fallback",
      iconId: "generic/place",
      reason: "unspecified-type",
    });
    for (const id of ["unknown-kind", "__proto__", "constructor"])
      expect(resolvePlaceIcon(id)).toMatchObject({
        source: "fallback",
        reason: "unknown-type",
      });
  });
  it("keeps icon artwork decorative with visible names and constant compact sizing", () => {
    const { container } = render(
      <button type="button">
        <PlaceIcon catalogType="open_air_market_central_stall" size={16} />
        Open-air market
      </button>,
    );
    expect(
      screen.getByRole("button", { name: "Open-air market" }),
    ).toBeVisible();
    const icon = container.querySelector<HTMLElement>(".place-icon")!;
    expect(icon).toHaveAttribute("aria-hidden", "true");
    expect(icon).toHaveStyle({ width: "16px", height: "16px" });
    expect(container.querySelector("svg")).toBeNull();
    expect(
      container.querySelector<HTMLElement>(".place-icon__custom")!.style
        .maskImage,
    ).toContain("url(");
  });
});
