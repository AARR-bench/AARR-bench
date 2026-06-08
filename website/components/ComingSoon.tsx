import Link from "next/link";
import type { Bench } from "@/lib/types";

export function ComingSoon({ bench }: { bench: Bench }) {
  return (
    <section className="relative overflow-hidden">
      <div className="grid-bg bg-grid-light pointer-events-none absolute inset-0 opacity-70" />
      <div className="container-px relative py-24 sm:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-ink-400">
            Stage {bench.stage}
          </span>
          <h1 className="mt-4 text-6xl font-bold tracking-tight text-ink sm:text-7xl">
            {bench.code}
          </h1>
          <p className="mt-3 text-xl font-bold text-ink-600">{bench.name}</p>

          <div className="mx-auto mt-6 inline-flex items-center gap-2 border border-ink-200 bg-white px-4 py-1.5 text-sm text-ink-500">
            <span className="h-1.5 w-1.5 rounded-full bg-ink-400" />
            Coming soon
          </div>

          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-ink-600">
            {bench.description}
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <p className="text-center text-xs font-bold uppercase tracking-[0.25em] text-ink-400">
            Planned focus areas
          </p>
          <div className="mt-6 grid gap-px overflow-hidden border border-ink-100 bg-ink-100 sm:grid-cols-3">
            {bench.focusAreas.map((area) => (
              <div key={area} className="flex items-center gap-3 bg-white p-5">
                <span className="h-2 w-2 shrink-0 bg-ink" />
                <span className="text-sm font-bold text-ink-700">{area}</span>
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
