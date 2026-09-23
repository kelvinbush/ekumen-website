"use client";

import { useState } from "react";
import { Logo } from "@/app/_components/brand";

const links = [
  { label: "Accueil", href: "#", current: true },
  { label: "Nos solutions", href: "#constat" },
  { label: "Ressources", href: "#plateforme" },
];

export function NavV2() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-20 flex h-[72px] items-center justify-between border-b border-white/10">
      <Logo className="text-white" />

      <nav aria-label="Principale" className="hidden md:block">
        <ul className="flex items-center gap-7 text-[14px]">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                aria-current={l.current ? "page" : undefined}
                className={`inline-flex items-center gap-2 transition-colors ${l.current ? "text-white" : "text-white/60 hover:text-white"}`}
              >
                {l.current && <span className="size-1.5 rounded-full bg-lime" />}
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <button
        type="button"
        aria-expanded={open}
        aria-controls="menu-v2"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        onClick={() => setOpen((v) => !v)}
        className="grid size-10 place-items-center rounded-full ring-1 ring-white/20 md:hidden"
      >
        <span className="relative block h-3 w-4">
          <span className={`absolute left-0 h-px w-4 bg-lime transition ${open ? "top-1.5 rotate-45" : "top-0"}`} />
          <span className={`absolute left-0 top-1.5 h-px w-4 bg-lime transition ${open ? "opacity-0" : ""}`} />
          <span className={`absolute left-0 h-px w-4 bg-lime transition ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
        </span>
      </button>

      <div
        id="menu-v2"
        hidden={!open}
        className="absolute inset-x-0 top-full z-30 border-b border-white/10 bg-ink py-6 md:hidden"
      >
        <ul className="space-y-3 font-serif text-[40px] uppercase leading-none">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} onClick={() => setOpen(false)} className={l.current ? "text-lime" : "text-white"}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex items-center justify-between text-[14px] text-white/60">
          <a href="#">Log in</a>
          <span>
            EN / <span className="text-white">FR</span>
          </span>
        </div>
        <a
          href="#demo"
          className="mt-5 flex h-11 items-center justify-center rounded-full bg-lime text-[14px] font-medium text-ink"
        >
          Book a Demo
        </a>
      </div>
    </header>
  );
}

/** Secondary links that sit on the photograph, top right. */
export function UtilityNav() {
  return (
    <div className="flex items-center gap-5 text-[13px]">
      <p className="tracking-wide text-white/55">
        <a href="#" className="hover:text-white">EN</a>
        <span className="mx-1">/</span>
        <a href="#" aria-current="true" className="text-white">FR</a>
      </p>
      <a href="#" className="text-white/75 hover:text-white">
        Log in
      </a>
      <a
        href="#demo"
        className="inline-flex h-10 items-center rounded-full bg-lime px-5 text-[14px] font-medium text-ink transition hover:brightness-105"
      >
        Book a Demo
      </a>
    </div>
  );
}
