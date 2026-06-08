import type { Metadata } from "next";
import { getBench } from "@/lib/data";

export const metadata: Metadata = {
  title: "Paper",
  description: "Read the AARRI-Bench paper and cite our work.",
};

const bibtex = `@article{aarri2026,
  title   = {AARRI-Bench: Act As a Real Research Intern},
  author  = {AARR-bench Team},
  journal = {arXiv preprint arXiv:2606.07462},
  year    = {2026},
  url     = {https://arxiv.org/abs/2606.07462}
}`;

export default function PaperPage() {
  const bench = getBench("aarri")!;
  return (
    <div className="container-px py-16">
      <div className="mx-auto max-w-3xl">
        <p className="section-label">Publication</p>
        <h1 className="mt-3 text-4xl font-bold text-ink sm:text-5xl">
          The AARRI-Bench paper
        </h1>
        <p className="mt-4 text-lg text-ink-600">
          AARRI-Bench introduces the first stage of the AARR series, evaluating
          whether LLM agents can act as real research interns.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={bench.arxivUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            Read on arXiv ↗
          </a>
          <a
            href={bench.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost"
          >
            Code &amp; data
          </a>
        </div>

        <div className="card mt-12 p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-ink">BibTeX</h2>
            <span className="text-xs text-ink-400">arXiv:{bench.arxiv}</span>
          </div>
          <pre className="mt-4 overflow-x-auto border border-ink-100 bg-term-bg p-4 text-xs leading-relaxed text-term-text">
            {bibtex}
          </pre>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-bold text-ink">Abstract</h2>
          <p className="mt-4 leading-relaxed text-ink-600">
            {bench.description} Tasks are containerized via the Harbor framework
            and run in isolated Docker environments, with verifiers that score
            each agent run against a hidden reference. Rather than testing raw
            code execution, AARRI focuses on context sensitivity, independent
            judgment, knowing when to quit, and collaboration.
          </p>
        </div>
      </div>
    </div>
  );
}
