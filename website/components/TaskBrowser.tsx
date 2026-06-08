"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Task } from "@/lib/types";
import { CategoryBadge, DifficultyBadge, Tag } from "@/components/Badges";

const DIFFICULTY_ORDER = ["easy", "medium", "hard"];

export function TaskBrowser({
  tasks,
  categories,
  difficulties,
}: {
  tasks: Task[];
  categories: { name: string; count: number }[];
  difficulties: { name: string; count: number }[];
}) {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const [activeDiff, setActiveDiff] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tasks.filter((t) => {
      if (activeCat && t.category !== activeCat) return false;
      if (activeDiff && t.difficulty !== activeDiff) return false;
      if (q) {
        const hay =
          `${t.slug} ${t.summary} ${t.motivation} ${t.tags.join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [tasks, query, activeCat, activeDiff]);

  const hasFilters = activeCat || activeDiff || query;

  return (
    <div>
      {/* Controls */}
      <div className="card p-5">
        <div className="relative">
          <svg
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tasks by name, summary, or tag…"
            className="w-full rounded-xl border border-white/[0.08] bg-ink-900/60 py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition-colors focus:border-brand-500/50"
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <FilterChip
            label="All categories"
            active={!activeCat}
            onClick={() => setActiveCat(null)}
          />
          {categories.map((c) => (
            <FilterChip
              key={c.name}
              label={`${c.name} (${c.count})`}
              active={activeCat === c.name}
              onClick={() => setActiveCat(activeCat === c.name ? null : c.name)}
            />
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <FilterChip
            label="All difficulties"
            active={!activeDiff}
            onClick={() => setActiveDiff(null)}
          />
          {[...difficulties]
            .sort(
              (a, b) =>
                DIFFICULTY_ORDER.indexOf(a.name) -
                DIFFICULTY_ORDER.indexOf(b.name),
            )
            .map((d) => (
              <FilterChip
                key={d.name}
                label={`${d.name} (${d.count})`}
                active={activeDiff === d.name}
                onClick={() =>
                  setActiveDiff(activeDiff === d.name ? null : d.name)
                }
              />
            ))}
        </div>
      </div>

      {/* Results count */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold text-white">{filtered.length}</span> of{" "}
          {tasks.length} tasks
        </p>
        {hasFilters && (
          <button
            onClick={() => {
              setQuery("");
              setActiveCat(null);
              setActiveDiff(null);
            }}
            className="text-sm text-brand-300 transition-colors hover:text-brand-200"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="card mt-6 p-12 text-center text-slate-500">
          No tasks match your filters.
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((task) => (
            <Link
              key={task.slug}
              href={`/tasks/${task.slug}/`}
              className="card card-hover group flex flex-col p-6"
            >
              <div className="flex items-center gap-2">
                <CategoryBadge category={task.category} />
                <DifficultyBadge difficulty={task.difficulty} />
              </div>
              <h3 className="mt-3 font-mono text-sm font-semibold text-white group-hover:text-brand-200">
                {task.slug}
              </h3>
              <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-500">
                {task.summary}
              </p>
              {task.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {task.tags.slice(0, 3).map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                  {task.tags.length > 3 && (
                    <span className="text-[11px] text-slate-600">
                      +{task.tags.length - 3}
                    </span>
                  )}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition-all ${
        active
          ? "border-brand-500/50 bg-brand-500/15 text-brand-200"
          : "border-white/[0.08] bg-white/[0.02] text-slate-400 hover:border-white/20 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}
