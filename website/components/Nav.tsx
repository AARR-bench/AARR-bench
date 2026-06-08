import Link from "next/link";
import Image from "next/image";

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
    <header className="sticky top-0 z-50 border-b border-ink-100 bg-white/85 backdrop-blur-md">
      <nav className="container-px flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="AARR"
            width={28}
            height={28}
            className="h-7 w-7"
            priority
          />
          <span className="text-sm font-bold tracking-tight text-ink">
            AARR-bench
          </span>
        </Link>

        <div className="hidden items-center gap-0.5 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm font-medium text-ink-500 transition-colors hover:text-ink"
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
            className="hidden text-sm font-medium text-ink-500 transition-colors hover:text-ink sm:inline"
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
