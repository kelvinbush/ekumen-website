"use client";

import Image from "next/image";
import { useState } from "react";
import type { Photo } from "@/lib/photos";
import { ToggleIcon } from "./brand";

export type Stage = {
  id: string;
  label: string;
  title: string;
  body: string;
  photo: Photo;
};

export function StageCards({
  stages,
  defaultOpen = null,
}: {
  stages: Stage[];
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <ul className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:overflow-visible lg:px-0 lg:pb-0">
      {stages.map((stage, i) => {
        const isOpen = open === i;
        const panelId = `stage-${stage.id}`;
        return (
          <li
            key={stage.id}
            className="reveal relative h-[440px] shrink-0 basis-[78%] snap-start overflow-hidden rounded-[22px] bg-mist sm:basis-[44%] lg:h-[clamp(420px,34vw,500px)] lg:flex-1 lg:basis-0"
          >
            <Image
              src={stage.photo.src}
              alt={stage.photo.alt}
              fill
              sizes="(min-width: 1024px) 22vw, 78vw"
              className={`object-cover saturate-[.85] transition duration-700 ease-[cubic-bezier(.2,.7,.2,1)] ${isOpen ? "scale-110 opacity-0" : "opacity-100"}`}
            />
            <div
              className={`pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(25,27,29,0.28)_0%,rgba(25,27,29,0)_30%,rgba(25,27,29,0)_65%,rgba(25,27,29,0.35)_100%)] transition-opacity duration-500 ${isOpen ? "opacity-0" : ""}`}
            />

            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : i)}
              className={`group absolute inset-0 flex items-start justify-between p-3 text-left focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-ink ${isOpen ? "text-ink" : "text-white"}`}
            >
              <span className="rounded-full bg-white px-4 py-2 text-[14px] font-medium text-ink shadow-[0_1px_2px_rgba(25,27,29,0.06)]">
                {stage.label}
              </span>
              <span className="mr-1 mt-1 grid size-8 place-items-center rounded-full transition-colors group-hover:bg-white/15">
                <ToggleIcon open={isOpen} className="size-[15px]" />
              </span>
              <span className="sr-only">
                {isOpen ? "Masquer le détail" : "Voir le détail"}
              </span>
            </button>

            <div
              id={panelId}
              aria-hidden={!isOpen}
              className={`pointer-events-none absolute inset-x-0 bottom-0 p-5 transition duration-500 ease-[cubic-bezier(.2,.7,.2,1)] ${isOpen ? "translate-y-0 opacity-100 delay-150" : "translate-y-6 opacity-0"}`}
            >
              <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-ink/40">
                Étage {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-3 font-serif text-[27px] leading-[1.02] text-ink">
                {stage.title}
              </p>
              <p className="mt-3 text-[14px] leading-relaxed text-ink/60">
                {stage.body}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
