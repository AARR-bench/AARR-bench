import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-ink-100 bg-paper-50">
      <div className="container-px py-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt="AARR"
                width={28}
                height={28}
                className="h-7 w-7"
              />
              <span className="text-sm font-bold text-ink">AARR-bench</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-500">
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

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-ink-100 pt-6 text-xs text-ink-400 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} AARR-bench. Open research benchmark.</p>
          <p>Act As a Real Researcher</p>
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
      <h3 className="text-xs font-bold uppercase tracking-wider text-ink-400">
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
                className="text-sm text-ink-500 transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            ) : (
              <Link
                href={link.href}
                className="text-sm text-ink-500 transition-colors hover:text-ink"
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
