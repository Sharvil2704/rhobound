// Explainer for the name: utilization ρ on the x-axis, delay rising like 1/(1−ρ)²,
// and the bound where a service saturates. Static in the hero; the same chart is
// animated full-screen by the opening Intro.

const X0 = 40;
const X_BOUND = 364; // ρ = 1
const Y_BASE = 236;
const Y_TOP = 44;
const F_MAX = 120;

const px = (rho: number) => X0 + rho * (X_BOUND - X0);
const py = (f: number) => Y_BASE - ((Math.min(f, F_MAX) - 1) / (F_MAX - 1)) * (Y_BASE - Y_TOP);

const curve = (() => {
  const pts: string[] = [];
  const rhoEnd = 1 - 1 / Math.sqrt(F_MAX);
  for (let i = 0; i <= 80; i++) {
    const rho = (rhoEnd * i) / 80;
    pts.push(`${px(rho).toFixed(1)},${py(1 / (1 - rho) ** 2).toFixed(1)}`);
  }
  return { d: "M" + pts.join(" L"), end: { x: px(rhoEnd), y: Y_TOP } };
})();

export function RhoBoundChart({ titleId }: { titleId: string }) {
  return (
    <svg viewBox="0 0 420 272" className="rb-svg" role="img" aria-labelledby={titleId}>
      <title id={titleId}>
        Delay against utilization ρ. The curve stays flat at low load, then climbs steeply toward a vertical line at ρ
        equal to 1, the bound where a service saturates.
      </title>
      <rect className="rb-beyond" x={X_BOUND} y={Y_TOP - 10} width={420 - X_BOUND - 8} height={Y_BASE - Y_TOP + 10} />
      <g className="rb-axes">
        <line x1={X0} y1={Y_BASE} x2={404} y2={Y_BASE} />
        <line x1={X0} y1={Y_BASE} x2={X0} y2={Y_TOP - 10} />
        <text x={X0} y={Y_BASE + 20} textAnchor="middle">
          0
        </text>
        <text x={X0 - 10} y={Y_TOP} textAnchor="end" className="rb-ylab">
          delay
        </text>
      </g>
      <path className="rb-curve" d={curve.d} pathLength={1} />
      <circle className="rb-dot" cx={curve.end.x} cy={curve.end.y} r={5} />
      <g className="rb-rho">
        <text x={px(0.55)} y={Y_BASE + 24} textAnchor="middle" className="rb-glyph">
          ρ
        </text>
        <text x={px(0.55) + 14} y={Y_BASE + 23} className="rb-note">
          utilization
        </text>
      </g>
      <g className="rb-bound">
        <line className="rb-bound-line" x1={X_BOUND} y1={Y_BASE} x2={X_BOUND} y2={Y_TOP - 12} />
        <text x={X_BOUND} y={Y_BASE + 20} textAnchor="middle">
          1
        </text>
        <text x={X_BOUND} y={Y_TOP - 20} textAnchor="middle" className="rb-bound-label">
          bound
        </text>
      </g>
    </svg>
  );
}

export default function RhoBound() {
  return (
    <figure className="rb" aria-labelledby="rb-cap">
      <RhoBoundChart titleId="rb-title" />
      <figcaption id="rb-cap">
        <dl className="rb-key">
          <div className="rb-k1">
            <dt>ρ</dt>
            <dd>How busy a service is. Delay grows like 1/(1−ρ)², so the last few percent cost the most.</dd>
          </div>
          <div className="rb-k2">
            <dt>bound</dt>
            <dd>The traffic at which a change pushes a service past saturation. The one hard guarantee.</dd>
          </div>
        </dl>
        <p className="rb-word">
          <span aria-hidden="true">
            <span className="rb-slot">
              <span className="rb-sym">ρ</span>
              <span className="rb-txt">rho</span>
            </span>
            <span className="rb-plus">{" + "}</span>
            bound
          </span>
          <span className="sr-only">rhobound</span>
        </p>
      </figcaption>
    </figure>
  );
}
