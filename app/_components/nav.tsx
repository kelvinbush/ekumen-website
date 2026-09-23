"use client";

import { useEffect, useState } from "react";
import { Logo } from "./brand";

const links = [
  { label: "Accueil", href: "#", current: true },
  { label: "Nos solutions", href: "#constat", menu: true },
  { label: "Ressources", href: "#plateforme" },
];

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" className="size-3" fill="none" aria-hidden="true">
      <path d="M5 9l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function NavLinks({ tone }: { tone: "light" | "dark" }) {
  const base = tone === "light" ? "text-white/75 hover:text-white" : "text-ink/65 hover:text-ink";
  const current = tone === "light" ? "text-white" : "text-ink";
  return (
    <ul className="flex items-center gap-8 text-[14px]">
      {links.map((l) => (
        <li key={l.label}>
          <a
            href={l.href}
            aria-current={l.current ? "page" : undefined}
            className={`inline-flex items-center gap-1.5 transition-colors ${l.current ? current : base}`}
          >
            {l.label}
            {l.menu && <Chevron />}
          </a>
        </li>
      ))}
    </ul>
  );
}

function BookDemo({ className = "inline-flex" }: { className?: string }) {
  return (
    <a
      href="#demo"
      className={`h-10 items-center rounded-full bg-lime px-5 text-[14px] font-medium text-ink transition hover:brightness-105 ${className}`}
    >
      Book a Demo
    </a>
  );
}

export function HeroNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-20 px-5 pt-5 text-white sm:px-8 lg:px-10 lg:pt-7">
      <nav
        aria-label="Principale"
        className="grid grid-cols-[1fr_auto] items-center lg:grid-cols-[1fr_auto_1fr]"
      >
        <div className="hidden lg:block">
          <NavLinks tone="light" />
        </div>

        <Logo className="text-white" />

        <div className="flex items-center justify-end gap-6">
          <p className="hidden text-[13px] tracking-wide text-white/50 lg:block">
            <a href="#" className="hover:text-white">EN</a>
            <span className="mx-1">/</span>
            <a href="#" aria-current="true" className="text-white">FR</a>
          </p>
          <a href="#" className="hidden text-[14px] text-white/75 hover:text-white lg:block">
            Log in
          </a>
          <BookDemo className="hidden sm:inline-flex" />
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-full bg-white/10 ring-1 ring-white/20 backdrop-blur-md lg:hidden"
          >
            <span className="relative block h-3 w-4">
              <span className={`absolute left-0 h-px w-4 bg-white transition ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 top-1.5 h-px w-4 bg-white transition ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 h-px w-4 bg-white transition ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="absolute inset-x-4 top-[76px] rounded-3xl bg-white/15 p-6 ring-1 ring-white/25 backdrop-blur-2xl lg:hidden"
      >
        <ul className="space-y-4 font-serif text-[32px] leading-none">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex items-center justify-between text-[14px] text-white/75">
          <a href="#">Log in</a>
          <span>
            EN / <span className="text-white">FR</span>
          </span>
        </div>
        <BookDemo className="mt-6 flex w-full justify-center sm:hidden" />
      </div>
    </header>
  );
}

/** Compact glass bar that takes over once the hero has scrolled away. */
export function StickyNav({ theme = "light" }: { theme?: "light" | "dark" }) {
  const dark = theme === "dark";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: "-120px 0px 0px 0px" },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 top-3 z-50 flex justify-center px-3 transition duration-500 ease-[cubic-bezier(.2,.7,.2,1)] ${visible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-6 opacity-0"}`}
      inert={!visible}
    >
      <div
        className={`flex h-14 w-full max-w-[980px] items-center justify-between gap-6 rounded-full pl-6 pr-2 shadow-[0_12px_40px_-16px_rgba(25,27,29,0.35)] backdrop-blur-xl ${dark ? "bg-ink/80 ring-1 ring-white/10" : "bg-white/80 ring-1 ring-ink/10"}`}
      >
        <Logo className={dark ? "text-white" : "text-ink"} />
        <div className="hidden md:block">
          <NavLinks tone={dark ? "light" : "dark"} />
        </div>
        <BookDemo />
      </div>
    </div>
  );
}
