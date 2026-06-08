import Link from "next/link";
import type { Bench } from "@/lib/types";

export function ComingSoon({ bench }: { bench: Bench }) {
  return (
    <section className="relative overflow-hidden">
      <div className="glow-radial pointer-events-none absolute inset-0 opacity-60" />
      <div className="grid-bg bg-grid-faint pointer-events-none absolute inset-0" />
      <div className="container-px relative py-24 sm:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-xs font-semibold text-brand-400">
            STAGE {bench.stage}
          </span>
          <h1 className="mt-4 font-mono text-6xl font-extrabold tracking-tight text-white sm:text-7xl">
            {bench.code}
          </h1>
          <p className="mt-3 text-xl font-medium text-slate-300">{bench.name}</p>

          <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm text-slate-400">
            <span className="h-1.5 w-1.5 animate-pulse-slow rounded-full bg-accent-amber" />
            Coming soon
          </div>

          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-slate-400">
            {bench.description}
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Planned focus areas
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {bench.focusAreas.map((area) => (
              <div
                key={area}
                className="card flex items-center gap-3 p-5"
              >
                <span className="h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-brand-500 to-accent-cyan" />
                <span className="text-sm font-medium text-slate-200">
                  {area}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
          <Link href="/aarri/" className="btn-primary">
            Explore AARRI today
          </Link>
          <a
            href="https://github.com/AARR-bench"
            target="_blank"
            rel="noreferrer"
            className="btn-ghost"
          >
            Follow on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
