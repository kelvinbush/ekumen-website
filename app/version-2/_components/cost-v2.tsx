import Image from "next/image";
import { photos, type Photo } from "@/lib/photos";
import { Asterisk } from "./ornaments";

type Stage = {
  label: string;
  title: string;
  body: string;
  photo: Photo;
  /** Where the lime label panel sits on the photo. */
  panel: "bottom-left" | "top-right" | "top-left" | "bottom-right";
};

const stages: Stage[] = [
  {
    label: "Agriculteurs",
    title: "Saisir deux fois.",
    body: "Au champ sur un carnet, puis le soir au bureau, dans un logiciel qui ne parle à aucun autre.",
    photo: photos.v2StageFarmer,
    panel: "bottom-left",
  },
  {
    label: "Conseillers",
    title: "Retranscrire au lieu de conseiller.",
    body: "Chaque visite se prolonge en heures de ressaisie, au détriment du temps passé sur le terrain.",
    photo: photos.stageAdvisors,
    panel: "top-right",
  },
  {
    label: "Coopératives",
    title: "Réconcilier sans fin.",
    body: "Coopératives, négoces et chambres consolident des données éparpillées entre outils, avant chaque campagne.",
    photo: photos.stageCoop,
    panel: "top-left",
  },
  {
    label: "Industriels",
    title: "Reconstituer l’amont.",
    body: "Une traçabilité incomplète, reconstruite à coups de relances, de tableurs et de déclaratifs.",
    photo: photos.stageIndustry,
    panel: "bottom-right",
  },
];

const panelPosition: Record<Stage["panel"], string> = {
  "bottom-left": "bottom-0 left-0",
  "top-right": "top-0 right-0",
  "top-left": "top-0 left-0",
  "bottom-right": "bottom-0 right-0",
};

function StageTile({ stage, index }: { stage: Stage; index: number }) {
  return (
    <article className="reveal group relative aspect-[5/4] overflow-hidden bg-white/5">
      <Image
        src={stage.photo.src}
        alt={stage.photo.alt}
        fill
        sizes="(min-width: 768px) 45vw, 100vw"
        className="object-cover grayscale transition duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.03] group-hover:grayscale-0"
      />
      <div
        className={`absolute flex w-[62%] flex-col justify-between bg-lime-soft p-5 text-ink sm:w-[56%] sm:p-7 ${panelPosition[stage.panel]} aspect-square max-sm:aspect-auto max-sm:min-h-[62%]`}
      >
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink/50">
            Étage {String(index + 1).padStart(2, "0")}
          </p>
          <h4 className="mt-2 font-serif text-[clamp(28px,2.6vw,40px)] uppercase leading-[0.9]">
            {stage.label}
          </h4>
        </div>
        <div className="flex items-end justify-between gap-4">
          <p className="text-[13px] leading-snug text-ink/70 sm:text-[14px]">
            <span className="font-medium text-ink">{stage.title}</span> {stage.body}
          </p>
          <Asterisk className="size-5 shrink-0" />
        </div>
      </div>
    </article>
  );
}

export function CostV2() {
  return (
    <section id="constat" className="bg-ink text-white">
      {/* Statement across a full-bleed farm landscape */}
      <div className="relative isolate overflow-hidden border-y border-white/10">
        <Image
          src={photos.v2Statement.src}
          alt=""
          fill
          sizes="100vw"
          className="-z-10 object-cover object-[50%_60%] brightness-[.6] contrast-[1.2] grayscale"
        />
        <div className="absolute inset-0 -z-10 bg-lime opacity-35 mix-blend-color" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(25,27,29,0.85)_0%,rgba(25,27,29,0.3)_55%,rgba(25,27,29,0.1)_100%)]" />

        <div className="mx-auto flex min-h-[620px] max-w-[1440px] flex-col justify-between px-5 py-14 sm:px-8 lg:min-h-[min(760px,92svh)] lg:px-14 lg:py-16">
          <div className="flex flex-wrap items-start justify-between gap-8">
            <p className="text-[12px] uppercase tracking-[0.2em] text-white/50">
              <span className="text-lime">02</span> — Le constat
            </p>
            <div className="max-w-[300px] space-y-3 text-[14px] leading-relaxed text-white/80">
              <p>Personne n&apos;est équipé pour bien faire.</p>
              <p>Alors chacun compense, à sa charge, à son coût.</p>
            </div>
          </div>

          <h2 className="reveal font-serif uppercase leading-[0.9] tracking-[-0.01em]">
            <span className="block text-[clamp(40px,6vw,96px)]">Le coût de la donnée</span>
            <span className="block text-[clamp(40px,6vw,96px)] sm:pl-[10%]">se paie à chaque étage</span>
            <span className="mt-2 flex items-center justify-end gap-5 text-[clamp(40px,6vw,96px)] text-lime">
              <span aria-hidden="true" className="h-[2px] w-[clamp(40px,8vw,140px)] bg-lime" />
              de la filière.
            </span>
          </h2>
        </div>
      </div>

      {/* The four stages */}
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-14 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <h3 className="flex flex-wrap items-center gap-x-4 font-serif text-[clamp(36px,4.4vw,64px)] uppercase leading-[0.95] text-lime">
            Chacun compense
            <Asterisk className="size-[0.5em] text-lime" />
            à son coût
          </h3>
          <p className="max-w-[360px] text-[15px] leading-relaxed text-white/60">
            Une donnée <span className="text-white">chère à produire</span>,{" "}
            <span className="text-white">incertaine en qualité</span>, et{" "}
            <span className="text-white">sous-exploitée</span> là où elle pourrait créer de la valeur.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:mt-16 lg:gap-6">
          {stages.map((stage, i) => (
            <StageTile key={stage.label} stage={stage} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
