import Image from "next/image";
import { photos } from "@/lib/photos";
import { Eyebrow } from "./brand";
import { Steps, type Step } from "./steps";

const steps: Step[] = [
  {
    id: "collecter",
    label: "Collecter",
    title: "À la voix, depuis le terrain.",
    body: "Les agents vérifient la conformité et automatisent la saisie au moment où l'information existe.",
    photo: photos.stepVoice,
    art: "rings",
  },
  {
    id: "traiter",
    label: "Traiter",
    title: "Propre par construction, plus par correction.",
    body: "Structuration automatique, partage entre acteurs autorisés, monitoring qualité permanent.",
    photo: photos.stepAerial,
    art: "triangle",
  },
  {
    id: "mettre-en-action",
    label: "Mettre en action",
    title: "La donnée devient un outil de pilotage.",
    body: "Aide à la planification, à la commercialisation, à l'opérationnel. Plus une contrainte administrative.",
    photo: photos.stepTractor,
    art: "circle",
  },
];

/** Small photo set into the running text, the way the reference does it. */
function InlinePhoto() {
  return (
    <span className="relative mx-[0.12em] inline-block h-[0.74em] w-[1.9em] translate-y-[0.06em] overflow-hidden rounded-full align-baseline">
      <Image
        src={photos.pillField.src}
        alt=""
        fill
        sizes="150px"
        className="object-cover"
      />
    </span>
  );
}

export function PlatformSection() {
  return (
    <section id="plateforme" className="scroll-mt-20 bg-white">
      <div className="mx-auto max-w-[1360px] px-5 pb-28 sm:px-8 lg:px-10 lg:pb-40">
        <div className="grid gap-5 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3 lg:pt-4">
            <Eyebrow>La plateforme</Eyebrow>
          </div>
          <h2 className="reveal text-display font-serif leading-[1.02] tracking-[-0.015em] lg:col-span-9">
            Une plateforme agentique <InlinePhoto /> où{" "}
            <em className="text-ink/45">toute la filière</em> participe au
            même effort.
          </h2>
        </div>

        <Steps steps={steps} />
      </div>
    </section>
  );
}
