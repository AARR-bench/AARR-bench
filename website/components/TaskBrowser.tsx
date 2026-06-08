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
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400">
            $
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="grep tasks by name, summary, or tag…"
            className="w-full border border-ink-200 bg-white py-3 pl-9 pr-4 text-sm text-ink placeholder:text-ink-400 outline-none transition-colors focus:border-ink"
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <FilterChip
            label="all categories"
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
            label="all difficulties"
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
        <p className="text-sm text-ink-500">
          showing{" "}
          <span className="font-bold text-ink">{filtered.length}</span> of{" "}
          {tasks.length} tasks
        </p>
        {hasFilters && (
          <button
            onClick={() => {
              setQuery("");
              setActiveCat(null);
              setActiveDiff(null);
            }}
            className="text-sm text-ink-500 underline underline-offset-4 transition-colors hover:text-ink"
          >
            clear filters
          </button>
        )}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="card mt-6 p-12 text-center text-ink-400">
          No tasks match your filters.
        </div>
      ) : (
        <div className="mt-6 grid gap-px overflow-hidden border border-ink-100 bg-ink-100 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((task) => (
            <Link
              key={task.slug}
              href={`/tasks/${task.slug}/`}
              className="group flex flex-col bg-white p-6 transition-colors hover:bg-paper-50"
            >
              <div className="flex items-center gap-2">
                <CategoryBadge category={task.category} />
                <DifficultyBadge difficulty={task.difficulty} />
              </div>
              <h3 className="mt-3 text-sm font-bold text-ink group-hover:underline">
                {task.slug}
              </h3>
              <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-500">
                {task.summary}
              </p>
              {task.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {task.tags.slice(0, 3).map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                  {task.tags.length > 3 && (
                    <span className="text-[11px] text-ink-400">
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
      className={`border px-3 py-1.5 text-xs font-medium transition-colors ${
        active
          ? "border-ink bg-ink text-white"
          : "border-ink-200 bg-white text-ink-500 hover:border-ink hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}
