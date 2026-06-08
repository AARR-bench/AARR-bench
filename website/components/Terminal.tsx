"use client";

import { useEffect, useRef, useState } from "react";

interface Line {
  prompt?: boolean;
  text: string;
  out?: boolean;
  dim?: boolean;
}

// Each "scene" is a command followed by simulated output lines.
const SCENES: Line[][] = [
  [
    { prompt: true, text: "harbor run -d aarr/aarri-bench -m claude-opus-4.7 -a mini-swe-agent" },
    { out: true, text: "→ pulling dataset aarr/aarri-bench ... 82 tasks" },
    { out: true, text: "→ building containers ........ done" },
    { out: true, text: "task sharp-ac ............... reward 1" },
    { out: true, text: "task data-awareness ........ reward 1" },
    { out: true, text: "task reproduction-audit .... reward 0" },
    { out: true, dim: true, text: "overall 68.3%  (context 64.7 · mindset 76.9 · interaction 76.2)" },
  ],
  [
    { prompt: true, text: "harbor run -p ./tasks -m gpt-5.3-codex -a claude-code" },
    { out: true, text: "→ loading 82 local tasks" },
    { out: true, text: "task scope-creep-negotiation . reward 1" },
    { out: true, text: "task silent-nan-hunter ....... reward 1" },
    { out: true, dim: true, text: "overall 53.1%  across 4 categories" },
  ],
  [
    { prompt: true, text: "harbor eval --category mindset --agent hermes" },
    { out: true, text: "→ scoring 13 mindset tasks" },
    { out: true, text: "task reject-augmentation-advice . reward 1" },
    { out: true, text: "task camera-ready-revision ...... reward 1" },
    { out: true, dim: true, text: "mindset accuracy 76.9%" },
  ],
];

const TYPE_SPEED = 32; // ms per char
const OUT_SPEED = 220; // ms per output line
const HOLD = 2200; // ms to hold completed scene

export function Terminal() {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [rendered, setRendered] = useState<Line[]>([]);
  const [typing, setTyping] = useState("");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const scene = SCENES[sceneIdx];
    const clear = () => timers.current.forEach(clearTimeout);

    setRendered([]);
    setTyping("");

    const cmd = scene[0].text;
    let charIdx = 0;

    const typeChar = () => {
      charIdx += 1;
      setTyping(cmd.slice(0, charIdx));
      if (charIdx < cmd.length) {
        timers.current.push(setTimeout(typeChar, TYPE_SPEED));
      } else {
        // command fully typed -> commit and stream output
        timers.current.push(
          setTimeout(() => {
            setRendered([scene[0]]);
            setTyping("");
            streamOutput(1);
          }, 350),
        );
      }
    };

    const streamOutput = (i: number) => {
      if (i >= scene.length) {
        // hold, then advance
        timers.current.push(
          setTimeout(() => setSceneIdx((s) => (s + 1) % SCENES.length), HOLD),
        );
        return;
      }
      setRendered((prev) => [...prev, scene[i]]);
      timers.current.push(setTimeout(() => streamOutput(i + 1), OUT_SPEED));
    };

    timers.current.push(setTimeout(typeChar, 500));
    return clear;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneIdx]);

  return (
    <div className="card overflow-hidden shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)]">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-ink-100 bg-paper-50 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full border border-ink-200 bg-white" />
        <span className="h-3 w-3 rounded-full border border-ink-200 bg-white" />
        <span className="h-3 w-3 rounded-full border border-ink-200 bg-white" />
        <span className="ml-3 text-xs text-ink-400">
          aarr@bench: ~/AARRI-bench
        </span>
      </div>

      {/* Screen */}
      <div className="bg-term-bg px-5 py-4 text-[13px] leading-relaxed sm:text-sm">
        <div className="min-h-[260px]">
          {rendered.length === 0 && typing === "" ? null : null}

          {/* committed lines */}
          {rendered.map((line, i) =>
            line.prompt ? (
              <div key={i} className="text-term-text">
                <span className="text-term-green">$ </span>
                {line.text}
              </div>
            ) : (
              <div
                key={i}
                className={line.dim ? "text-term-dim" : "text-term-text/90"}
              >
                {line.text}
              </div>
            ),
          )}

          {/* currently typing command */}
          {typing !== "" && (
            <div className="text-term-text">
              <span className="text-term-green">$ </span>
              {typing}
              <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-term-green" />
            </div>
          )}

          {/* idle cursor when a scene finished and is holding */}
          {typing === "" &&
            rendered.length > 0 &&
            rendered.length === SCENES[sceneIdx].length && (
              <div className="text-term-text">
                <span className="text-term-green">$ </span>
                <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-term-green" />
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
