"use client";

import Image from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { film } from "@/lib/photos";

type VideoModal = {
  /** `origin` is the element the panel grows from (null: fade in); focus returns to `trigger`. */
  open: (origin: HTMLElement | null, trigger: HTMLElement) => void;
};

const VideoModalContext = createContext<VideoModal | null>(null);

function useVideoModal() {
  const ctx = useContext(VideoModalContext);
  if (!ctx) throw new Error("useVideoModal must be used inside VideoModalProvider");
  return ctx;
}

const PANEL_RADIUS = 28;
const THUMB_RADIUS = 18;
const SETTLED = { transform: "translate(0px, 0px) scale(1)", clipPath: `inset(0px 0px round ${PANEL_RADIUS}px)` };

/**
 * Keyframe that makes the full-size panel look exactly like `origin`:
 * scaled to cover it, centred on it, and clipped to its shape.
 */
function coverFrame(origin: DOMRect, panel: DOMRect) {
  const s = Math.max(origin.width / panel.width, origin.height / panel.height);
  const insetX = (panel.width - origin.width / s) / 2;
  const insetY = (panel.height - origin.height / s) / 2;
  const dx = origin.left + origin.width / 2 - (panel.left + panel.width / 2);
  const dy = origin.top + origin.height / 2 - (panel.top + panel.height / 2);
  return {
    transform: `translate(${dx}px, ${dy}px) scale(${s})`,
    clipPath: `inset(${insetY}px ${insetX}px round ${THUMB_RADIUS / s}px)`,
  };
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const s = Math.floor(seconds);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

type Phase = "closed" | "opening" | "open" | "closing";

export function VideoModalProvider({ children }: { children: React.ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLInputElement>(null);
  const originRef = useRef<HTMLElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const [phase, setPhaseState] = useState<Phase>("closed");
  const phaseRef = useRef<Phase>("closed");
  const setPhase = (next: Phase) => {
    phaseRef.current = next;
    setPhaseState(next);
  };
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  const [time, setTime] = useState({ current: 0, duration: 0 });

  const play = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      await video.play();
    } catch {
      // Autoplay with sound was refused; start muted instead.
      video.muted = true;
      setMuted(true);
      await video.play().catch(() => {});
    }
  }, []);

  const open = useCallback(
    (origin: HTMLElement | null, trigger: HTMLElement) => {
      const dialog = dialogRef.current;
      const panel = panelRef.current;
      const overlay = overlayRef.current;
      const video = videoRef.current;
      if (!dialog || !panel || !overlay || !video || dialog.open) return;

      const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const gutter = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.paddingRight = `${gutter}px`;

      originRef.current = origin;
      triggerRef.current = trigger;
      video.preload = "auto";
      setPhase("opening");
      dialog.showModal();

      overlay.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: reduceMotion ? 1 : 500,
        easing: "cubic-bezier(.2,.7,.2,1)",
      });

      const panelRect = panel.getBoundingClientRect();
      const expand =
        origin && !reduceMotion
          ? panel.animate(
              [coverFrame(origin.getBoundingClientRect(), panelRect), SETTLED],
              { duration: 850, easing: "cubic-bezier(.2,1.08,.28,1)" },
            )
          : panel.animate(
              [
                { opacity: 0, transform: "translateY(28px) scale(.96)" },
                { opacity: 1, transform: "none" },
              ],
              { duration: reduceMotion ? 1 : 550, easing: "cubic-bezier(.2,.8,.2,1)" },
            );

      if (origin) origin.style.visibility = "hidden";

      expand.finished
        .then(() => {
          if (phaseRef.current !== "opening") return;
          setPhase("open");
          play();
        })
        .catch(() => {}); // cancelled by an early close
    },
    [play],
  );

  const close = useCallback(() => {
    const dialog = dialogRef.current;
    const panel = panelRef.current;
    const overlay = overlayRef.current;
    const video = videoRef.current;
    if (!dialog || !panel || !overlay || !video || !dialog.open) return;
    if (phaseRef.current === "closing") return;

    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const origin = originRef.current;
    video.pause();
    setPhase("closing");
    panel.getAnimations().forEach((a) => a.cancel());
    overlay.getAnimations().forEach((a) => a.cancel());

    overlay.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: reduceMotion ? 1 : 450,
      delay: reduceMotion ? 0 : 150,
      easing: "ease-in",
      fill: "forwards",
    });

    const panelRect = panel.getBoundingClientRect();
    const collapse =
      origin && !reduceMotion
        ? panel.animate(
            [SETTLED, coverFrame(origin.getBoundingClientRect(), panelRect)],
            { duration: 650, easing: "cubic-bezier(.6,0,.2,1)", fill: "forwards" },
          )
        : panel.animate(
            [
              { opacity: 1, transform: "none" },
              { opacity: 0, transform: "translateY(20px) scale(.97)" },
            ],
            { duration: reduceMotion ? 1 : 300, easing: "ease-in", fill: "forwards" },
          );

    collapse.finished.then(() => {
      if (origin) origin.style.visibility = "";
      dialog.close();
      panel.getAnimations().forEach((a) => a.cancel());
      overlay.getAnimations().forEach((a) => a.cancel());
      document.documentElement.style.overflow = "";
      document.documentElement.style.paddingRight = "";
      video.currentTime = 0;
      setStarted(false);
      setPhase("closed");
      triggerRef.current?.focus({ preventScroll: true });
    });
  }, []);

  // Keep the scrubber moving smoothly while the film plays.
  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    const tick = () => {
      const video = videoRef.current;
      const range = progressRef.current;
      if (video && range && video.duration) {
        range.value = String(video.currentTime);
        range.style.setProperty("--progress", `${(video.currentTime / video.duration) * 100}%`);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) play();
    else video.pause();
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const seek = (value: number) => {
    const video = videoRef.current;
    const range = progressRef.current;
    if (!video || !range) return;
    video.currentTime = value;
    range.style.setProperty("--progress", `${(value / (video.duration || 1)) * 100}%`);
    setTime((t) => ({ ...t, current: value }));
  };

  const fullscreen = () => {
    const video = videoRef.current as
      | (HTMLVideoElement & { webkitEnterFullscreen?: () => void })
      | null;
    if (!video) return;
    if (video.requestFullscreen) video.requestFullscreen();
    else video.webkitEnterFullscreen?.();
  };

  const chromeVisible = phase === "open";

  return (
    <VideoModalContext.Provider value={{ open }}>
      {children}

      <dialog
        ref={dialogRef}
        aria-label={film.title}
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        className="fixed inset-0 m-0 size-full max-h-none max-w-none overflow-hidden bg-transparent p-0 text-white backdrop:bg-transparent"
      >
        <div
          ref={overlayRef}
          onClick={close}
          className="absolute inset-0 bg-ink/80 backdrop-blur-xl"
        />

        <div className="pointer-events-none relative grid size-full place-items-center p-4 sm:p-10">
          <div className="pointer-events-auto w-[min(1120px,100%,calc((100svh-200px)*16/9))]">
            <div
              className={`mb-4 flex items-center justify-between transition duration-500 ${chromeVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
            >
              <p className="flex items-center gap-2.5 text-[12px] font-medium uppercase tracking-[0.1em] text-white/60">
                <span className="size-1.5 rounded-full bg-lime" />
                Ekumen · Film
              </p>
              <button
                type="button"
                onClick={close}
                aria-label="Fermer la vidéo"
                className="grid size-11 place-items-center rounded-full bg-white/10 ring-1 ring-white/20 transition hover:bg-white hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
              >
                <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden="true">
                  <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div
              ref={panelRef}
              className="group/player relative aspect-video overflow-hidden rounded-[28px] bg-ink shadow-[0_50px_120px_-30px_rgba(0,0,0,0.85)] will-change-transform"
            >
              {/* Same candidate as the thumbnail, so it is already cached and
                  the panel grows out of exactly what was clicked. */}
              <Image
                src={film.poster}
                alt=""
                fill
                sizes="124px"
                loading="eager"
                className="object-cover"
              />
              <Image
                src={film.poster}
                alt=""
                fill
                sizes="(min-width: 1200px) 1120px, 100vw"
                className="object-cover"
              />
              <video
                ref={videoRef}
                src={film.src}
                playsInline
                preload="none"
                onPlay={() => setPlaying(true)}
                onPlaying={() => setStarted(true)}
                onPause={() => setPlaying(false)}
                onEnded={() => setPlaying(false)}
                onLoadedMetadata={(e) =>
                  setTime({ current: 0, duration: e.currentTarget.duration })
                }
                onTimeUpdate={(e) => {
                  const current = e.currentTarget.currentTime;
                  setTime((t) => ({ ...t, current }));
                }}
                onClick={togglePlay}
                className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${started ? "opacity-100" : "opacity-0"}`}
              />

              {/* Big play affordance while paused */}
              <button
                type="button"
                onClick={togglePlay}
                aria-label="Lire la vidéo"
                tabIndex={playing ? -1 : 0}
                className={`absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/15 ring-1 ring-white/30 backdrop-blur-md transition duration-500 hover:scale-105 hover:bg-white/25 ${chromeVisible && !playing ? "opacity-100" : "pointer-events-none scale-90 opacity-0"}`}
              >
                <svg viewBox="0 0 24 24" className="ml-1 size-7" fill="currentColor" aria-hidden="true">
                  <path d="M7 4.5v15l12-7.5-12-7.5Z" />
                </svg>
              </button>

              {/* Controls */}
              <div
                className={`absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(25,27,29,0.75))] px-3 pb-3 pt-10 transition duration-500 sm:px-6 sm:pb-5 sm:pt-16 ${chromeVisible ? "opacity-100" : "opacity-0"} ${playing ? "sm:opacity-0 sm:group-hover/player:opacity-100 sm:focus-within:opacity-100" : ""}`}
              >
                <input
                  ref={progressRef}
                  type="range"
                  min={0}
                  max={time.duration || 0}
                  step={0.01}
                  defaultValue={0}
                  onInput={(e) => seek(Number(e.currentTarget.value))}
                  aria-label="Progression de la vidéo"
                  className="video-range block w-full"
                />
                <div className="mt-3 flex items-center gap-3 text-[13px]">
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={playing ? "Mettre en pause" : "Lire"}
                    className="grid size-9 place-items-center rounded-full bg-lime text-ink transition hover:brightness-105"
                  >
                    {playing ? (
                      <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
                        <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="ml-0.5 size-4" fill="currentColor" aria-hidden="true">
                        <path d="M7 4.5v15l12-7.5-12-7.5Z" />
                      </svg>
                    )}
                  </button>
                  <span className="tabular-nums text-white/80">
                    {formatTime(time.current)}
                    <span className="text-white/40"> / {formatTime(time.duration)}</span>
                  </span>
                  <span className="flex-1" />
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={muted ? "Activer le son" : "Couper le son"}
                    className="grid size-9 place-items-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white"
                  >
                    <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 9.5h3l4.5-4v13L7 14.5H4z" />
                      {muted ? (
                        <path d="m16 9.5 5 5m0-5-5 5" />
                      ) : (
                        <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" />
                      )}
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={fullscreen}
                    aria-label="Plein écran"
                    className="grid size-9 place-items-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white"
                  >
                    <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div
              className={`mt-5 flex flex-wrap items-end justify-between gap-4 transition delay-100 duration-500 ${chromeVisible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`}
            >
              <div>
                <p className="font-serif text-[28px] leading-none sm:text-[34px]">{film.title}</p>
                <p className="mt-2 text-[14px] text-white/60">
                  Collecter · Traiter · Mettre en action
                </p>
              </div>
              <p className="hidden text-[12px] text-white/40 sm:block">
                <kbd className="rounded-md bg-white/10 px-1.5 py-0.5 font-sans text-white/70">Esc</kbd>{" "}
                pour fermer
              </p>
            </div>
          </div>
        </div>
      </dialog>
    </VideoModalContext.Provider>
  );
}

