import { photos } from "@/lib/photos";
import { Eyebrow } from "./brand";
import { StageCards, type Stage } from "./stage-cards";

const stages: Stage[] = [
  {
    id: "agriculteurs",
    label: "Agriculteurs",
    title: "Saisir deux fois.",
    body: "Au champ sur un carnet, puis le soir au bureau, dans un logiciel qui ne parle à aucun autre.",
    photo: photos.stageFarmer,
  },
  {
    id: "conseillers",
    label: "Conseillers",
    title: "Retranscrire au lieu de conseiller.",
    body: "Chaque visite se prolonge en heures de ressaisie, au détriment du temps passé sur le terrain.",
    photo: photos.stageAdvisors,
  },
  {
    id: "cooperatives",
    label: "Coopératives",
    title: "Réconcilier sans fin.",
    body: "Coopératives, négoces et chambres consolident des données éparpillées entre outils, avant chaque campagne.",
    photo: photos.stageCoop,
  },
  {
    id: "industriels",
    label: "Industriels",
    title: "Reconstituer l’amont.",
    body: "Une traçabilité incomplète, reconstruite à coups de relances, de tableurs et de déclaratifs.",
    photo: photos.stageIndustry,
  },
];

export function CostSection() {
  return (
    <section
      id="constat"
      className="relative z-10 -mt-12 mx-2 rounded-t-[28px] bg-white sm:mx-3 sm:rounded-t-[36px]"
    >
      <div className="mx-auto max-w-[1360px] px-5 pb-24 pt-16 sm:px-8 lg:px-10 lg:pb-36 lg:pt-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col lg:col-span-3">
            <Eyebrow>Le constat</Eyebrow>
            <h2 className="reveal mt-5 max-w-[420px] font-serif text-[clamp(34px,3vw,42px)] leading-[1.02] tracking-[-0.01em]">
              Le coût de la donnée se paie{" "}
              <em className="text-ink/45">à chaque étage de la filière.</em>
            </h2>
            <p className="mt-6 max-w-[300px] text-[15px] leading-relaxed text-ink/70">
              Personne n&apos;est équipé pour bien faire. Alors chacun compense,
              à sa charge, à son coût.
            </p>
            <p className="mt-10 max-w-[280px] border-t border-ink/10 pt-5 text-[14px] leading-relaxed text-ink/55 lg:mt-auto">
              Une donnée <span className="text-ink">chère à produire</span>,{" "}
              <span className="text-ink">incertaine en qualité</span>, et{" "}
              <span className="text-ink">sous-exploitée</span> là où elle
              pourrait créer de la valeur.
            </p>
          </div>

          <div className="lg:col-span-9">
            <StageCards stages={stages} defaultOpen={2} />
          </div>
        </div>
      </div>
    </section>
  );
}
