"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { NAIVE_MS, SHOWN, budgetScale, predict, saturationPoint, slosBroken } from "@/lib/model";

// Agentic delivery loop on the 12-service reference system. Every verdict is computed
// live by the same queueing model as the hero simulator.

const PEAK = 70; // req/s the change must survive
const STEP_MS = 850;

const STAGES = [
  { name: "Issue or CVE", note: "Scanner or ticket" },
  { name: "Agent writes the fix", note: "Coding agent" },
  { name: "Pull request", note: "Opened by the agent" },
  { name: "CI", note: "Build and tests" },
  { name: "Rhobound gate", note: "Latency, SLOs, bound" },
  { name: "Merge and canary", note: "Progressive delivery" },
  { name: "Production", note: "Real traffic" },
];
const GATE = 4;
const WHO = ["scanner", "agent", "git", "ci", "rhobound", "deploy", "prod"];

const SCENARIOS = [
  { id: "small", label: "Small fix", scale: 0.3 },
  { id: "typical", label: "Typical TLS fix", scale: 1 },
  { id: "regression", label: "Hot-path regression", scale: 4.5 },
] as const;
type ScenarioId = (typeof SCENARIOS)[number]["id"];

const BUDGET = budgetScale(PEAK);
const REVISED = BUDGET * 0.88;
const BOUND_BEFORE = saturationPoint(0);

type Verdict = {
  kind: "pass" | "fail" | "breach";
  direct: number;
  added: number | null;
  broken: number;
  bound: number;
};

function verdictFor(scale: number): Verdict {
  const p = predict(PEAK, scale);
  const bound = saturationPoint(scale);
  const broken = slosBroken(p);
  return {
    kind: p.saturated ? "breach" : broken ? "fail" : "pass",
    direct: scale * NAIVE_MS,
    added: p.saturated ? null : p.delta[0],
    broken,
    bound,
  };
}

type Frame = { stage: number; line: string; tone?: "fail" | "pass" | "budget"; verdict?: Verdict; retry?: boolean };

function script(scale: number): Frame[] {
  const f: Frame[] = [
    { stage: 0, line: "Vulnerability reported in libssl, in the shared base image" },
    { stage: 1, line: `Fix #1 drafted. Benchmarked direct cost: +${(scale * NAIVE_MS).toFixed(2)} ms per request` },
    { stage: 2, line: "Pull request opened" },
    { stage: 3, line: "Build ✓  Tests ✓  (correct, but is it fast enough?)" },
  ];
  const v = verdictFor(scale);
  if (v.kind === "pass") {
    f.push({
      stage: GATE,
      verdict: v,
      tone: "pass",
      line: `PASS  +${v.added!.toFixed(1)} ms at the entry point, all ${SHOWN.length} SLOs hold at ${PEAK} req/s`,
    });
  } else {
    f.push({
      stage: GATE,
      verdict: v,
      tone: "fail",
      line:
        v.kind === "breach"
          ? `BLOCKED  certified breach: a service passes 100% busy at ${v.bound.toFixed(0)} req/s, below the ${PEAK} req/s peak`
          : `FAIL  +${v.added!.toFixed(1)} ms at the entry point, ${v.broken} of ${SHOWN.length} SLOs break at ${PEAK} req/s`,
    });
    f.push({
      stage: 1,
      retry: true,
      tone: "budget",
      line: `Budget returned to the agent: direct cost ≤ ${(BUDGET * NAIVE_MS).toFixed(2)} ms per request`,
    });
    f.push({ stage: 1, line: `Fix #2 drafted within budget: +${(REVISED * NAIVE_MS).toFixed(2)} ms per request` });
    f.push({ stage: 3, line: "Build ✓  Tests ✓" });
    const v2 = verdictFor(REVISED);
    f.push({
      stage: GATE,
      verdict: v2,
      tone: "pass",
      line: `PASS  +${v2.added!.toFixed(1)} ms at the entry point, all ${SHOWN.length} SLOs hold at ${PEAK} req/s`,
    });
  }
  f.push({ stage: 5, line: "Merged. Canary confirms the measured cost per call" });
  f.push({ stage: 6, line: "Rolled out. Telemetry refreshes the model for the next change" });
  return f;
}

