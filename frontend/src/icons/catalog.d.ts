declare module "virtual:geospace-icon-catalog" {
  import type { LucideIcon } from "lucide-react";
  export const libraryIcons: Readonly<Record<string, LucideIcon | undefined>>;
  export const catalogTypes: Readonly<
    Record<string, Readonly<{ iconId: string; lucide: string }> | undefined>
  >;
  export const customManifest: Readonly<Record<string, string | undefined>>;
}
