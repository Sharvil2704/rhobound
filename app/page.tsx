import Link from "next/link";
import DeliveryLoop from "@/components/DeliveryLoop";
import Intro from "@/components/Intro";
import Mark from "@/components/Mark";
import RevealObserver from "@/components/RevealObserver";
import RhoBound from "@/components/RhoBound";
import Simulator from "@/components/Simulator";
import ThemeToggle from "@/components/ThemeToggle";
import { primaryCta, site, team } from "@/site.config";
import {
  STATUS_LABEL,
  agentFacts,
  amplification,
  boundaries,
  buyers,
  costFacts,
  deliverables,
  faqs,
  integrationGroups,
  marketFacts,
  options,
  path,
  position,
  principles,
  proofStrip,
  reportSample,
  results,
  roadmap,
  steps,
  velocityFacts,
  type Fact,
  type Status,
} from "@/lib/content";

const EVIDENCE_NOTE =
  "Accuracy figures are measured on a live Kubernetes test deployment, on public data from real systems and against independent simulation, and each is labelled. Validation on a customer’s production system is the design-partner milestone.";

const cliSample = `rhobound profile CAPTURE registry/auth:1.1
rhobound predict CAPTURE CAPTURE/profiles/*
rhobound verify  CAPTURE/rhobound/report.json AFTER`;

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
          <a href="#product" className="hide-sm">
            Product
          </a>
          <a href="#proof" className="hide-sm">
            Proof
          </a>
          <a href="#business" className="hide-sm">
            Business
          </a>
          <a href="#roadmap" className="hide-sm">
            Roadmap
          </a>
          {team.length > 0 && (
            <a href="#team" className="hide-sm">
              Team
            </a>
          )}
          <ThemeToggle />
          <a href={primaryCta.href} className="btn btn-small">
            Talk to us
          </a>
        </nav>
      </header>

      <main id="main">
        <section className="hero wrap">
          <div className="hero-grid">
            <h1>Know what a change costs your latency before it ships.</h1>
            <div className="hero-sub">
              <p className="lede">
                Rhobound is the performance gate for software change: security patches, rebuilt base images, dependency
                bumps and code written by agents. It reads your OpenTelemetry traces, profiles the new version in your
                cluster, and predicts latency, SLO impact and capacity at every service before rollout.
              </p>
              <div className="cta-row">
                <a href={primaryCta.href} className="btn">
                  {primaryCta.label}
                </a>
                <a href="#proof" className="btn btn-ghost">
                  See the proof
                </a>
              </div>
            </div>
            <RhoBound />
          </div>
          <p className="hero-hint">Drag the traffic slider. The change stays the same; only the load changes.</p>
          <Simulator />
          <ul className="proof-strip">
            {proofStrip.map((p) => (
              <li key={p.figure}>
                <span className="lvl">{p.level}</span>
                <strong>{p.figure}</strong>
                <span>{p.text}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="problem" className="band wrap">
          <div className="split">
            <div>
              <h2>Change is accelerating. Performance review isn’t.</h2>
              <p>
                Most companies run dozens or hundreds of services on a handful of shared base images. One rebuilt image
                reaches all of them at once.
              </p>
              <p>
                Scanners, AI-assisted discovery and AI-written fixes keep shortening the time from “vulnerability found”
                to “fixed image ready”. Nothing guarantees the fixed image is as fast as the old one: a slower handshake,
                a hardened allocator, an extra bounds check on a hot path.
              </p>
            </div>
            <Facts facts={velocityFacts} />
          </div>

          <div className="amp">
            <div className="amp-text">
              <h3>A small slowdown doesn’t stay small</h3>
              <p>
                Services queue. A slowdown at a busy service is amplified roughly by 1/(1−ρ)², where ρ is how busy it is.
                It also slows services the change never touched, because they wait on the ones it did.
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
            Nobody can answer “if we roll out this change, what happens to our latency and SLOs, service by service, at
            our real traffic?” before rollout, fast enough to keep up with the pace of change.
          </p>
        </section>

        <section id="why-now" className="band wrap">
          <div className="split">
            <div>
              <h2>Agents write the change. Nothing checks what it costs.</h2>
              <p>
                Coding agents are moving from autocomplete to opening pull requests on their own, and the tasks they can
                finish are getting longer every few months. Every one of those changes, security fixes included, reaches
                production through the same shared images and the same busy services.
              </p>
              <p>
                Tests tell an agent whether its code is correct. Nothing tells it what the code costs at production load,
                and correct is not the same as fast. A human load-test cycle per change cannot keep up with machine-speed
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
                Once as incidents: a “harmless” change breaches an SLO in a service nobody thought was involved. And once
                as padding: because nobody can predict what a change costs, teams provision for the worst case they can
                imagine and never revisit it.
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
              at your peak traffic, so it fits inside the loop instead of after it.
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
                <b>A limit, not an opinion.</b> The agent gets a verdict with an error band, and a certified breach when a
                change pushes a service past saturation. That last one is arithmetic, not a forecast.
              </li>
            </ul>
          </div>
          <DeliveryLoop />
          <p className="loop-note">
            <Badge status="available" /> Every verdict above is computed live by Rhobound’s queueing model on a 12-service
            reference system at a 70 req/s peak. <Badge status="roadmap" /> The latency budget returned to the agent, and
            running Rhobound as a CI check and an MCP tool that agents call.
          </p>
        </section>

        <section id="product" className="band wrap">
          <h2>From traces to a verdict in five steps</h2>
          <p className="intro">
            Rhobound sits between “the change builds” and “the change is rolled out”. It needs a few minutes of
            OpenTelemetry traces and no changes to your code.
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
              <span>Hold it, add capacity, or send it back to whoever builds the fix.</span>
            </div>
            <div className="outcome">
              <strong>Low-severity CVE, high cost</strong>
              <span>Defer or mitigate, backed by evidence.</span>
            </div>
          </div>

          <div className="product">
            <div>
              <h3 className="table-title tight">What you get</h3>
              <ul className="questions">
                {deliverables.map((d) => (
                  <li key={d.title}>
                    <div className="q-head">
                      <h3>{d.title}</h3>
                      <Badge status={d.status} />
                    </div>
                    <p>{d.body}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="stack">
              <figure className="report">
                <figcaption>Profile the new image, predict the deploy, verify it afterwards. Runs in your environment</figcaption>
                <pre tabIndex={0}>
                  <code>{cliSample}</code>
                </pre>
              </figure>
              <figure className="report">
                <figcaption>Excerpt of a real report, condensed. A live 10-service Kubernetes deployment</figcaption>
                <pre tabIndex={0}>
                  <code>{reportSample}</code>
                </pre>
              </figure>
            </div>
          </div>

          <ul className="principles">
            {principles.map((p) => (
              <li key={p.title}>
                <b>{p.title}.</b> {p.body}
              </li>
            ))}
          </ul>

          <h3 className="table-title" id="fit">
            Where it fits in your pipeline
          </h3>
          <div className="pipe reveal">
            <span className="pipe-token" aria-hidden="true">
              <span className="pipe-token-in">fixed image</span>
              <span className="pipe-token-ok">✓ safe to ship</span>
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
            The scanner says a service is vulnerable. CI says the change builds. Rhobound says whether it is safe to roll
            out. Observability feeds its traces back into the model.
          </p>
        </section>

        <section id="proof" className="band wrap">
          <h2>Proof</h2>
          <p className="intro">
            Rhobound is tested the way a safety system should be: criteria declared before each run, fresh cases it has
            never seen, and failures published next to the successes. Every number says what it was measured on.
          </p>

          <div className="table-wrap">
            <table className="data proof-table">
              <caption>Headline results</caption>
              <thead>
                <tr>
                  <th scope="col">Measured on</th>
                  <th scope="col">What was tested</th>
                  <th scope="col">Result</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r) => (
                  <tr key={r.test}>
                    <td>
                      <span className={`lvl lvl-${r.level.split(" ")[0].toLowerCase()}`}>{r.level}</span>
                    </td>
                    <th scope="row">{r.test}</th>
                    <td>{r.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="split proof-lower">
            <div className="table-wrap">
              <table className="data num-table">
                <caption>Simulation: the same change at different loads. Added latency at the entry point, ms</caption>
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
              <h3 id="weaker-h">Boundaries we publish</h3>
              <ul>
                {boundaries.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </aside>
          </div>
          <p className="credibility">
            276 automated tests lock the validated results. Every model change is promoted only if it improves a reference
            system and a sweep of random architectures without moving a control architecture, and the criteria are
            declared and recorded before the run. {EVIDENCE_NOTE}
          </p>
        </section>

        <section id="business" className="band wrap">
          <h2>Who buys it, and how it grows</h2>
          <div className="split">
            <ul className="questions">
              {buyers.map((b) => (
                <li key={b.who}>
                  <h3>{b.who}</h3>
                  <p>{b.why}</p>
                </li>
              ))}
            </ul>
            <Facts facts={marketFacts} />
          </div>

          <h3 className="table-title">Where it sits</h3>
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th scope="col">Category</th>
                  <th scope="col">What it answers</th>
                  <th scope="col">What Rhobound adds</th>
                </tr>
              </thead>
              <tbody>
                {position.map((p) => (
                  <tr key={p.tool}>
                    <th scope="row">{p.tool}</th>
                    <td>{p.answers}</td>
                    <td>{p.rhobound}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="table-title">How it grows</h3>
          <ol className="steps steps-3 reveal">
            {path.map((s) => (
              <li key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>

          <h3 className="table-title">What compounds</h3>
          <ul className="ticks ticks-wide">
            <li>A validated, auditable model with a published error record for each kind of architecture.</li>
            <li>An inference engine that rebuilds an architecture from traces alone.</li>
            <li>In-cluster profiling that sees real contention, which an idle benchmark misses.</li>
            <li>A record of predicted against deployed, which every verified change and every design partner adds to.</li>
          </ul>
        </section>

        <section id="integrations" className="band wrap">
          <h2>Reads the standards you already run</h2>
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

        {team.length > 0 && (
          <section id="team" className="band wrap">
            <h2>Team</h2>
            <ul className="team">
              {team.map((m) => (
                <li key={m.name}>
                  <h3>{m.name}</h3>
                  <p className="team-role">{m.role}</p>
                  <p>{m.bio}</p>
                  {m.href && (
                    <a href={m.href} {...ext}>
                      Profile
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

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
              <h2>Backtest your last rollouts with us</h2>
              <p>
                We’ll backtest your last few patch rollouts and incidents and show what Rhobound would have predicted.
                We’re looking for teams running containerized microservices on Kubernetes, with shared base images and
                OpenTelemetry or a service mesh.
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
          <p>{EVIDENCE_NOTE} Third-party figures link to their source.</p>
          <p className="foot-links">
            <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
            <Link href="/privacy">Privacy</Link>
            {site.githubUrl && (
              <a href={site.githubUrl} {...ext}>
                Research log
              </a>
            )}
            <span>
              © {new Date().getFullYear()} {site.legalName || "Rhobound"}
              {site.location ? `, ${site.location}` : ""}
            </span>
          </p>
        </div>
      </footer>
    </>
  );
}
