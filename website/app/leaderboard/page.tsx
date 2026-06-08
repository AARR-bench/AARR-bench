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
        <h1 className="mt-3 text-4xl font-bold text-ink sm:text-5xl">
          Leaderboard
        </h1>
        <p className="mt-4 text-lg text-ink-600">{leaderboard.note}</p>
      </div>

      <div className="mt-10 grid gap-px overflow-hidden border border-ink-100 bg-ink-100 sm:grid-cols-3">
        <div className="bg-white p-6">
          <p className="text-sm text-ink-500">Top configuration</p>
          <p className="mt-2 font-bold text-ink">{bestRow.model}</p>
          <p className="text-sm text-ink-500">{bestRow.harness}</p>
          <p className="mt-3 text-3xl font-bold tabular-nums text-ink">
            {bestRow.overall.toFixed(1)}
          </p>
        </div>
        <div className="bg-white p-6">
          <p className="text-sm text-ink-500">Agent harnesses</p>
          <p className="mt-2 text-3xl font-bold text-ink">{harnesses.length}</p>
          <p className="mt-2 text-sm text-ink-500">{harnesses.join(", ")}</p>
        </div>
        <div className="bg-white p-6">
          <p className="text-sm text-ink-500">Evaluated configs</p>
          <p className="mt-2 text-3xl font-bold text-ink">
            {leaderboard.rows.length}
          </p>
          <p className="mt-2 text-sm text-ink-500">{leaderboard.metric}</p>
        </div>
      </div>

      <div className="mt-10">
        <LeaderboardTable data={leaderboard} orgs={leaderboard.orgs} />
        <p className="mt-4 text-xs text-ink-500">
          Click any column header to sort.{" "}
          <span className="font-bold text-ink">Bold</span> marks the best result
          per column;{" "}
          <span className="font-bold text-ink-700 underline decoration-ink-300 underline-offset-4">
            underlined
          </span>{" "}
          marks second-best.
        </p>
      </div>
    </div>
  );
}
