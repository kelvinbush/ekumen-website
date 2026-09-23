import Link from "next/link";

const versions = [
  { href: "/", label: "Version 1", short: "V1", hint: "Lumière" },
  { href: "/version-2", label: "Version 2", short: "V2", hint: "Affiche" },
];

/** Floating toggle so the client can compare the two directions. */
export function VersionSwitcher({ current }: { current: "/" | "/version-2" }) {
  return (
    <nav
      aria-label="Versions du design"
      className="fixed bottom-4 right-4 z-40"
    >
      <ul className="flex items-center gap-1 rounded-full bg-ink/85 p-1 text-[13px] shadow-[0_12px_40px_-12px_rgba(0,0,0,0.5)] ring-1 ring-white/15 backdrop-blur-xl">
        {versions.map((v) => {
          const active = v.href === current;
          return (
            <li key={v.href}>
              <Link
                href={v.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-2 rounded-full px-4 py-2 font-medium transition ${active ? "bg-lime text-ink" : "text-white/70 hover:text-white"}`}
              >
                <span className="sm:hidden">{v.short}</span>
                <span className="hidden sm:inline">{v.label}</span>
                <span className={`hidden sm:inline ${active ? "text-ink/55" : "text-white/35"}`}>
                  {v.hint}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
