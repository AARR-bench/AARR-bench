import Link from "next/link";
import type { Metadata } from "next";
import { Stat } from "@/components/Stat";
import { LeaderboardTable } from "@/components/LeaderboardTable";
import { CategoryBadge } from "@/components/Badges";
import {
  getBench,
  getCategories,
  getDifficulties,
  getLeaderboard,
  getTaskCount,
  getTasksByBench,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "AARRI — Act As a Real Research Intern",
  description:
    "Entry-level research tasks done with diligence and sound methodology. The first benchmark in the AARR series.",
};

export default function AARRIPage() {
  const bench = getBench("aarri")!;
  const taskCount = getTaskCount("aarri");
  const categories = getCategories("aarri");
  const difficulties = getDifficulties("aarri");
  const leaderboard = getLeaderboard();
  const featured = getTasksByBench("aarri").slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-ink-100">
        <div className="grid-bg bg-grid-light pointer-events-none absolute inset-0 opacity-70" />
        <div className="container-px relative py-16 sm:py-20">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-ink-400">
              Stage {bench.stage}
            </span>
            <span className="pill !py-0.5 border-ink bg-ink text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-term-green" />
              Live
            </span>
          </div>

          <h1 className="mt-5 text-5xl font-bold tracking-tight text-ink sm:text-6xl">
            AARRI
          </h1>
          <p className="mt-3 text-xl font-bold text-ink-600">{bench.name}</p>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-600">
            {bench.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/tasks/" className="btn-primary">
              Browse {taskCount} tasks
            </Link>
            <Link href="/leaderboard/" className="btn-ghost">
              Leaderboard
            </Link>
            {bench.arxivUrl && (
              <a
                href={bench.arxivUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                arXiv {bench.arxiv}
              </a>
            )}
          </div>

          <div className="mt-12 grid max-w-2xl grid-cols-3 gap-8">
            <Stat value={String(taskCount)} label="Tasks" />
            <Stat value={String(categories.length)} label="Categories" />
            <Stat value={String(difficulties.length)} label="Difficulty levels" />
          </div>
        </div>
      </section>

      {/* Focus areas */}
      <section className="container-px py-16">
        <p className="section-label">What it measures</p>
        <h2 className="mt-3 text-3xl font-bold text-ink">
          Researcher cognitive gaps
        </h2>
        <p className="mt-3 max-w-2xl text-ink-600">
          AARRI targets the judgment and awareness that distinguish a careful
          research intern from a code-executing agent.
        </p>
        <div className="mt-8 grid gap-px overflow-hidden border border-ink-100 bg-ink-100 sm:grid-cols-2 lg:grid-cols-4">
          {bench.focusAreas.map((area) => (
            <div key={area} className="bg-white p-6">
              <div className="mb-3 h-1 w-8 bg-ink" />
              <p className="font-bold text-ink">{area}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Breakdowns */}
      <section className="container-px py-12">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card p-7">
            <h3 className="text-lg font-bold text-ink">Tasks by category</h3>
            <div className="mt-5 space-y-4">
              {categories.map((cat) => {
                const pct = Math.round((cat.count / taskCount) * 100);
                return (
                  <div key={cat.name}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <CategoryBadge category={cat.name} />
                      <span className="tabular-nums text-ink-500">
                        {cat.count}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden border border-ink-100 bg-paper-50">
                      <div className="h-full bg-ink" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card p-7">
            <h3 className="text-lg font-bold text-ink">Tasks by difficulty</h3>
            <div className="mt-5 space-y-4">
              {difficulties.map((d) => {
                const pct = Math.round((d.count / taskCount) * 100);
                return (
                  <div key={d.name}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="capitalize text-ink-700">{d.name}</span>
                      <span className="tabular-nums text-ink-500">{d.count}</span>
                    </div>
                    <div className="h-2 overflow-hidden border border-ink-100 bg-paper-50">
                      <div className="h-full bg-ink" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured tasks */}
      <section className="container-px py-12">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="section-label">Sample tasks</p>
            <h2 className="mt-3 text-3xl font-bold text-ink">
              A look inside the benchmark
            </h2>
          </div>
          <Link href="/tasks/" className="btn-ghost shrink-0">
            All tasks →
          </Link>
        </div>
        <div className="grid gap-px overflow-hidden border border-ink-100 bg-ink-100 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((task) => (
            <Link
              key={task.slug}
              href={`/tasks/${task.slug}/`}
              className="group flex flex-col bg-white p-6 transition-colors hover:bg-paper-50"
            >
              <CategoryBadge category={task.category} />
              <h3 className="mt-3 text-sm font-bold text-ink group-hover:underline">
                {task.slug}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm text-ink-500">
                {task.summary}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Leaderboard */}
      <section className="container-px py-12">
        <div className="mb-8">
          <p className="section-label">Results</p>
          <h2 className="mt-3 text-3xl font-bold text-ink">Leaderboard</h2>
          <p className="mt-3 max-w-xl text-ink-600">{leaderboard.note}</p>
        </div>
        <LeaderboardTable data={leaderboard} orgs={leaderboard.orgs} />
      </section>
    </>
  );
}
