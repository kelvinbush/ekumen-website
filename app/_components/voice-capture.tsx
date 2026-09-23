/**
 * The hero's focal object: a spoken note becoming a structured, verified
 * field record — what Ekumen does, shown rather than described.
 */

const transcript =
  "Désherbage ce matin sur la parcelle du Moulin, 1,5 litre par hectare.";

const fields = [
  { label: "Parcelle", value: "Le Moulin · 12,4 ha" },
  { label: "Intervention", value: "Désherbage · 1,5 L/ha" },
  { label: "Conformité", value: "Vérifiée", verified: true },
];

// Uneven heights so the bars read as a voice, not an equaliser.
const bars = [0.35, 0.6, 0.9, 0.5, 1, 0.7, 0.45, 0.85, 0.55, 0.95, 0.4, 0.75, 0.6, 0.3, 0.8, 0.5, 0.65, 0.35];

function Waveform() {
  return (
    <span className="flex h-4 items-center gap-[3px]" aria-hidden="true">
      {bars.map((h, i) => (
        <span
          key={i}
          className="w-[2px] animate-wave rounded-full bg-lime"
          style={{
            height: `${h * 100}%`,
            animationDelay: `${(i % 6) * 0.13}s`,
            animationDuration: `${1 + (i % 4) * 0.15}s`,
          }}
        />
      ))}
    </span>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7.25" stroke="currentColor" strokeOpacity=".5" />
      <path d="M5 8.2 7 10.2 11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function VoiceCapture() {
  const words = transcript.split(" ");
  const wordsDoneAt = 1000 + words.length * 60;

  return (
    <figure className="w-[min(360px,100%)]">
      {/* The voice input sits directly on the photograph, no container. */}
      <figcaption className="flex animate-fade items-center justify-center gap-3 text-[12px] font-medium tracking-wide text-white/85 [animation-delay:500ms]">
        <span className="size-2 rounded-full bg-lime shadow-[0_0_12px_rgba(208,242,76,0.9)]" />
        Saisie vocale
        <Waveform />
        <span className="tabular-nums text-white/50">0:07</span>
      </figcaption>

      <div className="mt-4 animate-rise rounded-[24px] bg-white/[0.07] p-5 text-left shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] ring-1 ring-white/15 backdrop-blur-xl [animation-delay:750ms]">
        <blockquote className="font-serif text-[21px] italic leading-[1.22] text-white">
          «&nbsp;
          {words.map((word, i) => (
            <span key={i}>
              <span
                className="inline-block animate-word"
                style={{ animationDelay: `${1000 + i * 60}ms` }}
              >
                {word}
              </span>{" "}
            </span>
          ))}
          »
        </blockquote>

        <dl className="mt-4 border-t border-white/10 text-[13px]">
          {fields.map((field, i) => (
            <div
              key={field.label}
              className="flex animate-fade items-center justify-between gap-4 border-b border-white/10 py-2.5 last:border-0 last:pb-0"
              style={{ animationDelay: `${wordsDoneAt + 150 + i * 160}ms` }}
            >
              <dt className="text-white/50">{field.label}</dt>
              <dd
                className={
                  field.verified
                    ? "flex items-center gap-1.5 font-medium text-lime"
                    : "text-white"
                }
              >
                {field.verified && <Check />}
                {field.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </figure>
  );
}
