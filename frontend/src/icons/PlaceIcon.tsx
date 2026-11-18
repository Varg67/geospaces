import { resolvePlaceIcon } from "./resolvePlaceIcon";
import "./icons.css";
/** Decorative by contract: every usage must retain a visible place name. */
export function PlaceIcon({
  catalogType,
  size = 20,
}: {
  catalogType?: string | undefined;
  size?: 16 | 20 | 24;
}) {
  const icon = resolvePlaceIcon(catalogType);
  return (
    <span
      className="place-icon"
      aria-hidden="true"
      data-icon-source={icon.source}
      data-icon-id={icon.iconId}
      title={icon.source === "fallback" ? "Generic place symbol" : undefined}
      style={{ width: size, height: size }}
    >
      {icon.source === "custom" ? (
        <span
          className="place-icon__custom"
          style={{ maskImage: `url("${icon.url}")` }}
        />
      ) : (
        <icon.Component
          size={size}
          strokeWidth={2}
          focusable="false"
          aria-hidden="true"
        />
      )}
    </span>
  );
}
