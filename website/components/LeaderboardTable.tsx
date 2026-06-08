"use client";

import { useMemo, useState } from "react";
import type { LeaderboardData, LeaderboardRow } from "@/lib/types";

type SortKey = "overall" | "context" | "mindset" | "interaction" | "handsOn";

const numericCols: { key: SortKey; label: string }[] = [
  { key: "context", label: "Context" },
  { key: "mindset", label: "Mindset" },
  { key: "interaction", label: "Interaction" },
  { key: "handsOn", label: "Hands-on" },
  { key: "overall", label: "Overall" },
];

function rankMap(rows: LeaderboardRow[], key: SortKey) {
  const values = rows.map((r) => r[key]);
  const sorted = [...new Set(values)].sort((a, b) => b - a);
  return { best: sorted[0], second: sorted[1] };
}

function cellClass(value: number, best: number, second: number) {
  if (value === best) return "font-bold text-white";
  if (value === second) return "font-semibold text-brand-300 underline decoration-brand-500/50 underline-offset-4";
  return "text-slate-400";
}

const orgDot: Record<string, string> = {
  OpenAI: "bg-emerald-400",
  Anthropic: "bg-orange-400",
  "Moonshot AI": "bg-sky-400",
  Alibaba: "bg-violet-400",
  MiniMax: "bg-rose-400",
  DeepSeek: "bg-blue-400",
  Google: "bg-amber-400",
};

export function LeaderboardTable({
  data,
  orgs,
  compact = false,
}: {
  data: LeaderboardData;
  orgs: Record<string, string>;
  compact?: boolean;
}) {
  const [sortKey, setSortKey] = useState<SortKey>("overall");

  const sortedRows = useMemo(
    () => [...data.rows].sort((a, b) => b[sortKey] - a[sortKey]),
    [data.rows, sortKey],
  );

  const ranks = useMemo(() => {
    const map: Record<SortKey, { best: number; second: number }> = {} as never;
    for (const col of numericCols) map[col.key] = rankMap(data.rows, col.key);
    return map;
  }, [data.rows]);

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-white/[0.08] text-left">
              <th className="px-4 py-3.5 font-semibold text-slate-400">#</th>
              <th className="px-4 py-3.5 font-semibold text-slate-400">
                Agent Harness
              </th>
              <th className="px-4 py-3.5 font-semibold text-slate-400">Model</th>
              {numericCols.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3.5 text-right font-semibold"
                >
                  <button
                    onClick={() => setSortKey(col.key)}
                    className={`inline-flex items-center gap-1 transition-colors hover:text-white ${
                      sortKey === col.key ? "text-brand-300" : "text-slate-400"
                    }`}
                  >
                    {col.label}
                    {sortKey === col.key && <span className="text-[10px]">▼</span>}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row, i) => {
              const org = orgs[row.model] ?? "";
              const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : null;
              return (
                <tr
                  key={`${row.harness}-${row.model}`}
                  className="border-b border-white/[0.04] transition-colors hover:bg-white/[0.025]"
                >
                  <td className="px-4 py-3 text-slate-500">
                    {medal ?? <span className="font-mono">{i + 1}</span>}
                  </td>
                  <td className="px-4 py-3 text-slate-300">{row.harness}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          orgDot[org] ?? "bg-slate-500"
                        }`}
                      />
                      <span className="font-medium text-white">{row.model}</span>
                      {!compact && org && (
                        <span className="text-xs text-slate-500">{org}</span>
                      )}
                    </div>
                  </td>
                  {numericCols.map((col) => (
                    <td
                      key={col.key}
                      className={`px-4 py-3 text-right font-mono tabular-nums ${cellClass(
                        row[col.key],
                        ranks[col.key].best,
                        ranks[col.key].second,
                      )}`}
                    >
                      {row[col.key].toFixed(1)}%
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
