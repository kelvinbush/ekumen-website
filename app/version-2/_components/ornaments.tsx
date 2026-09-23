/** Lot barcode — a nod to traceability, set vertically like a label. */
const bars = [3, 1, 2, 1, 4, 1, 1, 3, 2, 1, 1, 2, 4, 1, 2, 1, 3, 1, 1, 2, 1, 4, 2, 1, 1, 3, 1, 2];

// Alternate bars and gaps, each followed by a 1-unit spacer.
const offsets = bars.map((_, i) => bars.slice(0, i).reduce((sum, h) => sum + h + 1, 0));
const rects = bars.flatMap((h, i) => (i % 2 === 0 ? [{ y: offsets[i], h }] : []));
const length = offsets[bars.length - 1] + bars[bars.length - 1];

export function Barcode({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 36 ${length}`}
      preserveAspectRatio="none"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      {rects.map((r) => (
        <rect key={r.y} x="0" y={r.y} width="36" height={r.h} />
      ))}
    </svg>
  );
}

/** Six-arm asterisk used as a marker, echoing the reference's ✱. */
export function Asterisk({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true" className={className}>
      <path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9" />
    </svg>
  );
}
