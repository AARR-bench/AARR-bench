import Link from "next/link";
import { Stat } from "@/components/Stat";
import { Terminal } from "@/components/Terminal";
import { LeaderboardTable } from "@/components/LeaderboardTable";
import {
  getBenchData,
  getCategories,
  getLeaderboard,
  getTaskCount,
} from "@/lib/data";

export default function HomePage() {
  const { series, benches } = getBenchData();
  const taskCount = getTaskCount("aarri");
  const categoryCount = getCategories("aarri").length;
  const leaderboard = getLeaderboard();
  const top5 = {
    ...leaderboard,
    rows: [...leaderboard.rows].sort((a, b) => b.overall - a.overall).slice(0, 5),
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-ink-100">
        <div className="grid-bg bg-grid-light pointer-events-none absolute inset-0 opacity-70" />
        <div className="container-px relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          {/* Left: copy */}
          <div>
            <Link
              href="/aarri/"
              className="pill mb-7 hover:border-ink hover:text-ink"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-term-green" />
              AARRI-Bench is live · arXiv 2606.07462
            </Link>

            <h1 className="text-balance text-5xl font-bold leading-[1.04] tracking-tight text-ink sm:text-6xl">
              Act As a Real Researcher
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-600">
              {series.tagline} Not just executing code — testing the cognitive
              gaps that still separate frontier agents from human researchers.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/leaderboard/" className="btn-primary">
                View Leaderboard
              </Link>
              <Link href="/tasks/" className="btn-ghost">
                Browse Tasks
              </Link>
            </div>

            <div className="mt-12 grid max-w-md grid-cols-3 gap-8">
              <Stat value={String(taskCount)} label="AARRI tasks" />
              <Stat value={String(categoryCount)} label="Categories" />
              <Stat value="3" label="Series stages" />
            </div>
          </div>

          {/* Right: animated terminal */}
          <div className="lg:pl-4">
            <Terminal />
          </div>
        </div>
      </section>

      {/* The AARR series */}
      <section className="container-px py-20">
        <div className="mb-12 max-w-2xl">
          <p className="section-label">The AARR Series</p>
          <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
            Three stages of research autonomy
          </h2>
          <p className="mt-4 text-ink-600">
            {series.full} progresses through increasing autonomy and difficulty —
            from diligent intern to independent scientist.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden border border-ink-100 bg-ink-100 md:grid-cols-3">
          {benches.map((bench) => {
            const isActive = bench.status === "active";
            const count = isActive ? getTaskCount(bench.id) : null;
            return (
              <Link
                key={bench.id}
                href={`/${bench.id}/`}
                className="group flex flex-col bg-white p-8 transition-colors hover:bg-paper-50"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-ink-400">
                    Stage {bench.stage}
                  </span>
                  {isActive ? (
                    <span className="pill !px-2 !py-0.5 !text-[10px] border-ink bg-ink text-white">
                      Live
                    </span>
                  ) : (
                    <span className="pill !px-2 !py-0.5 !text-[10px]">
                      Soon
                    </span>
                  )}
                </div>

                <h3 className="mt-6 text-2xl font-bold text-ink">
                  {bench.code}
                </h3>
                <p className="mt-1 text-sm font-bold text-ink-600">
                  {bench.name}
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-500">
                  {bench.short}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-ink-100 pt-4">
                  <span className="text-sm text-ink-400">
                    {count !== null ? `${count} tasks` : "In planning"}
                  </span>
                  <span className="text-sm font-bold text-ink transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Leaderboard preview */}
      <section className="container-px py-12">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="section-label">Leaderboard</p>
            <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
              Top performers on AARRI
            </h2>
            <p className="mt-3 text-ink-600">Metric: {leaderboard.metric}.</p>
          </div>
          <Link href="/leaderboard/" className="btn-ghost shrink-0">
            Full leaderboard →
          </Link>
        </div>
        <LeaderboardTable data={top5} orgs={leaderboard.orgs} compact />
      </section>

      {/* CTA */}
      <section className="container-px py-20">
        <div className="card relative overflow-hidden p-10 text-center sm:p-16">
          <div className="dots-bg bg-dots-light pointer-events-none absolute inset-0 opacity-50" />
          <div className="relative">
            <h2 className="text-balance text-3xl font-bold text-ink sm:text-4xl">
              Evaluate your agent on AARRI
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-ink-600">
              Tasks are containerized via the Harbor framework. Pull the dataset
              and run every task against your model and agent harness.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link href="/about/" className="btn-primary">
                Quickstart
              </Link>
              <a
                href="https://github.com/AARR-bench/AARRI-bench"
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
