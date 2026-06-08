import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About & Quickstart",
  description:
    "How AARR-bench works and how to evaluate your agent on AARRI using the Harbor framework.",
};

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-white/[0.08] bg-ink-900 p-4 font-mono text-sm leading-relaxed text-slate-300">
      {children}
    </pre>
  );
}

export default function AboutPage() {
  return (
    <div className="container-px py-16">
      <div className="mx-auto max-w-3xl">
        <p className="section-label">About</p>
        <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
          What is AARR-bench?
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-400">
          AARR (Act As a Real Researcher) is a benchmark series for evaluating
          LLM agents across the research lifecycle. The core question: what
          exactly are the gaps between AI agents and real human researchers? The
          series progresses through three stages of increasing autonomy — intern
          (AARRI), assistant (AARRA), and scientist (AARRS).
        </p>

        <div className="mt-14">
          <h2 className="text-2xl font-bold text-white">Quickstart</h2>
          <p className="mt-3 text-slate-400">
            AARRI tasks are containerized via the{" "}
            <a
              href="https://www.harborframework.com/docs"
              target="_blank"
              rel="noreferrer"
              className="text-brand-300 hover:text-brand-200"
            >
              Harbor framework
            </a>
            . You can run the full benchmark against any model and agent harness.
          </p>

          <h3 className="mt-8 text-lg font-semibold text-white">
            Option 1 — Run from Harbor Hub (no clone)
          </h3>
          <p className="mb-3 mt-2 text-sm text-slate-400">
            Install the Harbor CLI and pull the dataset directly from the
            registry.
          </p>
          <CodeBlock>{`uv tool install harbor
harbor run -d aarr/aarri-bench -m "<model>" -a "<agent>"`}</CodeBlock>

          <h3 className="mt-8 text-lg font-semibold text-white">
            Option 2 — Run a local copy
          </h3>
          <p className="mb-3 mt-2 text-sm text-slate-400">
            Use this mode if you want to inspect or modify tasks, or run a
            subset of them.
          </p>
          <CodeBlock>{`git clone https://github.com/AARR-bench/AARRI-bench.git
cd AARRI-bench
uv tool install harbor
harbor run -p ./tasks -m "<model>" -a "<agent>"`}</CodeBlock>
        </div>

        <div className="mt-14">
          <h2 className="text-2xl font-bold text-white">How tasks are scored</h2>
          <p className="mt-3 leading-relaxed text-slate-400">
            Each task is a self-contained folder with an instruction, a Docker
            environment, a hidden reference solution, and a verifier. The agent
            sees only the instruction and the files placed in its container. The
            verifier runs pytest assertions against the agent&apos;s output and
            writes a binary reward — 1 for success, 0 for failure. The
            leaderboard reports the classic 0/1 reward metric aggregated by task
            category.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          <Link href="/tasks/" className="card card-hover p-6">
            <h3 className="font-semibold text-white">Browse the task registry →</h3>
            <p className="mt-2 text-sm text-slate-500">
              Explore all AARRI tasks, filter by category and difficulty.
            </p>
          </Link>
          <Link href="/leaderboard/" className="card card-hover p-6">
            <h3 className="font-semibold text-white">See the leaderboard →</h3>
            <p className="mt-2 text-sm text-slate-500">
              Compare agent harnesses and models across categories.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
