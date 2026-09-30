import Link from "next/link";
import DeliveryLoop from "@/components/DeliveryLoop";
import Intro from "@/components/Intro";
import Mark from "@/components/Mark";
import RevealObserver from "@/components/RevealObserver";
import RhoBound from "@/components/RhoBound";
import Simulator from "@/components/Simulator";
import ThemeToggle from "@/components/ThemeToggle";
import { primaryCta, site } from "@/site.config";
import {
  STATUS_LABEL,
  agentFacts,
  amplification,
  costFacts,
  faqs,
  integrationGroups,
  options,
  questions,
  results,
  roadmap,
  steps,
  velocityFacts,
  weaker,
  type Fact,
  type Status,
} from "@/lib/content";

const SIM_NOTE = "Measured against discrete-event simulation. Production validation is in progress with design partners.";

function Badge({ status }: { status: Status }) {
  return <span className={`badge badge-${status}`}>{STATUS_LABEL[status]}</span>;
}

function Facts({ facts }: { facts: Fact[] }) {
  return (
    <dl className="facts">
      {facts.map((f) => (
        <div key={f.figure} className="fact">
          <dt>{f.figure}</dt>
          <dd>
            {f.text}{" "}
            <a href={f.href} target="_blank" rel="noopener noreferrer" className="cite">
              {f.source}
            </a>
          </dd>
        </div>
      ))}
    </dl>
  );
}

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;


