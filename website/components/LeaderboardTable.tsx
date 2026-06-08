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
  if (value === best) return "font-bold text-ink";
  if (value === second) return "font-bold text-ink-700 underline decoration-ink-300 underline-offset-4";
  return "text-ink-500";
}

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
            <tr className="border-b border-ink-200 bg-paper-50 text-left">
              <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-ink-400">
                #
              </th>
              <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-ink-400">
                Harness
              </th>
              <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-ink-400">
                Model
              </th>
              {numericCols.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wider"
                >
                  <button
                    onClick={() => setSortKey(col.key)}
                    className={`inline-flex items-center gap-1 transition-colors hover:text-ink ${
                      sortKey === col.key ? "text-ink" : "text-ink-400"
                    }`}
                  >
                    {col.label}
                    {sortKey === col.key && <span className="text-[9px]">▼</span>}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row, i) => {
              const org = orgs[row.model] ?? "";
              const rank = i + 1;
              return (
                <tr
                  key={`${row.harness}-${row.model}`}
                  className="border-b border-ink-100 transition-colors last:border-0 hover:bg-paper-50"
                >
                  <td className="px-4 py-3 tabular-nums text-ink-400">
                    {String(rank).padStart(2, "0")}
                  </td>
                  <td className="px-4 py-3 text-ink-600">{row.harness}</td>
                  <td className="px-4 py-3">
                    <span className="font-bold text-ink">{row.model}</span>
                    {!compact && org && (
                      <span className="ml-2 text-xs text-ink-400">{org}</span>
                    )}
                  </td>
                  {numericCols.map((col) => (
                    <td
                      key={col.key}
                      className={`px-4 py-3 text-right tabular-nums ${cellClass(
                        row[col.key],
                        ranks[col.key].best,
                        ranks[col.key].second,
                      )}`}
                    >
                      {row[col.key].toFixed(1)}
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
