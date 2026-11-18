import MapPin from "lucide-react/icons/map-pin";
import type { LucideIcon } from "lucide-react";
import {
  catalogTypes,
  customManifest,
  libraryIcons,
} from "virtual:geospace-icon-catalog";
const assets = import.meta.glob<string>("../../../icons/custom/*.svg", {
  eager: true,
  query: "?url&no-inline",
  import: "default",
});
export type ResolvedPlaceIcon =
  | Readonly<{ source: "custom"; iconId: string; url: string }>
  | Readonly<{ source: "lucide"; iconId: string; Component: LucideIcon }>
  | Readonly<{
      source: "fallback";
      iconId: "generic/place";
      Component: LucideIcon;
      reason: "unspecified-type" | "unknown-type" | "missing-binding";
    }>;
/** UI-only resolution. Catalog identifiers never become simulation behavior. */
export function resolvePlaceIcon(catalogType?: string): ResolvedPlaceIcon {
  const binding =
    catalogType && Object.hasOwn(catalogTypes, catalogType)
      ? catalogTypes[catalogType]
      : undefined;
  if (binding) {
    const path = Object.hasOwn(customManifest, binding.iconId)
      ? customManifest[binding.iconId]
      : undefined;
    const url = path ? assets[`../../../icons/${path}`] : undefined;
    if (url) return { source: "custom", iconId: binding.iconId, url };
    const Component = Object.hasOwn(libraryIcons, binding.lucide)
      ? libraryIcons[binding.lucide]
      : undefined;
    if (Component)
      return {
        source: "lucide",
        iconId: `lucide/${binding.lucide}`,
        Component,
      };
  }
  return {
    source: "fallback",
    iconId: "generic/place",
    Component: MapPin,
    reason: !catalogType
      ? "unspecified-type"
      : binding
        ? "missing-binding"
        : "unknown-type",
  };
}
