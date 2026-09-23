import Image from "next/image";
import { photos } from "@/lib/photos";
import { DemoButton } from "./brand";
import { HeroNav } from "./nav";
import {
  VideoLinkTrigger,
  VideoModalProvider,
  VideoThumbTrigger,
} from "./video-modal";
import { VoiceCapture } from "./voice-capture";

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
      <VideoModalProvider>
        <div className="relative isolate flex min-h-[max(760px,calc(100svh-12px))] flex-col overflow-hidden rounded-[28px] bg-ink text-white sm:rounded-[36px] lg:min-h-[max(720px,calc(100svh-12px))]">
          {/* photography, darkened so the type and the capture card lead */}
          <div className="absolute inset-0 -z-10 animate-hero-zoom">
            {/* ~2 KB preview that paints instantly while the full photo loads */}
            <Image
              src={photos.heroFarm.src}
              alt=""
              fill
              sizes="48px"
              loading="eager"
              className="scale-110 object-cover object-[50%_58%] blur-2xl"
            />
            <Image
              src={photos.heroFarm.src}
              alt=""
              fill
              preload
              quality={90}
              sizes="100vw"
              className="object-cover object-[50%_58%]"
            />
          </div>
          <div className="absolute inset-0 -z-10 bg-ink/45" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(25,27,29,0.6)_0%,rgba(25,27,29,0.1)_30%,rgba(25,27,29,0.05)_55%,rgba(25,27,29,0.7)_100%)]" />

          <HeroNav />

          <VideoThumbTrigger className="absolute left-10 top-[clamp(120px,17svh,168px)] hidden w-[124px] animate-rise [animation-delay:700ms] lg:block" />
          <ActorsStat />

          <div className="flex flex-1 flex-col items-center justify-center px-5 pb-20 pt-6 sm:px-8 lg:pb-[104px] lg:pt-4">
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

            <div className="mt-8 grid w-full max-w-[1120px] grid-cols-1 items-center justify-items-center gap-y-7 lg:mt-12 lg:grid-cols-[1fr_auto_1fr] lg:gap-x-14">
              <p className="order-2 max-w-[300px] animate-fade text-center text-[14px] leading-relaxed text-white/80 [animation-delay:900ms] sm:text-[15px] lg:order-1 lg:justify-self-end lg:text-left">
                <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.1em] text-white/50">
                  Aujourd&apos;hui
                </span>
                Les outils d&apos;aujourd&apos;hui cloisonnent la donnée agricole et la font ressaisir sans fin.
              </p>
              <div className="order-1 w-full max-w-[360px] lg:order-2">
                <VoiceCapture />
              </div>
              <p className="order-3 max-w-[300px] animate-fade text-center text-[14px] leading-relaxed text-white/80 [animation-delay:1000ms] sm:text-[15px] lg:justify-self-start lg:text-left">
                <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.1em] text-lime/90">
                  Avec Ekumen
                </span>
                Ekumen produit une donnée fiable, à la voix, facilement exploitable et partageable entre ses utilisateurs.
              </p>
            </div>

            <div className="mt-8 flex animate-rise flex-col items-center gap-4 [animation-delay:1100ms] sm:flex-row lg:mt-12">
              <DemoButton />
              <VideoLinkTrigger className="lg:hidden" />
            </div>
          </div>
        </div>
      </VideoModalProvider>
    </section>
  );
}
