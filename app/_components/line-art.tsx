/**
 * The three step illustrations from the original site (capture-card-1/2/3),
 * redrawn as strokes so they can sit on top of photography.
 */
export type LineArtKind = "rings" | "triangle" | "circle";

const rings = Array.from({ length: 21 }, (_, i) => ({
  c: 37.76 + 5.7 * i,
  r: 16.6 + 5.7 * i,
}));

const apex = { x: 154.85, y: 268.37 };
const top = { y: 46.42, left: 33.87, right: 275.84 };
const dots: { x: number; y: number }[] = [];
for (let y = top.y + 20; y < apex.y - 24; y += 18) {
  const half =
    ((apex.y - y) / (apex.y - top.y)) * ((top.right - top.left) / 2) - 14;
  for (let x = apex.x - Math.floor(half / 18) * 18; x <= apex.x + half; x += 18) {
    dots.push({ x, y });
  }
}

export function LineArt({
  kind,
  className,
}: {
  kind: LineArtKind;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 304 304"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      className={className}
    >
      {kind === "rings" &&
        rings.map(({ c, r }) => (
          <circle key={r} cx={c} cy={c} r={r} vectorEffect="non-scaling-stroke" />
        ))}
      {kind === "triangle" && (
        <>
          <path
            d={`M${top.left} ${top.y}L${apex.x} ${apex.y}L${top.right} ${top.y}`}
            vectorEffect="non-scaling-stroke"
          />
          {dots.map(({ x, y }) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={1.3} fill="currentColor" stroke="none" />
          ))}
        </>
      )}
      {kind === "circle" && (
        <circle cx={152.67} cy={151.76} r={67.9} vectorEffect="non-scaling-stroke" />
      )}
    </svg>
  );
}
