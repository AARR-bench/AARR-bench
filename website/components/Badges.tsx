import type { ReactNode } from "react";

const difficultyStyles: Record<string, string> = {
  easy: "border-ink-200 bg-white text-ink-600",
  medium: "border-ink-300 bg-paper-50 text-ink-700",
  hard: "border-ink bg-ink text-white",
  unknown: "border-ink-200 bg-white text-ink-500",
};

export function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const style = difficultyStyles[difficulty] ?? difficultyStyles.unknown;
  return (
    <span
      className={`inline-flex items-center border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${style}`}
    >
      {difficulty}
    </span>
  );
}

export function CategoryBadge({ category }: { category: string }) {
  return (
    <span className="inline-flex items-center border border-ink-200 bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink-600">
      {category}
    </span>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center border border-ink-100 bg-paper-50 px-2 py-0.5 text-[11px] text-ink-500">
      #{children}
    </span>
  );
}
