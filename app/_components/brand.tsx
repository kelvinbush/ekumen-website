import type { ComponentProps } from "react";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 38 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.5756 0.698263C20.8987 0.259227 21.4113 0 21.9564 0H30.8743C32.2838 0 33.0911 1.60657 32.2497 2.73751L16.9459 23.3089C16.6224 23.7437 16.1124 24 15.5704 24H6.81894C5.41347 24 4.60518 22.4017 5.43819 21.2697L20.5756 0.698263Z" />
      <path d="M28.4586 10.9825C28.7817 10.5443 29.2938 10.2857 29.8382 10.2857H34.321C35.7274 10.2857 36.5352 11.8857 35.7007 13.0175L28.1149 23.3032C27.7918 23.7414 27.2797 24 26.7352 24H22.2525C20.8462 24 20.0382 22.4 20.8729 21.2682L28.4586 10.9825Z" />
      <path d="M9.60116 0.696785C9.9243 0.258616 10.4364 0 10.9808 0H15.4635C16.8698 0 17.6779 1.59999 16.8432 2.73179L9.25748 13.0175C8.93434 13.4557 8.42228 13.7143 7.87782 13.7143H3.3951C1.9888 13.7143 1.18074 12.1143 2.01544 10.9825L9.60116 0.696785Z" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#" className={`inline-flex items-center gap-1.5 ${className}`}>
      <LogoMark className="h-[22px] w-[35px]" />
      <span className="text-[20px] font-bold tracking-[-0.01em]">ekumen</span>
    </a>
  );
}

/** The circular arrow used on the original site's primary CTA. */
export function ArrowCircle({
  tone = "ink",
  className = "",
}: {
  tone?: "ink" | "lime";
  className?: string;
}) {
  return (
    <span
      className={`grid size-9 shrink-0 place-items-center rounded-full transition-transform duration-500 group-hover:-rotate-45 ${tone === "lime" ? "bg-lime text-ink" : "bg-ink text-white"} ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor">
        <path d="M16.175 13H4v-2h12.175l-5.6-5.6L12 4l8 8-8 8-1.425-1.4 5.6-5.6Z" />
      </svg>
    </span>
  );
}

export function DemoButton({
  children = "Demander une démo",
  className = "",
  ...props
}: ComponentProps<"a">) {
  return (
    <a
      href="#demo"
      className={`group inline-flex h-12 items-center gap-4 rounded-full bg-lime pl-6 pr-1.5 text-[15px] font-medium text-ink transition-[filter,box-shadow] duration-300 hover:brightness-105 hover:shadow-[0_10px_30px_-10px_rgba(208,242,76,0.8)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime ${className}`}
      {...props}
    >
      {children}
      <ArrowCircle />
    </a>
  );
}

export function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-[12px] font-medium uppercase tracking-[0.08em] text-ink/50 ${className}`}
    >
      {children}
    </p>
  );
}

/** A thin plus that turns into a cross when `open`. */
export function ToggleIcon({
  open,
  className = "",
}: {
  open: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`relative block size-4 transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] ${open ? "rotate-45" : ""} ${className}`}
    >
      <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-current" />
      <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-current" />
    </span>
  );
}