/** The thumbnail card in the hero; the modal grows out of it. */
export function VideoThumbTrigger({ className = "" }: { className?: string }) {
  const { open } = useVideoModal();
  const thumbRef = useRef<HTMLSpanElement>(null);

  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={(e) => open(thumbRef.current, e.currentTarget)}
      className={`group text-left focus-visible:outline-none ${className}`}
    >
      <span ref={thumbRef} className="relative block">
        <span className="relative block aspect-[4/5] overflow-hidden rounded-[18px] ring-1 ring-white/25 transition group-focus-visible:ring-2 group-focus-visible:ring-lime">
          <Image
            src={film.poster}
            alt=""
            fill
            sizes="124px"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        </span>
        <span className="absolute bottom-0 left-1/2 grid size-9 -translate-x-1/2 translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-lg transition group-hover:scale-110">
          <svg viewBox="0 0 24 24" className="ml-0.5 size-3.5" fill="currentColor" aria-hidden="true">
            <path d="M7 4.5v15l12-7.5-12-7.5Z" />
          </svg>
        </span>
      </span>
      <span className="mt-7 block text-center text-[13px] text-white/80 transition group-hover:text-white">
        {film.title}
      </span>
    </button>
  );
}

/** Text-only trigger for small screens, where the thumbnail is hidden. */
export function VideoLinkTrigger({ className = "" }: { className?: string }) {
  const { open } = useVideoModal();
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={(e) => open(null, e.currentTarget)}
      className={`inline-flex items-center gap-2 text-[14px] text-white/85 transition hover:text-white ${className}`}
    >
      <span className="grid size-7 place-items-center rounded-full bg-white/15 ring-1 ring-white/25">
        <svg viewBox="0 0 24 24" className="ml-0.5 size-3" fill="currentColor" aria-hidden="true">
          <path d="M7 4.5v15l12-7.5-12-7.5Z" />
        </svg>
      </span>
      {film.title}
    </button>
  );
}
