"use client";

import { useId, useMemo, useState } from "react";
import {
  NAIVE_MS,
  PATCHED,
  RPS_MAX,
  RPS_MIN,
  SATURATION_AFTER,
  SATURATION_BEFORE,
  SERVICES,
  SHOWN,
  SLO_MS,
  predict,
} from "@/lib/model";

const W = 700;
const H = 300;
const L = 64;
const R = 660;
const T = 36;
const B = 268;
const Y_MAX = 200;

const x = (rps: number) => L + ((rps - RPS_MIN) / (RPS_MAX - RPS_MIN)) * (R - L);
const y = (ms: number) => B - (Math.min(ms, Y_MAX) / Y_MAX) * (B - T);

function verdictFor(rho: number, added: number) {
  const x = `${(added / NAIVE_MS).toFixed(1)}×`;
  if (rho < 0.6) return `Queueing already turns the direct cost into ${x} as much added latency.`;
  if (rho < 0.85) return `Amplifying. Users see ${x} the direct cost, and it grows faster with every request per second.`;
  return `Near saturation. Users see ${x} the direct cost, and a little more traffic adds a lot more latency.`;
}

export default function Simulator() {
  const [rps, setRps] = useState(55);
  const inputId = useId();
  const p = predict(rps);

  const curve = useMemo(() => {
    const pts: string[] = [];
    for (let r = RPS_MIN; r < SATURATION_AFTER - 0.15; r += 0.4) {
      const v = predict(r);
      if (v.saturated) break;
      pts.push(`${x(r).toFixed(1)},${y(v.delta[0]).toFixed(1)}`);
      if (v.delta[0] > Y_MAX) break;
    }
    return "M" + pts.join(" L");
  }, []);

  const shown = p.saturated ? [] : SHOWN.map((i) => p.delta[i]);
  const peak = Math.max(...shown, 1);
  const broken = p.saturated ? SHOWN.length : SHOWN.filter((i) => p.latency[i] > SLO_MS[i]).length;

  return (
    <figure className="sim reveal" aria-label="Interactive: the same patch at different traffic levels">
      <div className="sim-head">
        <div className="sim-ctl">
          <label htmlFor={inputId}>Traffic</label>
          <input
            id={inputId}
            type="range"
            min={RPS_MIN}
            max={RPS_MAX}
            step={0.5}
            value={rps}
            onChange={(e) => setRps(Number(e.target.value))}
            aria-valuetext={`${rps.toFixed(0)} requests per second`}
          />
          <output className="sim-rate" htmlFor={inputId}>
            {rps.toFixed(0)} req/s
          </output>
        </div>

        <dl className="sim-stats">
          <div className="sim-stat is-key">
            <dt>Added latency at the entry point</dt>
            <dd>{p.saturated ? "Unbounded" : `+${p.delta[0].toFixed(1)} ms`}</dd>
          </div>
          <div className="sim-stat">
            <dt>Direct cost of the patch</dt>
            <dd>+{NAIVE_MS.toFixed(2)} ms</dd>
          </div>
          <div className="sim-stat">
            <dt>Latency objectives broken</dt>
            <dd>
              {broken} of {SHOWN.length}
            </dd>
          </div>
          <div className="sim-stat">
            <dt>Busiest service, ρ</dt>
            <dd>{p.saturated ? "≥ 1.00" : p.rho.toFixed(2)}</dd>
          </div>
        </dl>
        <p className={`sim-verdict${p.saturated ? " is-breach" : ""}`} aria-live="polite">
          {p.saturated
            ? "Certified breach. The patch pushes a service past 100% utilization, so its queue grows without limit. This is arithmetic, not a statistical estimate."
            : verdictFor(p.rho, p.delta[0])}
        </p>
      </div>

      <ul className="sim-legend" aria-hidden="true">
        <li className="lg-model">Rhobound prediction, added ms at the entry point</li>
        <li className="lg-naive">Naive estimate: add up the direct costs</li>
      </ul>
      <div className="sim-chart">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby={`${inputId}-t`}>
          <title id={`${inputId}-t`}>
            Added latency at the entry point against traffic. The same patch adds about 14 ms at 55 requests per
            second and rises steeply toward saturation near 114 requests per second.
          </title>
          <g className="sim-grid">
            <line x1={L} y1={B} x2={R} y2={B} />
            {[50, 100, 150, 200].map((v) => (
              <line key={v} x1={L} y1={y(v)} x2={R} y2={y(v)} strokeDasharray="2 4" />
            ))}
          </g>
          <g className="sim-axis">
            {[0, 50, 100, 150, 200].map((v) => (
              <text key={v} x={L - 8} y={y(v) + 4} textAnchor="end">
                {v}
              </text>
            ))}
            <text x={L} y={H - 8}>
              {RPS_MIN} req/s
            </text>
            <text x={R} y={H - 8} textAnchor="end">
              {RPS_MAX} req/s
            </text>
          </g>

          <line className="sim-naive" x1={L} y1={y(NAIVE_MS)} x2={R} y2={y(NAIVE_MS)} />

          <line className="sim-limit" x1={x(SATURATION_AFTER)} y1={T - 6} x2={x(SATURATION_AFTER)} y2={B} />
          <text className="sim-axis sim-limit-label" x={x(SATURATION_AFTER) - 6} y={T - 10} textAnchor="end">
            Saturates at {SATURATION_AFTER.toFixed(0)} req/s (was {SATURATION_BEFORE.toFixed(0)})
          </text>

          <path className="sim-curve" d={curve} pathLength={1} />
          <line className="sim-guide" x1={x(rps)} y1={T - 6} x2={x(rps)} y2={B} />
          <circle className="sim-dot" r={5} cx={x(rps)} cy={p.saturated ? T : y(p.delta[0])} />
        </svg>
      </div>

      <div className="sim-bars">
        <table>
          <caption className="sr-only">Added mean latency and objective status per service</caption>
          <thead className="sr-only">
            <tr>
              <th>Service</th>
              <th>Added latency</th>
              <th>Added ms</th>
              <th>Within objective</th>
            </tr>
          </thead>
          <tbody>
            {SHOWN.map((i, k) => {
              const d = p.saturated ? null : p.delta[i];
              const ok = !p.saturated && p.latency[i] <= SLO_MS[i];
              return (
                <tr key={i}>
                  <th scope="row" className={PATCHED.has(i) ? "is-patched" : undefined}>
                    {SERVICES[i].name}
                  </th>
                  <td className="bar-cell">
                    <span className="bar-track">
                      <span
                        className="bar-fill"
                        style={{ width: d === null ? "100%" : `${((shown[k] / peak) * 100).toFixed(1)}%` }}
                      />
                    </span>
                  </td>
                  <td className="num">{d === null ? "∞" : `+${d.toFixed(1)}`}</td>
                  <td className={ok ? "slo-ok" : "slo-bad"}>
                    <span aria-hidden="true">{ok ? "✓" : "✕"}</span>
                    <span className="sr-only">{ok ? "within objective" : "objective broken"}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <figcaption>
          Bold names run the patched base image. The others slow down only because they wait on services that do. Model of the
          12-service reference system, mean latency; checked against a discrete-event simulation.
        </figcaption>
      </div>
    </figure>
  );
}
