import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About & Quickstart",
  description:
    "How AARR-bench works and how to evaluate your agent on AARRI using the Harbor framework.",
};

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto border border-ink-100 bg-term-bg p-4 text-sm leading-relaxed text-term-text">
      {children}
    </pre>
  );
}

export default function AboutPage() {
  return (
    <div className="container-px py-16">
      <div className="mx-auto max-w-3xl">
        <p className="section-label">About</p>
        <h1 className="mt-3 text-4xl font-bold text-ink sm:text-5xl">
          What is AARR-bench?
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-600">
          AARR (Act As a Real Researcher) is a benchmark series for evaluating
          LLM agents across the research lifecycle. The core question: what
          exactly are the gaps between AI agents and real human researchers? The
          series progresses through three stages of increasing autonomy — intern
          (AARRI), assistant (AARRA), and scientist (AARRS).
        </p>

        <div className="mt-14">
          <h2 className="text-2xl font-bold text-ink">Quickstart</h2>
          <p className="mt-3 text-ink-600">
            AARRI tasks are containerized via the{" "}
            <a
              href="https://www.harborframework.com/docs"
              target="_blank"
              rel="noreferrer"
              className="text-ink underline underline-offset-4"
            >
              Harbor framework
            </a>
            . You can run the full benchmark against any model and agent harness.
          </p>

          <h3 className="mt-8 text-lg font-bold text-ink">
            Option 1 — Run from Harbor Hub (no clone)
          </h3>
          <p className="mb-3 mt-2 text-sm text-ink-500">
            Install the Harbor CLI and pull the dataset directly from the
            registry.
          </p>
          <CodeBlock>{`uv tool install harbor
harbor run -d aarr/aarri-bench -m "<model>" -a "<agent>"`}</CodeBlock>

          <h3 className="mt-8 text-lg font-bold text-ink">
            Option 2 — Run a local copy
          </h3>
          <p className="mb-3 mt-2 text-sm text-ink-500">
            Use this mode if you want to inspect or modify tasks, or run a
            subset of them.
          </p>
          <CodeBlock>{`git clone https://github.com/AARR-bench/AARRI-bench.git
cd AARRI-bench
uv tool install harbor
harbor run -p ./tasks -m "<model>" -a "<agent>"`}</CodeBlock>
        </div>

        <div className="mt-14">
          <h2 className="text-2xl font-bold text-ink">How tasks are scored</h2>
          <p className="mt-3 leading-relaxed text-ink-600">
            Each task is a self-contained folder with an instruction, a Docker
            environment, a hidden reference solution, and a verifier. The agent
            sees only the instruction and the files placed in its container. The
            verifier runs pytest assertions against the agent&apos;s output and
            writes a binary reward — 1 for success, 0 for failure. The
            leaderboard reports the classic 0/1 reward metric aggregated by task
            category.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden border border-ink-100 bg-ink-100 sm:grid-cols-2">
          <Link
            href="/tasks/"
            className="bg-white p-6 transition-colors hover:bg-paper-50"
          >
            <h3 className="font-bold text-ink">Browse the task registry →</h3>
            <p className="mt-2 text-sm text-ink-500">
              Explore all AARRI tasks, filter by category and difficulty.
            </p>
          </Link>
          <Link
            href="/leaderboard/"
            className="bg-white p-6 transition-colors hover:bg-paper-50"
          >
            <h3 className="font-bold text-ink">See the leaderboard →</h3>
            <p className="mt-2 text-sm text-ink-500">
              Compare agent harnesses and models across categories.
            </p>
          </Link>
        </div>

        {/* Contact Us */}
        <div id="contact" className="mt-14">
          <h2 className="text-2xl font-bold text-ink">Contact Us</h2>
          <p className="mt-3 text-ink-600">
            Questions, feedback, or interested in contributing? Reach out to the
            project organizer.
          </p>

          <div className="card mt-6 p-6">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              {/* Contact details */}
              <div className="min-w-0">
                <p className="text-lg font-bold text-ink">Jiayu Wang</p>
                <p className="mt-0.5 text-sm text-ink-500">
                  Project launcher &amp; first author
                </p>

                <dl className="mt-5 space-y-2.5 text-sm">
                  <div className="flex gap-3">
                    <dt className="w-20 shrink-0 font-bold text-ink-400">
                      Homepage
                    </dt>
                    <dd className="min-w-0">
                      <a
                        href="https://jiayuuwang.github.io/"
                        target="_blank"
                        rel="noreferrer"
                        className="break-all text-ink underline underline-offset-4 hover:text-ink-600"
                      >
                        jiayuuwang.github.io
                      </a>
                    </dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="w-20 shrink-0 font-bold text-ink-400">Email</dt>
                    <dd className="min-w-0">
                      <a
                        href="mailto:jiayuw794@gmail.com"
                        className="break-all text-ink underline underline-offset-4 hover:text-ink-600"
                      >
                        jiayuw794@gmail.com
                      </a>
                    </dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="w-20 shrink-0 font-bold text-ink-400">
                      Slack
                    </dt>
                    <dd className="min-w-0">
                      <a
                        href="https://join.slack.com/t/aarr-series/shared_invite/zt-40dp5md9d-btqN4Gmgsi9CtHwtLinHOg"
                        target="_blank"
                        rel="noreferrer"
                        className="break-all text-ink underline underline-offset-4 hover:text-ink-600"
                      >
                        Join the AARR Slack
                      </a>
                    </dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="w-20 shrink-0 font-bold text-ink-400">
                      WeChat
                    </dt>
                    <dd className="min-w-0 text-ink-700">jiayuw1023</dd>
                  </div>
                </dl>
              </div>

              {/* QR codes */}
              <div className="flex gap-5">
                <QrCode src="/wechat_qr.jpg" label="WeChat" />
                <QrCode src="/wechat_group_qr.jpg" label="WeChat group" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QrCode({ src, label }: { src: string; label: string }) {
  return (
    <div className="text-center">
      <div className="border border-ink-100 bg-white p-1.5">
        <Image
          src={src}
          alt={`${label} QR code`}
          width={112}
          height={112}
          className="h-28 w-28 object-contain"
        />
      </div>
      <p className="mt-2 text-xs text-ink-500">{label}</p>
    </div>
  );
}
