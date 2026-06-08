import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/[0.06]">
      <div className="container-px py-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-cyan font-mono text-sm font-bold text-white">
                A
              </span>
              <span className="font-mono text-sm font-bold text-white">
                AARR<span className="text-brand-400">-bench</span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              Act As a Real Researcher — a benchmark series for evaluating LLM
              agents across the research lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 sm:grid-cols-3">
            <FooterCol
              title="Benchmarks"
              links={[
                { href: "/aarri/", label: "AARRI" },
                { href: "/aarra/", label: "AARRA" },
                { href: "/aarrs/", label: "AARRS" },
              ]}
            />
            <FooterCol
              title="Explore"
              links={[
                { href: "/leaderboard/", label: "Leaderboard" },
                { href: "/tasks/", label: "Tasks" },
                { href: "/paper/", label: "Paper" },
                { href: "/about/", label: "About" },
              ]}
            />
            <FooterCol
              title="Resources"
              links={[
                { href: "https://github.com/AARR-bench", label: "GitHub", external: true },
                { href: "https://arxiv.org/abs/2606.07462", label: "arXiv", external: true },
                { href: "https://www.harborframework.com/docs", label: "Harbor", external: true },
              ]}
            />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/[0.06] pt-6 text-xs text-slate-600 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} AARR-bench. Open research benchmark.</p>
          <p className="font-mono">Act As a Real Researcher</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string; external?: boolean }[];
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-slate-500 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ) : (
              <Link
                href={link.href}
                className="text-sm text-slate-500 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
