import type { Point } from "../../domain/world";
export type Transform = Readonly<{ scale: number; x: number; y: number }>;
export function fitTransform(
  bounds: { width: number; height: number },
  viewport: { width: number; height: number },
): Transform {
  const scale = Math.min(
    viewport.width / bounds.width,
    viewport.height / bounds.height,
  );
  return {
    scale,
    x: (viewport.width - bounds.width * scale) / 2,
    y: (viewport.height - bounds.height * scale) / 2,
  };
}
export function project(point: Point, transform: Transform): Point {
  return {
    x: point.x * transform.scale + transform.x,
    y: point.y * transform.scale + transform.y,
  };
}
export function isOctilinear(points: readonly Point[]): boolean {
  return points.every((point, index) => {
    if (!index) return true;
    const previous = points[index - 1]!;
    const dx = Math.abs(point.x - previous.x),
      dy = Math.abs(point.y - previous.y);
    return dx < 0.001 || dy < 0.001 || Math.abs(dx - dy) < 0.001;
  });
}
function roundedCorners(points: readonly Point[], radius: number) {
  return points.slice(1, -1).flatMap((corner, index) => {
    const previous = points[index]!,
      next = points[index + 2]!;
    const before = Math.hypot(corner.x - previous.x, corner.y - previous.y),
      after = Math.hypot(next.x - corner.x, next.y - corner.y);
    if (!before || !after) return [];
    const r = Math.min(radius, before / 2, after / 2);
    return [
      {
        start: {
          x: corner.x - ((corner.x - previous.x) * r) / before,
          y: corner.y - ((corner.y - previous.y) * r) / before,
        },
        corner,
        end: {
          x: corner.x + ((next.x - corner.x) * r) / after,
          y: corner.y + ((next.y - corner.y) * r) / after,
        },
      },
    ];
  });
}
export function roundedPath(points: readonly Point[], radius = 10): string {
  if (!points.length) return "";
  const first = points[0]!,
    last = points[points.length - 1]!;
  return (
    `M ${first.x} ${first.y}` +
    roundedCorners(points, radius)
      .map(
        ({ start, corner, end }) =>
          ` L ${start.x} ${start.y} Q ${corner.x} ${corner.y} ${end.x} ${end.y}`,
      )
      .join("") +
    ` L ${last.x} ${last.y}`
  );
}
/** Sample the same rounded geometry as roundedPath, within subpixel tolerance. */
export function roundedPolyline(
  points: readonly Point[],
  radius = 10,
): readonly Point[] {
  if (!points.length) return [];
  const result: Point[] = [points[0]!];
  for (const { start, corner, end } of roundedCorners(points, radius)) {
    result.push(start);
    for (let i = 1; i <= 24; i++) {
      const t = i / 24,
        u = 1 - t;
      result.push({
        x: u * u * start.x + 2 * u * t * corner.x + t * t * end.x,
        y: u * u * start.y + 2 * u * t * corner.y + t * t * end.y,
      });
    }
  }
  result.push(points[points.length - 1]!);
  return result;
}
export function pointAlong(
  points: readonly Point[],
  progress: number,
): Point | null {
  if (!points.length) return null;
  const lengths = points
    .slice(1)
    .map((point, i) =>
      Math.hypot(point.x - points[i]!.x, point.y - points[i]!.y),
    );
  let remaining =
    lengths.reduce((sum, length) => sum + length, 0) *
    Math.max(0, Math.min(1, progress));
  for (let i = 0; i < lengths.length; i++) {
    const length = lengths[i]!;
    if (remaining <= length && length > 0) {
      const a = points[i]!,
        b = points[i + 1]!;
      const t = remaining / length;
      return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
    }
    remaining -= length;
  }
  return points[points.length - 1]!;
}
