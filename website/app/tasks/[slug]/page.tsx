import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/Markdown";
import { CategoryBadge, DifficultyBadge, Tag } from "@/components/Badges";
import { getAllTasks, getTask } from "@/lib/data";

export function generateStaticParams() {
  return getAllTasks().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const task = getTask("aarri", slug);
  if (!task) return { title: "Task not found" };
  return {
    title: `${task.slug}`,
    description: task.summary,
  };
}

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const task = getTask("aarri", slug);
  if (!task) notFound();

  return (
    <div className="container-px py-12">
      <Link
        href="/tasks/"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-white"
      >
        ← All tasks
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_300px]">
        {/* Main */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <CategoryBadge category={task.category} />
            <DifficultyBadge difficulty={task.difficulty} />
          </div>

          <h1 className="mt-4 break-words font-mono text-3xl font-bold text-white sm:text-4xl">
            {task.slug}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">
            {task.summary}
          </p>

          {task.motivation && (
            <div className="mt-8">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-300">
                Why this matters
              </h2>
              <p className="mt-3 leading-relaxed text-slate-400">
                {task.motivation}
              </p>
            </div>
          )}

          <div className="mt-10">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-300">
              Agent instruction
            </h2>
            <div className="card mt-3 p-6">
              {task.instruction ? (
                <Markdown>{task.instruction}</Markdown>
              ) : (
                <p className="text-slate-500">No instruction provided.</p>
              )}
            </div>
            <p className="mt-3 text-xs text-slate-600">
              The agent sees only this instruction and the files placed in its
              container. Reference solutions and verifier tests are intentionally
              hidden.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="card p-6">
            <h3 className="text-sm font-semibold text-white">Details</h3>
            <dl className="mt-4 space-y-3 text-sm">
              <Row label="Benchmark" value="AARRI" />
              <Row label="Category" value={task.category} capitalize />
              <Row label="Difficulty" value={task.difficulty} capitalize />
              {task.author && <Row label="Author" value={task.author} />}
              {task.taskId && (
                <Row label="Task ID" value={task.taskId} mono />
              )}
            </dl>
          </div>

          {task.tags.length > 0 && (
            <div className="card p-6">
              <h3 className="text-sm font-semibold text-white">Tags</h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {task.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </div>
          )}

          <div className="card p-6">
            <h3 className="text-sm font-semibold text-white">Environment</h3>
            <dl className="mt-4 space-y-3 text-sm">
              {task.env.cpus != null && (
                <Row label="CPUs" value={String(task.env.cpus)} mono />
              )}
              {task.env.memoryMb != null && (
                <Row
                  label="Memory"
                  value={`${task.env.memoryMb} MB`}
                  mono
                />
              )}
              {task.env.gpus != null && (
                <Row label="GPUs" value={String(task.env.gpus)} mono />
              )}
              {task.env.allowInternet != null && (
                <Row
                  label="Internet"
                  value={task.env.allowInternet ? "allowed" : "disabled"}
                />
              )}
            </dl>
          </div>

          <a
            href={`https://github.com/AARR-bench/AARRI-bench/tree/main/tasks/${task.slug}`}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost w-full"
          >
            View source on GitHub
          </a>
        </aside>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  mono,
  capitalize,
}: {
  label: string;
  value: string;
  mono?: boolean;
  capitalize?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-slate-500">{label}</dt>
      <dd
        className={`text-right text-slate-200 ${mono ? "font-mono" : ""} ${
          capitalize ? "capitalize" : ""
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
