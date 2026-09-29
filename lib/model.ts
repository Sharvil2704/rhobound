// Reference 12-service system from the Rhobound validation suite.
// Mean-value queueing model: per-service M/M/1 response time, sequential calls add,
// parallel fan-outs take the expected maximum of the branches.
// Checked against the evidence table: 13.8 / 22.3 / 38.0 / 67.0 / 120.7 ms at
// 55 / 75 / 90 / 100 / 106 rps; saturation 139 -> 114 rps.

type Service = { name: string; serviceMs: number; calls: number[]; parallel?: boolean };

export const SERVICES: Service[] = [
  { name: "ingress", serviceMs: 2.0, calls: [1, 2] },
  { name: "auth", serviceMs: 5.0, calls: [7] },
  { name: "catalog", serviceMs: 3.0, calls: [3, 4, 5], parallel: true },
  { name: "shard-a", serviceMs: 6.0, calls: [8] },
  { name: "shard-b", serviceMs: 6.0, calls: [8] },
  { name: "shard-c", serviceMs: 6.0, calls: [9] },
  { name: "checkout", serviceMs: 4.0, calls: [10, 11] },
  { name: "token-cache", serviceMs: 2.5, calls: [] },
  { name: "db-proxy", serviceMs: 4.5, calls: [] },
  { name: "db-proxy2", serviceMs: 4.5, calls: [] },
  { name: "payments", serviceMs: 7.0, calls: [7] },
  { name: "ledger", serviceMs: 5.5, calls: [] },
];

// Added service time per call from the patched base image (ms).
const PATCH_MS = [0, 3.5, 0, 1.75, 0, 0, 0, 0, 1.0, 0, 5.0, 0];
const ENTRY_SHARE: Record<number, number> = { 0: 0.8, 6: 0.2 };

// Mean-latency objectives (ms) for the services shown in the panel.
export const SLO_MS: Record<number, number> = { 0: 65, 1: 15, 2: 45, 3: 25, 4: 25, 10: 20, 8: 15, 6: 30 };
export const SHOWN = [0, 1, 2, 3, 4, 10, 8, 6];
export const PATCHED = new Set([1, 3, 8, 10]);

// The naive estimate: add up the direct costs, ignore queueing.
export const NAIVE_MS = 6.25;

export const RPS_MIN = 40;
export const RPS_MAX = 118;

const VISITS = (() => {
  const v = new Array(SERVICES.length).fill(0);
  const walk = (i: number, w: number) => {
    v[i] += w;
    SERVICES[i].calls.forEach((k) => walk(k, w));
  };
  for (const [root, share] of Object.entries(ENTRY_SHARE)) walk(Number(root), share);
  return v as number[];
})();

// Expected maximum of independent exponentials with the given means (inclusion–exclusion).
function expectedMax(means: number[]) {
  const n = means.length;
  let total = 0;
  for (let mask = 1; mask < 1 << n; mask++) {
    let rate = 0;
    let bits = 0;
    for (let j = 0; j < n; j++)
      if (mask & (1 << j)) {
        rate += 1 / means[j];
        bits++;
      }
    total += (bits % 2 ? 1 : -1) / rate;
  }
  return total;
}

type Solved = { saturated: true; rho: number } | { saturated: false; rho: number; latency: number[] };

function solve(lambdaPerMs: number, patched: boolean): Solved {
  const s = SERVICES.map((v, i) => v.serviceMs + (patched ? PATCH_MS[i] : 0));
  const rho = s.map((si, i) => lambdaPerMs * VISITS[i] * si);
  const maxRho = Math.max(...rho);
  if (maxRho >= 1) return { saturated: true, rho: maxRho };

  const r = s.map((si, i) => si / (1 - rho[i]));
  const latency = new Array<number>(SERVICES.length).fill(-1);
  const sub = (i: number): number => {
    if (latency[i] >= 0) return latency[i];
    const k = SERVICES[i].calls;
    if (!k.length) latency[i] = r[i];
    else if (SERVICES[i].parallel) latency[i] = r[i] + expectedMax(k.map(sub));
    else latency[i] = r[i] + k.reduce((a, x) => a + sub(x), 0);
    return latency[i];
  };
  SERVICES.forEach((_, i) => sub(i));
  return { saturated: false, rho: maxRho, latency };
}

export type Prediction =
  | { saturated: true; rho: number }
  | { saturated: false; rho: number; latency: number[]; delta: number[] };

export function predict(rps: number): Prediction {
  const lambda = rps / 1000;
  const before = solve(lambda, false);
  const after = solve(lambda, true);
  if (before.saturated || after.saturated) return { saturated: true, rho: after.rho };
  return {
    saturated: false,
    rho: after.rho,
    latency: after.latency,
    delta: after.latency.map((v, i) => v - before.latency[i]),
  };
}

function saturationPoint(patched: boolean) {
  let x = RPS_MIN;
  while (x < 200 && !solve(x / 1000, patched).saturated) x += 0.1;
  return x;
}

export const SATURATION_BEFORE = saturationPoint(false);
export const SATURATION_AFTER = saturationPoint(true);
