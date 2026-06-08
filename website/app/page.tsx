import Link from "next/link";
import { Stat } from "@/components/Stat";
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
  const top3 = { ...leaderboard, rows: [...leaderboard.rows].sort((a, b) => b.overall - a.overall).slice(0, 5) };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="glow-radial pointer-events-none absolute inset-0" />
        <div className="grid-bg bg-grid-faint pointer-events-none absolute inset-0" />
        <div className="container-px relative pb-20 pt-20 sm:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <Link
              href="/aarri/"
              className="pill mx-auto mb-7 hover:border-brand-500/40 hover:text-white"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent-emerald" />
              AARRI-Bench is live · arXiv 2606.07462
              <span className="text-slate-500">→</span>
            </Link>

            <h1 className="text-balance text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl animate-fade-up">
              Act As a <span className="text-gradient">Real Researcher</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-slate-400 animate-fade-up">
              {series.tagline} Not just executing code — testing the cognitive
              gaps that still separate frontier agents from human researchers.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3 animate-fade-up">
              <Link href="/leaderboard/" className="btn-primary">
                View Leaderboard
              </Link>
              <Link href="/tasks/" className="btn-ghost">
                Browse Tasks
              </Link>
            </div>
          </div>

          {/* Stat band */}
          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-8 py-8 sm:grid-cols-4">
            <Stat value={String(taskCount)} label="AARRI tasks" accent />
            <Stat value={String(categoryCount)} label="Task categories" />
            <Stat value="3" label="Series stages" />
            <Stat value={`${leaderboard.rows.length}`} label="Evaluated configs" />
          </div>
        </div>
      </section>

      {/* The AARR series */}
      <section className="container-px py-20">
        <div className="mb-12 text-center">
          <p className="section-label">The AARR Series</p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Three stages of research autonomy
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            {series.full} progresses through increasing autonomy and difficulty —
            from diligent intern to independent scientist.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {benches.map((bench) => {
            const isActive = bench.status === "active";
            const count = isActive ? getTaskCount(bench.id) : null;
            return (
              <Link
                key={bench.id}
                href={`/${bench.id}/`}
                className={`card card-hover group relative flex flex-col p-7 ${
                  isActive ? "" : "opacity-90"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-brand-400">
                    STAGE {bench.stage}
                  </span>
                  {isActive ? (
                    <span className="pill !px-2.5 !py-0.5 !text-[10px] border-accent-emerald/30 bg-accent-emerald/10 text-accent-emerald">
                      Live
                    </span>
                  ) : (
                    <span className="pill !px-2.5 !py-0.5 !text-[10px]">
                      Coming soon
                    </span>
                  )}
                </div>

                <h3 className="mt-5 font-mono text-2xl font-bold text-white">
                  {bench.code}
                </h3>
                <p className="mt-1 text-sm font-medium text-slate-300">
                  {bench.name}
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-500">
                  {bench.short}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4">
                  <span className="text-sm text-slate-500">
                    {count !== null ? `${count} tasks` : "In planning"}
                  </span>
                  <span className="text-sm font-medium text-brand-300 transition-transform group-hover:translate-x-1">
                    Explore →
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
          <div>
            <p className="section-label">Leaderboard</p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Top performers on AARRI
            </h2>
            <p className="mt-3 max-w-xl text-slate-400">
              {leaderboard.note} Metric: {leaderboard.metric}.
            </p>
          </div>
          <Link href="/leaderboard/" className="btn-ghost shrink-0">
            Full leaderboard →
          </Link>
        </div>
        <LeaderboardTable data={top3} orgs={leaderboard.orgs} compact />
      </section>

      {/* CTA */}
      <section className="container-px py-20">
        <div className="card relative overflow-hidden p-10 text-center sm:p-16">
          <div className="glow-radial pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative">
            <h2 className="text-balance text-3xl font-bold text-white sm:text-4xl">
              Evaluate your agent on AARRI
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-400">
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