export default function Home() {
  return (
    <>
      <Intro />
      <a href="#main" className="skip">
        Skip to content
      </a>
      <header className="top wrap">
        <a href="#" className="brand" aria-label="Rhobound home">
          <Mark />
          <span>rhobound</span>
        </a>
        <nav aria-label="Primary">
          <a href="#problem" className="hide-sm">
            Problem
          </a>
          <a href="#why-now" className="hide-sm">
            Agents
          </a>
          <a href="#how" className="hide-sm">
            How it works
          </a>
          <a href="#evidence" className="hide-sm">
            Evidence
          </a>
          <a href="#roadmap" className="hide-sm">
            Roadmap
          </a>
          <ThemeToggle />
          <a href={primaryCta.href} className="btn btn-small">
            Talk to us
          </a>
        </nav>
      </header>

      <main id="main">
        <section className="hero wrap">
          <div className="hero-grid">
          <h1>
            Know what a security patch costs your latency before you ship it.
          </h1>
          <div className="hero-sub">
            <p className="lede">
              A patched OpenSSL or a rebuilt distroless base adds a few milliseconds in a benchmark. Rhobound predicts what
              those milliseconds become across your microservices at real traffic: which services slow down, which SLOs
              break, and how much headroom you lose.
            </p>
            <div className="cta-row">
              <a href={primaryCta.href} className="btn">
                {primaryCta.label}
              </a>
              <a href="#evidence" className="btn btn-ghost">
                See the evidence
              </a>
            </div>
          </div>
          <RhoBound />
          </div>
          <p className="hero-hint">Drag the traffic slider. The patch stays the same; only the load changes.</p>
          <Simulator />
        </section>

        <section id="problem" className="band wrap">
          <div className="split">
            <div>
              <h2>Patches now arrive faster than anyone can load-test them</h2>
              <p>
                Most companies run dozens or hundreds of services on a handful of shared base images. When a
                vulnerability lands in OpenSSL, glibc or a language runtime, one rebuilt image reaches all of them at once.
              </p>
              <p>
                Scanners, AI-assisted discovery and AI-written fixes have shortened the time from “vulnerability found” to
                “fixed image ready”. Nothing guarantees the fixed image is as fast as the old one: a slower handshake, a
                hardened allocator, an extra bounds check on a hot path.
              </p>
            </div>
            <Facts facts={velocityFacts} />
          </div>

          <div className="amp">
            <div className="amp-text">
              <h3>A small slowdown doesn’t stay small</h3>
              <p>
                Services queue. A slowdown at a busy service is amplified roughly by 1/(1−ρ)², where ρ is how busy it is.
                It also slows services the patch never touched, because they wait on the ones it did.
              </p>
            </div>
            <ol className="amp-scale reveal" aria-label="Amplification factor by utilization">
              {[
                ["50%", "×4"],
                ["70%", "×11"],
                ["80%", "×25"],
                ["90%", "×100"],
              ].map(([rho, f], i) => (
                <li key={rho} style={{ ["--i" as string]: i }}>
                  <span className="amp-f">{f}</span>
                  <span className="amp-rho">at {rho} busy</span>
                </li>
              ))}
            </ol>
          </div>

          <h3 className="table-title">Every option available today is a bad trade</h3>
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th scope="col">Option</th>
                  <th scope="col">What goes wrong</th>
                </tr>
              </thead>
              <tbody>
                {options.map((o) => (
                  <tr key={o.option}>
                    <th scope="row">{o.option}</th>
                    <td>{o.problem}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="pull">
            Nobody can answer “if we roll out this fixed image, what happens to our latency and SLOs, service by service, at
            our real traffic?” before rollout, fast enough to keep up with security fixes.
          </p>
        </section>

        <section id="why-now" className="band wrap">
          <div className="split">
            <div>
              <h2>Agents now write code faster than anyone can performance-test it</h2>
              <p>
                Coding agents are moving from autocomplete to opening pull requests on their own, and the tasks they can
                finish are getting longer every few months. Every one of those changes, security fixes included, reaches
                production through the same shared images and the same busy services.
              </p>
              <p>
                Tests tell an agent whether its code is correct. Nothing tells it what the code costs at production load, and
                correct is not the same as fast. A human load-test cycle per change cannot keep up with machine-speed
                changes.
              </p>
              <p className="pull pull-tight">
                When code is written at machine speed, testing and performance limits have to be checked at machine speed
                too.
              </p>
              <p>
                <a href="#agents">See how Rhobound fits inside the agent loop</a>
              </p>
            </div>
            <Facts facts={agentFacts} />
          </div>
        </section>

        <section id="cost" className="band wrap">
          <div className="split">
            <div>
              <h2>Guessing wrong costs twice</h2>
              <p>
                Once as incidents: a “harmless” patch breaches an SLO in a service nobody thought was involved. And once as
                padding: because nobody can predict what a change costs, teams provision for the worst case they can imagine
                and never revisit it.
              </p>
              <p>
                DORA’s 2025 research found that AI adoption is{" "}
                <a href="https://redmonk.com/rstephens/2025/12/18/dora2025/" {...ext}>
                  associated with increasing software delivery instability
                </a>
                . Machine-speed changes need a machine-speed check.
              </p>
              <p className="pull pull-tight">Overprovisioning is what a team does when it has no model.</p>
            </div>
            <Facts facts={costFacts} />
          </div>
        </section>

        <section id="agents" className="band wrap">
          <h2>The delivery loop agents need: fast, with a hard limit in it</h2>
          <div className="loop-intro">
            <p className="intro">
              In an agentic workflow, the agent writes the change, opens the pull request and waits for checks. Tests
              catch wrong code. Rhobound is the check that catches slow code: it predicts what the change does to latency
              at your peak traffic and answers in milliseconds, so it fits inside the loop instead of after it.
            </p>
            <ul className="loop-why">
              <li>
                <b>Volume.</b> Agents open changes around the clock. A human performance review per change does not scale.
              </li>
              <li>
                <b>Correct is not fast.</b> Tests go green on code that slows a busy service, and queueing multiplies that
                slowdown only at production load.
              </li>
              <li>
                <b>A limit, not an opinion.</b> The agent gets a verdict, a budget in milliseconds to optimize against, and
                a certified breach when a change pushes a service past saturation. That last one is arithmetic, not a
                forecast.
              </li>
            </ul>
          </div>
          <DeliveryLoop />
          <p className="loop-note">
            <Badge status="available" /> The verdicts above are computed live by the queueing model on the 12-service
            reference system at a 70 req/s peak. <Badge status="roadmap" /> Running it as a CI check and an MCP tool that agents call.
          </p>
        </section>

        <section id="how" className="band wrap">
          <h2>How it works</h2>
          <p className="intro">
            Rhobound sits between “the fix builds” and “the fix is rolled out”. It needs a small A/B benchmark of the changed
            code, not a full load test, and it builds its model from telemetry you already collect.
          </p>
          <ol className="steps reveal">
            {steps.map((s) => (
              <li key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
          <div className="outcomes">
            <div className="outcome is-ok">
              <strong>Safe</strong>
              <span>Roll out now, with evidence.</span>
            </div>
            <div className="outcome is-bad">
              <strong>Breaks an SLO</strong>
              <span>Hand a latency budget back to the fixer, or add capacity first.</span>
            </div>
            <div className="outcome">
              <strong>Low-severity CVE, high cost</strong>
              <span>Defer or mitigate, backed by reachability evidence.</span>
            </div>
          </div>

          <h3 className="table-title" id="fit">
            Where it fits in your pipeline
          </h3>
          <div className="pipe reveal">
            <span className="pipe-token" aria-hidden="true">
              <span className="pipe-token-in">fixed image</span>
              <span className="pipe-token-ok">✓ within budget</span>
            </span>
          <ol className="pipeline" aria-label="Delivery pipeline">
            <li>
              <b>Scanners</b>
              <span>Trivy, Grype, OSV</span>
            </li>
            <li>
              <b>Patch or rebuild</b>
              <span>Copacetic, Renovate, agents</span>
            </li>
            <li>
              <b>CI build and tests</b>
              <span>GitHub Actions, GitLab</span>
            </li>
            <li className="is-us">
              <b>Rhobound</b>
              <span>Predict impact before rollout</span>
            </li>
            <li>
              <b>Progressive delivery</b>
              <span>Argo Rollouts, Flagger</span>
            </li>
            <li>
              <b>Observability</b>
              <span>Prometheus, OpenTelemetry</span>
            </li>
          </ol>
          </div>
          <p className="pipeline-note">
            The scanner says a service is vulnerable. CI says the fix builds. Rhobound says whether the fix is safe to roll
            out, and how much slowdown you can afford. Observability feeds its telemetry back into the model.
          </p>
        </section>

        <section id="product" className="band wrap">
          <h2>Five questions, answered before rollout</h2>
          <div className="product">
            <ul className="questions">
              {questions.map((q) => (
                <li key={q.q}>
                  <div className="q-head">
                    <h3>{q.q}</h3>
                    <Badge status={q.status} />
                  </div>
                  <p>{q.a}</p>
                </li>
              ))}
            </ul>
            <figure className="report">
              <figcaption>Report output, from the committed synthetic dataset</figcaption>
              <pre tabIndex={0}>
                <code>{`THE CHANGE
  rebuild base-debian12:2026.08.1 -> 2026.09.1
  tls      libssl3 3.0.13 -> 3.0.15:  +2.978 ms/call (+/- 0.042)
  syscall  libc6 2.36-9+deb12u7 -> +deb12u9: +0.500 ms/call (+/- 0.005)
  directly slowed (SBOM says rebuilt AND eBPF says the path is called):
    auth      +3.492 ms/request   payments  +4.951 ms/request
  rebuilt with a bumped library it never calls (a CVE scanner flags these):
    ingress, shard-c, db-proxy2   <- not slowed at all

PREDICTION at 55.4 rps
  service   L before    dL     5%     95%    rho        SLO  status
  ingress     41.45   +14.32  14.05  14.52   0.09->0.09  65  ok
  auth         9.32    +7.16   6.97   7.34   0.22->0.37  15  `}<mark>BREACH</mark>{`
saturation: 139.3 rps before, 114.1 rps after (-18.1% headroom)`}</code>
              </pre>
            </figure>
          </div>
          <ul className="principles">
            <li>
              <b>Deterministic and explainable.</b> Closed-form queueing mathematics, not a black box. Same inputs, same
              answer.
            </li>
            <li>
              <b>Fast.</b> Milliseconds per prediction on the default path.
            </li>
            <li>
              <b>Refuses instead of guessing.</b> Contradictory data or inputs outside the validated range return a reason,
              not a number.
            </li>
            <li>
              <b>Every input has a source.</b> Each field of the recovered architecture records where it came from.
            </li>
          </ul>
        </section>

        <section id="evidence" className="band wrap">
          <h2>Evidence so far</h2>
          <p className="intro">
            Every result below is against a discrete-event simulator of each architecture that shares none of the model’s
            equations. No production data has been used yet. We publish where the model fails next to where it works.
          </p>

          <div className="split split-wide">
            <div className="table-wrap">
              <table className="data">
                <caption>Headline results, simulation</caption>
                <thead>
                  <tr>
                    <th scope="col">What was tested</th>
                    <th scope="col">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r) => (
                    <tr key={r.test}>
                      <th scope="row">{r.test}</th>
                      <td>{r.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <div className="table-wrap">
                <table className="data num-table">
                  <caption>Same patch, same code, different load. Added latency at the entry point, ms</caption>
                  <thead>
                    <tr>
                      <th scope="col">req/s</th>
                      <th scope="col">Busiest ρ</th>
                      <th scope="col">Naive</th>
                      <th scope="col">Rhobound</th>
                      <th scope="col">Simulated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {amplification.map((a) => (
                      <tr key={a.rps}>
                        <td>{a.rps}</td>
                        <td>{a.rho}</td>
                        <td className="dim">6.25</td>
                        <td className="strong">{a.predicted}</td>
                        <td>{a.simulated}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <aside className="weaker" aria-labelledby="weaker-h">
                <h3 id="weaker-h">Where it is weaker</h3>
                <ul>
                  {weaker.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
          <p className="credibility">
            231 automated tests lock validated results. A 25-section research log records every experiment, including
            rejected ideas. A model change is promoted only if it improves the reference system and a sweep of random
            architectures without moving a control architecture.
          </p>
        </section>

        <section id="integrations" className="band wrap">
          <h2>Built on the open standards you already run</h2>
          <p className="intro">Status refers to Rhobound’s integration, not to the project itself.</p>
          <div className="integrations">
            {integrationGroups.map((g) => (
              <div key={g.name} className="int-group">
                <h3>{g.name}</h3>
                <ul>
                  {g.items.map((it) => (
                    <li key={it.name}>
                      <div>
                        <b>{it.name}</b>
                        <span>{it.role}</span>
                      </div>
                      <Badge status={it.status} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="roadmap" className="band wrap">
          <h2>Roadmap</h2>
          <ol className="roadmap">
            {roadmap.map((r) => (
              <li key={r.phase}>
                <p className="phase">{r.phase}</p>
                <h3>{r.title}</h3>
                <ul>
                  {r.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <section id="faq" className="band wrap">
          <h2>Questions</h2>
          <div className="faq">
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="partner" className="band wrap">
          <div className="partner">
            <div>
              <h2>Help us validate on your real rollouts</h2>
              <p>
                We’ll backtest your last few patch rollouts and incidents, and show what Rhobound would have predicted. We’re
                looking for teams running containerized microservices on Kubernetes, with shared distroless or distro base
                images and OpenTelemetry or a service mesh.
              </p>
            </div>
            <div className="partner-cta">
              <a href={primaryCta.href} className="btn">
                {primaryCta.label}
              </a>
              <a href={`mailto:${site.contactEmail}`} className="plain-link">
                {site.contactEmail}
              </a>
            </div>
          </div>
        </section>
      </main>

      <RevealObserver />
      <footer className="wrap">
        <div className="foot">
        <div className="brand brand-foot">
          <Mark />
          <span>rhobound</span>
        </div>
        <p>{SIM_NOTE} Figures from third parties are linked to their source.</p>
        <p className="foot-links">
          <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
          <Link href="/privacy">Privacy</Link>
          {site.githubUrl && (
            <a href={site.githubUrl} {...ext}>
              Research log
            </a>
          )}
          <span>© {new Date().getFullYear()} Rhobound</span>
        </p>
        </div>
      </footer>
    </>
  );
}
