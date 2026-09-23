"use client";

import Image from "next/image";
import { useState } from "react";
import type { Photo } from "@/lib/photos";
import { ToggleIcon } from "./brand";
import { LineArt, type LineArtKind } from "./line-art";

export type Step = {
  id: string;
  label: string;
  title: string;
  body: string;
  photo: Photo;
  art: LineArtKind;
};

const tones = ["bg-sage", "bg-clay", "bg-stone"];

export function Steps({ steps }: { steps: Step[] }) {
  const [open, setOpen] = useState<number | null>(0);
  // The tile keeps showing the last opened step when everything is collapsed.
  const [shown, setShown] = useState(0);

  function toggle(i: number) {
    if (open === i) {
      setOpen(null);
    } else {
      setOpen(i);
      setShown(i);
    }
  }

  return (
    <div className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-12">
      <div className="hidden lg:col-span-3 lg:block">
        <div className="sticky top-28 max-w-[300px]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-sage">
            {steps.map((step, i) => (
              <div
                key={step.id}
                aria-hidden={shown !== i}
                className={`absolute inset-0 transition-opacity duration-700 ${shown === i ? "opacity-100" : "opacity-0"}`}
              >
                <Image
                  src={step.photo.src}
                  alt={step.photo.alt}
                  fill
                  sizes="300px"
                  className={`object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(.2,.7,.2,1)] ${shown === i ? "scale-100" : "scale-110"}`}
                />
                <div className={`absolute inset-0 ${tones[i % tones.length]} opacity-55 mix-blend-multiply`} />
                <LineArt
                  kind={step.art}
                  className="absolute inset-[8%] size-[84%] text-white/75"
                />
              </div>
            ))}
            <span className="absolute left-3 top-3 rounded-full bg-white px-3.5 py-1.5 text-[13px] font-medium text-ink">
              {steps[shown].label}
            </span>
          </div>
          <div className="mt-4 flex items-center gap-1.5" aria-hidden="true">
            {steps.map((step, i) => (
              <span
                key={step.id}
                className={`h-[3px] rounded-full transition-all duration-500 ${shown === i ? "w-8 bg-ink" : "w-3 bg-ink/15"}`}
              />
            ))}
          </div>
        </div>
      </div>

      <ol className="border-b border-ink/15 lg:col-span-9">
        {steps.map((step, i) => {
          const isOpen = open === i;
          const panelId = `step-${step.id}`;
          const number = String(i + 1).padStart(2, "0");
          return (
            <li
              key={step.id}
              className="group relative grid grid-cols-[64px_1fr_32px] items-start gap-x-4 border-t border-ink/15 py-7 sm:grid-cols-[132px_200px_1fr_32px] sm:py-8"
            >
              <span className={`font-serif text-[44px] leading-[0.85] transition-colors sm:text-[64px] ${isOpen ? "text-ink" : "text-ink/80 group-hover:text-ink"}`}>
                {number}
              </span>
              <h3 className="pt-1.5 text-[17px] font-medium sm:pt-3">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(i)}
                  className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-ink"
                >
                  {step.label}
                </button>
              </h3>
              <div
                id={panelId}
                aria-hidden={!isOpen}
                className={`col-span-2 col-start-2 grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] sm:col-span-1 sm:col-start-3 sm:row-start-1 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
              >
                <div className="overflow-hidden">
                  <div className="max-w-[440px] pt-4 sm:pt-2">
                    <p className="font-serif text-[28px] leading-[1.05] sm:text-[32px]">
                      {step.title}
                    </p>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink/60">
                      {step.body}
                    </p>
                    <div className="relative mt-5 aspect-[16/10] overflow-hidden rounded-2xl lg:hidden">
                      <Image
                        src={step.photo.src}
                        alt={step.photo.alt}
                        fill
                        sizes="(min-width: 640px) 440px, 90vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <span className="col-start-3 row-start-1 grid size-8 place-items-center pt-2 sm:col-start-4 sm:pt-4">
                <ToggleIcon open={isOpen} className="size-[15px]" />
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
