import Image from "next/image";
import { photos } from "@/lib/photos";
import { DemoButton } from "./brand";
import { HeroNav } from "./nav";

function Waveform() {
  const bars = [0.5, 0.9, 0.6, 1, 0.7, 0.4, 0.8];
  return (
    <span className="flex h-3.5 items-center gap-[3px]" aria-hidden="true">
      {bars.map((h, i) => (
        <span
          key={i}
          className="w-[2px] origin-center animate-wave rounded-full bg-lime"
          style={{ height: `${h * 100}%`, animationDelay: `${i * 0.12}s` }}
        />
      ))}
    </span>
  );
}

/** Glass lens holding a close-up of the crop — the hero's focal object. */
function Lens() {
  return (
    <div className="relative size-[clamp(150px,min(17vw,27svh),264px)] animate-rise [animation-delay:500ms]">
      <div className="absolute inset-0 animate-float">
        {/* orbit rings */}
        <div className="absolute -inset-[16%] rounded-full border border-white/20" />
        <div className="absolute -inset-[34%] hidden rounded-full border border-white/10 sm:block" />
        <div className="absolute -inset-[16%] animate-orbit">
          <span className="absolute left-1/2 top-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime shadow-[0_0_14px_2px_rgba(208,242,76,0.7)]" />
        </div>

        {/* glass body */}
        <div className="absolute inset-0 rounded-full bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),inset_0_-18px_36px_rgba(255,255,255,0.12),0_40px_80px_-24px_rgba(10,12,10,0.55)] ring-1 ring-white/45 backdrop-blur-md" />
        <div className="absolute inset-[7%] overflow-hidden rounded-full">
          <Image
            src={photos.lensSprout.src}
            alt={photos.lensSprout.alt}
            fill
            sizes="264px"
            className="scale-110 object-cover object-[50%_65%]"
          />
          <div className="absolute inset-0 rounded-full shadow-[inset_0_0_36px_rgba(10,12,10,0.45)]" />
        </div>
        {/* highlights */}
        <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.6),rgba(255,255,255,0)_34%)] mix-blend-screen" />
        <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_72%_88%,rgba(255,255,255,0.22),rgba(255,255,255,0)_40%)]" />
      </div>

      {/* voice capture chip */}
      <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 translate-y-1/2 items-center gap-2.5 whitespace-nowrap rounded-full bg-ink/35 py-2 pl-3 pr-4 text-[12px] font-medium text-white ring-1 ring-white/25 backdrop-blur-xl">
        <span className="relative flex size-2">
          <span className="absolute inset-0 animate-ping rounded-full bg-lime/70" />
          <span className="relative size-2 rounded-full bg-lime" />
        </span>
        Saisie vocale
        <Waveform />
      </div>
    </div>
  );
}

function VideoCard() {
  return (
    <a
      href="#plateforme"
      className="group absolute left-10 top-[clamp(120px,17svh,168px)] hidden w-[124px] animate-rise [animation-delay:700ms] lg:block"
    >
      <span className="relative block aspect-[4/5] overflow-hidden rounded-[18px] ring-1 ring-white/25">
        <Image
          src={photos.videoFarmer.src}
          alt={photos.videoFarmer.alt}
          fill
          sizes="124px"
          className="object-cover object-[76%_18%] saturate-[.7] transition duration-700 group-hover:scale-105"
        />
      </span>
      <span className="absolute left-1/2 top-[155px] grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-lg transition group-hover:scale-110">
        <svg viewBox="0 0 24 24" className="ml-0.5 size-3.5" fill="currentColor" aria-hidden="true">
          <path d="M7 4.5v15l12-7.5-12-7.5Z" />
        </svg>
      </span>
      <span className="mt-7 block text-center text-[13px] text-white/80 group-hover:text-white">
        See how it works
      </span>
    </a>
  );
}

function ActorsStat() {
  return (
    <div className="absolute right-10 top-[clamp(120px,17svh,168px)] hidden w-[150px] animate-rise text-center [animation-delay:800ms] lg:block">
      <p className="font-serif text-[96px] leading-[0.75]">6</p>
      <p className="mt-3 text-[13px] leading-snug text-white/70">
        métiers de la filière,
        <br />
        une même donnée
      </p>
      <div className="mt-4 flex justify-center -space-x-2.5">
        {photos.avatars.map((a) => (
          <Image
            key={a.src}
            src={a.src}
            alt={a.alt}
            width={36}
            height={36}
            className="size-9 rounded-full object-cover ring-2 ring-white/80"
          />
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="hero" className="px-2 pt-2 sm:px-3 sm:pt-3">
      <div className="grain relative isolate flex min-h-[max(760px,calc(100svh-12px))] flex-col overflow-hidden rounded-[28px] bg-sage text-white sm:rounded-[36px] lg:min-h-[max(720px,calc(100svh-12px))]">
        {/* photography, toned toward the brand's olive grey */}
        <div className="absolute inset-0 -z-10 animate-hero-zoom">
          <Image
            src={photos.heroMist.src}
            alt=""
            fill
            preload
            sizes="100vw"
            className="object-cover object-[50%_30%] saturate-[.8]"
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-sage/35 mix-blend-multiply" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(25,27,29,0.5)_0%,rgba(25,27,29,0.05)_26%,rgba(25,27,29,0)_52%,rgba(25,27,29,0.55)_100%)]" />

        <HeroNav />

        <VideoCard />
        <ActorsStat />

        <div className="flex flex-1 flex-col items-center justify-center px-5 pb-20 pt-8 sm:px-8 lg:pb-[104px] lg:pt-4">
          <h1 className="text-hero text-center font-serif leading-[0.94] tracking-[-0.015em]">
            <span className="block animate-rise [animation-delay:100ms] lg:translate-x-[8%]">
              La gestion de la donnée
            </span>
            <span className="block animate-rise [animation-delay:200ms] lg:-translate-x-[14%]">
              coûte <em className="text-lime">trop cher</em>
            </span>
            <span className="block animate-rise [animation-delay:300ms] lg:translate-x-[3%]">
              à l&apos;agriculture.
            </span>
          </h1>

          <div className="mt-10 grid w-full max-w-[1080px] grid-cols-1 items-center justify-items-center gap-y-9 lg:-mt-7 lg:grid-cols-[1fr_auto_1fr] lg:gap-x-16">
            <p className="order-2 max-w-[300px] animate-fade text-center text-[14px] leading-relaxed text-white/80 [animation-delay:900ms] sm:text-[15px] lg:order-1 lg:justify-self-end lg:text-left">
              <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.1em] text-white/50">
                Aujourd&apos;hui
              </span>
              Les outils d&apos;aujourd&apos;hui cloisonnent la donnée agricole et la font ressaisir sans fin.
            </p>
            <div className="order-1 lg:order-2">
              <Lens />
            </div>
            <p className="order-3 max-w-[300px] animate-fade text-center text-[14px] leading-relaxed text-white/80 [animation-delay:1000ms] sm:text-[15px] lg:justify-self-start lg:text-left">
              <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.1em] text-lime/90">
                Avec Ekumen
              </span>
              Ekumen produit une donnée fiable, à la voix, facilement exploitable et partageable entre ses utilisateurs.
            </p>
          </div>

          <div className="mt-10 flex animate-rise flex-col items-center gap-4 [animation-delay:1100ms] sm:flex-row lg:mt-14">
            <DemoButton />
            <a
              href="#plateforme"
              className="text-[14px] text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white lg:hidden"
            >
              See how it works
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
