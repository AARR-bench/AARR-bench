import Link from "next/link";

const navItems = [
  { href: "/aarri/", label: "AARRI" },
  { href: "/aarra/", label: "AARRA" },
  { href: "/aarrs/", label: "AARRS" },
  { href: "/leaderboard/", label: "Leaderboard" },
  { href: "/tasks/", label: "Tasks" },
  { href: "/paper/", label: "Paper" },
  { href: "/about/", label: "About" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-ink-950/70 backdrop-blur-xl">
      <nav className="container-px flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-cyan font-mono text-sm font-bold text-white shadow-lg shadow-brand-500/30">
            A
          </span>
          <span className="font-mono text-sm font-bold tracking-tight text-white">
            AARR<span className="text-brand-400">-bench</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/AARR-bench"
            target="_blank"
            rel="noreferrer"
            className="hidden text-sm font-medium text-slate-400 transition-colors hover:text-white sm:inline"
          >
            GitHub
          </a>
          <Link href="/aarri/" className="btn-primary !px-4 !py-2 text-xs">
            Get Started
          </Link>
        </div>
      </nav>
    </header>
  );
}
