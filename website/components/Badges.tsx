import type { ReactNode } from "react";

const difficultyStyles: Record<string, string> = {
  easy: "border-accent-emerald/30 bg-accent-emerald/10 text-accent-emerald",
  medium: "border-accent-amber/30 bg-accent-amber/10 text-accent-amber",
  hard: "border-accent-rose/30 bg-accent-rose/10 text-accent-rose",
  unknown: "border-white/10 bg-white/5 text-slate-400",
};

export function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const style = difficultyStyles[difficulty] ?? difficultyStyles.unknown;
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold capitalize ${style}`}
    >
      {difficulty}
    </span>
  );
}

const categoryStyles: Record<string, string> = {
  context: "border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan",
  mindset: "border-accent-violet/30 bg-accent-violet/10 text-accent-violet",
  interaction: "border-brand-400/30 bg-brand-400/10 text-brand-300",
  "hands-on": "border-accent-amber/30 bg-accent-amber/10 text-accent-amber",
  ego: "border-accent-rose/30 bg-accent-rose/10 text-accent-rose",
};

export function CategoryBadge({ category }: { category: string }) {
  const style =
    categoryStyles[category] ?? "border-white/10 bg-white/5 text-slate-400";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold capitalize ${style}`}
    >
      {category}
    </span>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-slate-400">
      #{children}
    </span>
  );
}