export default function DeliveryLoop() {
  const [scenario, setScenario] = useState<ScenarioId>("typical");
  const [step, setStep] = useState(-1);
  const [frames, setFrames] = useState<Frame[]>(() => script(1));
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  const run = useCallback((id: ScenarioId) => {
    const sc = SCENARIOS.find((s) => s.id === id)!;
    const fr = script(sc.scale);
    setScenario(id);
    setFrames(fr);
    if (timer.current) clearInterval(timer.current);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setStep(fr.length - 1);
      return;
    }
    let i = 0;
    setStep(0);
    timer.current = setInterval(() => {
      i += 1;
      if (i >= fr.length) {
        if (timer.current) clearInterval(timer.current);
        return;
      }
      setStep(i);
    }, STEP_MS);
  }, []);

  // Start once, when the loop scrolls into view.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !started.current) {
          started.current = true;
          run("typical");
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer.current) clearInterval(timer.current);
    };
  }, [run]);

  // Before it runs (and without JS), show the finished run.
  const shownStep = step < 0 ? frames.length - 1 : step;
  const current = frames[shownStep];
  const visited = new Set(frames.slice(0, shownStep + 1).map((f) => f.stage));
  const retried = frames.slice(0, shownStep + 1).some((f) => f.retry);
  const lastVerdict = [...frames.slice(0, shownStep + 1)].reverse().find((f) => f.verdict)?.verdict;
  const done = shownStep === frames.length - 1;

  return (
    <div className="loop" ref={root}>
      <div className="loop-controls" role="group" aria-label="Choose a change to send through the loop">
        <span className="loop-controls-label">Send a change through:</span>
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`loop-btn${scenario === s.id ? " is-on" : ""}`}
            aria-pressed={scenario === s.id}
            onClick={() => run(s.id)}
          >
            {s.label}
            <small>+{(s.scale * NAIVE_MS).toFixed(1)} ms direct</small>
          </button>
        ))}
      </div>

      <div className={`loop-track${retried ? " has-retry" : ""}${done ? " is-done" : ""}`}>
        <div className="loop-arc loop-arc-telemetry" aria-hidden="true">
          <span>Telemetry keeps the model current</span>
        </div>
        <ol className="loop-stages" aria-label="Agentic delivery loop">
          {STAGES.map((s, i) => (
            <li
              key={s.name}
              className={[
                "loop-stage",
                i === GATE ? "is-gate" : "",
                current.stage === i ? "is-active" : "",
                visited.has(i) && current.stage !== i ? "is-done" : "",
                i === GATE && current.stage === i && current.tone ? `tone-${current.tone}` : "",
                i === GATE && current.stage !== i && lastVerdict ? `was-${lastVerdict.kind}` : "",
              ].join(" ")}
              aria-current={current.stage === i ? "step" : undefined}
            >
              <b>{s.name}</b>
              <span>{s.note}</span>
            </li>
          ))}
        </ol>
        <div className="loop-arc loop-arc-retry" aria-hidden="true">
          <span>Over budget: the limit goes back to the agent</span>
        </div>
      </div>

      <div className="loop-body">
        <ol className="loop-log report" aria-live="polite">
          {frames.slice(0, shownStep + 1).map((f, i) => (
            <li key={`${scenario}-${i}`} className={f.tone ? `log-${f.tone}` : undefined}>
              <span className="log-who">{WHO[f.stage]}</span>
              <span className="log-what">{f.line}</span>
            </li>
          ))}
        </ol>
        <dl className={`loop-verdict${lastVerdict ? ` is-${lastVerdict.kind}` : ""}`}>
          <div className="lv-head">
            <dt>Gate verdict</dt>
            <dd>{lastVerdict ? { pass: "Pass", fail: "Fail", breach: "Certified breach" }[lastVerdict.kind] : "Waiting"}</dd>
          </div>
          <div>
            <dt>Added latency at the entry point</dt>
            <dd>{lastVerdict ? (lastVerdict.added === null ? "Unbounded" : `+${lastVerdict.added.toFixed(1)} ms`) : "–"}</dd>
          </div>
          <div>
            <dt>SLOs holding at {PEAK} req/s</dt>
            <dd>{lastVerdict ? `${SHOWN.length - lastVerdict.broken} of ${SHOWN.length}` : "–"}</dd>
          </div>
          <div>
            <dt>Bound: saturation traffic</dt>
            <dd>
              {lastVerdict ? `${BOUND_BEFORE.toFixed(0)} → ${lastVerdict.bound.toFixed(0)} req/s` : "–"}
            </dd>
          </div>
          <div>
            <dt>Budget for this change</dt>
            <dd>≤ {(BUDGET * NAIVE_MS).toFixed(2)} ms direct</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
