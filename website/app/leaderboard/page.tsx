import type { Metadata } from "next";
import { LeaderboardTable } from "@/components/LeaderboardTable";
import { getLeaderboard } from "@/lib/data";

export const metadata: Metadata = {
  title: "Leaderboard",
  description:
    "Agent overall performance by task category on AARRI-Bench, using the classic 0/1 reward metric.",
};

export default function LeaderboardPage() {
  const leaderboard = getLeaderboard();
  const harnesses = [...new Set(leaderboard.rows.map((r) => r.harness))];
  const bestOverall = Math.max(...leaderboard.rows.map((r) => r.overall));
  const bestRow = leaderboard.rows.find((r) => r.overall === bestOverall)!;

  return (
    <div className="container-px py-16">
      <div className="max-w-2xl">
        <p className="section-label">AARRI-Bench</p>
        <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
          Leaderboard
        </h1>
        <p className="mt-4 text-lg text-slate-400">{leaderboard.note}</p>
      </div>

      {/* Summary cards */}
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <div className="card p-6">
          <p className="text-sm text-slate-500">Top configuration</p>
          <p className="mt-2 font-semibold text-white">{bestRow.model}</p>
          <p className="text-sm text-slate-400">{bestRow.harness}</p>
          <p className="mt-3 font-mono text-3xl font-bold text-gradient">
            {bestRow.overall.toFixed(1)}%
          </p>
        </div>
        <div className="card p-6">
          <p className="text-sm text-slate-500">Agent harnesses</p>
          <p className="mt-2 font-mono text-3xl font-bold text-white">
            {harnesses.length}
          </p>
          <p className="mt-2 text-sm text-slate-400">{harnesses.join(", ")}</p>
        </div>
        <div className="card p-6">
          <p className="text-sm text-slate-500">Evaluated configs</p>
          <p className="mt-2 font-mono text-3xl font-bold text-white">
            {leaderboard.rows.length}
          </p>
          <p className="mt-2 text-sm text-slate-400">
            Metric: {leaderboard.metric}
          </p>
        </div>
      </div>

      <div className="mt-10">
        <LeaderboardTable data={leaderboard} orgs={leaderboard.orgs} />
        <p className="mt-4 text-xs text-slate-500">
          Click any column header to sort. <span className="font-bold text-white">Bold</span>{" "}
          marks the best result per column;{" "}
          <span className="font-semibold text-brand-300 underline decoration-brand-500/50 underline-offset-4">
            underlined
          </span>{" "}
          marks second-best.
        </p>
      </div>
    </div>
  );
}
