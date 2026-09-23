import { ArrowCircle } from "@/app/_components/brand";

const steps = [
  {
    label: "Collecter",
    title: "À la voix, depuis le terrain.",
    body: "Les agents vérifient la conformité et automatisent la saisie au moment où l'information existe.",
    offset: "lg:mt-0",
  },
  {
    label: "Traiter",
    title: "Propre par construction, plus par correction.",
    body: "Structuration automatique, partage entre acteurs autorisés, monitoring qualité permanent.",
    offset: "lg:mt-[150px]",
  },
  {
    label: "Mettre en action",
    title: "La donnée devient un outil de pilotage.",
    body: "Aide à la planification, à la commercialisation, à l'opérationnel. Plus une contrainte administrative.",
    offset: "lg:mt-[300px]",
  },
];

export function PlatformV2() {
  return (
    <section
      id="plateforme"
      className="scroll-mt-20 bg-[linear-gradient(180deg,var(--color-ink)_0%,var(--color-ink)_22%,var(--color-sage)_62%,var(--color-lime)_100%)] text-white"
    >
      <div className="mx-auto max-w-[1440px] px-5 pb-16 pt-24 sm:px-8 lg:px-14 lg:pb-20 lg:pt-32">
        <p className="text-[12px] uppercase tracking-[0.2em] text-white/50">
          <span className="text-lime">03</span> — La plateforme
        </p>
        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:items-start">
          <h2 className="reveal font-serif text-[clamp(44px,6.4vw,104px)] uppercase leading-[0.88] tracking-[-0.01em]">
            Une plateforme
            <br />
            agentique
          </h2>
          <p className="reveal max-w-[560px] text-[clamp(18px,1.6vw,24px)] font-medium uppercase leading-[1.25] lg:justify-self-end lg:pt-3">
            <span className="text-white/40">Où toute la filière</span> participe au même effort.
          </p>
        </div>

        {/* Staircase: one column per step, hairlines between */}
        <ol className="mt-16 grid border-white/20 lg:mt-24 lg:min-h-[600px] lg:grid-cols-3 lg:border-r">
          {steps.map((step, i) => (
            <li
              key={step.label}
              className="border-l border-white/20 pb-6 pl-5 lg:px-5 lg:pb-10"
            >
              <article
                className={`reveal rounded-[14px] bg-ink p-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)] ring-1 ring-white/10 lg:p-7 ${step.offset}`}
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-[13px] tabular-nums text-white/45">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="size-1.5 rounded-full bg-lime" />
                </div>
                <h3 className="mt-6 text-[17px] font-medium uppercase tracking-[0.04em]">
                  {step.label}
                </h3>
                <p className="mt-3 font-serif text-[clamp(24px,2vw,30px)] leading-[1.05] text-lime">
                  {step.title}
                </p>
                <p className="mt-4 text-[14px] leading-relaxed text-white/60">
                  {step.body}
                </p>
              </article>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-ink/20 pt-8 text-ink">
          <p className="max-w-[420px] text-[15px] font-medium leading-snug">
            Collecter, traiter, mettre en action : une seule donnée, fiable et partagée, du champ à l&apos;usine.
          </p>
          <a
            href="#demo"
            className="group inline-flex h-12 items-center gap-4 rounded-full bg-ink pl-6 pr-1.5 text-[15px] font-medium text-white transition hover:bg-ink/90"
          >
            Demander une démo
            <ArrowCircle tone="lime" />
          </a>
        </div>
      </div>
    </section>
  );
}
