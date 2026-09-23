import Image from "next/image";
import { DemoButton } from "@/app/_components/brand";
import { VideoLinkTrigger, VideoModalProvider } from "@/app/_components/video-modal";
import { photos } from "@/lib/photos";
import { NavV2, UtilityNav } from "./nav-v2";
import { Barcode } from "./ornaments";

function Rail({ side, children }: { side: "left" | "right"; children?: React.ReactNode }) {
  return (
    <div
      className={`hidden flex-col items-center justify-end gap-6 pb-8 text-[11px] uppercase tracking-[0.2em] text-white/35 lg:flex ${side === "left" ? "border-r" : "border-l"} border-white/10`}
    >
      {children}
    </div>
  );
}

export function HeroV2() {
  return (
    <section id="hero" className="bg-ink text-white">
      <VideoModalProvider>
        <div className="grid min-h-svh lg:grid-cols-[56px_minmax(0,11fr)_minmax(0,13fr)_48px]">
          <Rail side="left">
            <span className="[writing-mode:vertical-rl] rotate-180">Ekumen — Paris, France</span>
            <span className="text-lime">01</span>
          </Rail>

          {/* Type panel */}
          <div className="@container flex flex-col px-5 pb-10 sm:px-8 lg:border-r lg:border-white/10 lg:px-10 lg:pb-12">
            <NavV2 />

            <div className="mt-10 max-w-[290px] animate-fade [animation-delay:600ms] lg:ml-[18%] lg:mt-[9svh]">
              <p className="text-[15px] leading-relaxed text-white/70">
                Les outils d&apos;aujourd&apos;hui cloisonnent la donnée agricole et la font ressaisir sans fin.
              </p>
              <VideoLinkTrigger className="mt-5" />
            </div>

            <h1 className="mt-12 font-serif uppercase lg:mt-auto">
              <span className="block animate-rise text-poster-sub leading-[1] text-white">
                La gestion de la donnée coûte
              </span>
              <span className="block animate-rise text-poster leading-[0.8] tracking-[-0.02em] text-lime [animation-delay:150ms]">
                Trop
                <br />
                <em>cher</em>
              </span>
              <span className="block animate-rise text-right text-poster-sub leading-[1] text-white [animation-delay:300ms]">
                à l&apos;agriculture.
              </span>
            </h1>
          </div>

          {/* Photo panel */}
          <div className="relative isolate flex min-h-[620px] flex-col justify-between overflow-hidden p-5 sm:p-8 lg:min-h-0 lg:p-10">
            <div className="absolute inset-0 -z-10 animate-hero-zoom">
              <Image
                src={photos.v2Hero.src}
                alt={photos.v2Hero.alt}
                fill
                preload
                quality={90}
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover object-[36%_50%] brightness-[.8] contrast-[1.3] grayscale"
              />
            </div>
            <div className="absolute inset-0 -z-10 bg-lime opacity-60 mix-blend-color" />
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(25,27,29,0.55)_0%,rgba(25,27,29,0.05)_28%,rgba(25,27,29,0.25)_55%,rgba(25,27,29,0.92)_88%)]" />

            <div className="flex items-start justify-end gap-6">
              <div className="hidden lg:block">
                <UtilityNav />
              </div>
            </div>

            <div className="absolute right-5 top-24 flex flex-col items-center gap-3 sm:right-8 lg:right-10 lg:top-28">
              <Barcode className="h-32 w-9 text-lime" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-lime/80 [writing-mode:vertical-rl]">
                Traçabilité
              </span>
            </div>

            <div className="animate-rise [animation-delay:500ms]">
              <div>
                <p className="font-serif text-[clamp(30px,3.1vw,50px)] uppercase leading-[0.92] text-lime">
                  Une donnée fiable.
                  <br />
                  À la voix.
                </p>
                <p className="mt-3 max-w-[340px] text-[14px] leading-relaxed text-white/75">
                  Ekumen produit une donnée fiable, à la voix, facilement exploitable et partageable entre ses utilisateurs.
                </p>
              </div>
              <DemoButton className="mt-7" />
            </div>
          </div>

          <Rail side="right">
            <span aria-hidden="true" className="text-lime">↓</span>
          </Rail>
        </div>
      </VideoModalProvider>
    </section>
  );
}
