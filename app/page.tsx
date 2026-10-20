import Link from "next/link";
import DeliveryLoop from "@/components/DeliveryLoop";
import GithubIcon from "@/components/GithubIcon";
import Intro from "@/components/Intro";
import Mark from "@/components/Mark";
import RevealObserver from "@/components/RevealObserver";
import RhoBound from "@/components/RhoBound";
import Simulator from "@/components/Simulator";
import ThemeToggle from "@/components/ThemeToggle";
import { primaryCta, site, team } from "@/site.config";
import {
  STATUS_LABEL,
  amplification,
  boundaries,
  buyers,
  deliverables,
  faqs,
  integrationGroups,
  keyResults,
  marketFacts,
  path,
  pillars,
  position,
  principles,
  proofStrip,
  reportSample,
  results,
  roadmap,
  steps,
  type Fact,
  type Status,
} from "@/lib/content";

const EVIDENCE_NOTE =
  "Accuracy figures are measured on benchmark applications on a Kubernetes test cluster, on public data from real systems and against independent simulation, and each is labelled. Validation on a customer’s production system is the design-partner milestone.";

const cliSample = `rhobound profile CAPTURE registry/auth:1.1
rhobound predict CAPTURE CAPTURE/profiles/*
rhobound verify  CAPTURE/rhobound/report.json AFTER`;

const ossSample = `go install github.com/Sharvil2704/rhobound-cli/cmd/rhobound@latest

rhobound predict ./capture --patch checkout=+3ms`;

const investorHref = `mailto:${site.contactEmail}?subject=${encodeURIComponent("Rhobound: investor conversation")}`;

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
            Opportunity
          </a>
          <a href="#roadmap" className="hide-sm">
            Roadmap
          </a>
          {team.length > 0 && (
            <a href="#team" className="hide-sm">
              Team
            </a>
          )}
          <Link href="/cli" className="hide-sm">
            Open source
          </Link>
          <a href={site.cliRepoUrl} className="icon-link" aria-label="rhobound-cli on GitHub" {...ext}>
            <GithubIcon />
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
            <h1>Know what a change costs your latency before it ships.</h1>
            <div className="hero-sub">
              <p className="lede">
                Every change that reaches production, whether a security patch, a rebuilt image or a pull request written
                by an agent, can slow services nobody looked at. Rhobound is the performance gate that tells you before
                rollout: which services slow down, which SLOs break, and how much headroom you lose.
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
          <h2>Software change is accelerating. Nobody checks what it costs.</h2>
          <div className="pillars">
            {pillars.map((p) => (
              <div key={p.title} className="pillar">
                <h3>{p.title}</h3>
                <p>{p.line}</p>
                <Facts facts={p.facts} />
              </div>
            ))}
          </div>

          <div className="amp">
            <div className="amp-text">
              <h3>A small slowdown doesn’t stay small</h3>
              <p>
                Services queue. A slowdown at a busy service is amplified roughly by 1/(1−ρ)², where ρ is how busy it is,
                and it spreads to services the change never touched.
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
          <p className="pull">
            When code is written at machine speed, testing and performance limits have to be checked at machine speed
            too. DORA’s 2025 research already found that AI adoption is{" "}
            <a href="https://redmonk.com/rstephens/2025/12/18/dora2025/" {...ext}>
              associated with increasing delivery instability
            </a>
            .
          </p>
        </section>

        <section id="agents" className="band wrap">
          <h2>The gate every change passes through</h2>
          <div className="loop-intro">
            <p className="intro">
              In an agentic workflow the agent writes the change, opens the pull request and waits for checks. Tests catch
              wrong code. Rhobound catches slow code, at your peak traffic, before it merges.
            </p>
            <ul className="loop-why">
              <li>
                <b>Scale.</b> Agents open changes around the clock. A human performance review per change does not scale.
              </li>
              <li>
                <b>Correct is not fast.</b> Tests go green on code that slows a busy service.
              </li>
              <li>
                <b>A limit, not an opinion.</b> A verdict with an error band, and a certified breach when a change pushes
                a service past saturation. That last one is arithmetic, not a forecast.
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
          <h2>The performance gate, from traces to a verdict</h2>
          <p className="intro">
            It sits between “the change builds” and “the change is rolled out”, needs a few minutes of OpenTelemetry
            traces, and asks for no changes to your code.
          </p>
          <ol className="steps reveal">
            {steps.map((s) => (
              <li key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>

          <div className="product">
            <div>
              <h3 className="table-title tight">What every change gets</h3>
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
                <figcaption>Excerpt of a real report, condensed. A 10-service Kubernetes benchmark</figcaption>
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
        </section>

        <section id="proof" className="band wrap">
          <h2>Built to be audited</h2>
          <p className="intro">
            Criteria are declared before each run, tested on fresh cases, and the failures are published next to the
            successes. Every number says what it was measured on.
          </p>

          <ul className="proof-strip proof-4">
            {keyResults.map((p) => (
              <li key={p.figure}>
                <span className="lvl lvl-kubernetes">{p.level}</span>
                <strong>{p.figure}</strong>
                <span>{p.text}</span>
              </li>
            ))}
          </ul>

          <aside className="weaker proof-bounds" aria-labelledby="weaker-h">
            <h3 id="weaker-h">Boundaries we publish</h3>
            <ul>
              {boundaries.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </aside>

          <details className="more">
            <summary>See every result, by what it was measured on</summary>
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
          </details>
          <p className="credibility">
            396 automated tests lock the validated results. {EVIDENCE_NOTE}
          </p>
        </section>

        <section id="open-source" className="band wrap">
          <div className="oss">
            <div>
              <h2>Open source: rhobound-cli</h2>
              <p>
                Our open-source command-line tool. It reads OpenTelemetry traces, infers your service graph and predicts
                mean latency before and after a change, using the queueing-theory approach behind Rhobound. One static Go
                binary, Apache-2.0.
              </p>
              <div className="cta-row">
                <a href={site.cliRepoUrl} className="btn gh-btn" {...ext}>
                  <GithubIcon size={18} />
                  View on GitHub
                </a>
                <Link href="/cli" className="btn btn-ghost">
                  Learn more
                </Link>
              </div>
            </div>
            <figure className="report wrap-lines">
              <figcaption>rhobound-cli, from the public repository</figcaption>
              <pre tabIndex={0}>
                <code>{ossSample}</code>
              </pre>
            </figure>
          </div>
        </section>

        <section id="business" className="band wrap">
          <h2>A missing gate in every delivery pipeline</h2>
          <p className="intro">
            Tests and security scans are standard gates in the pipeline. Performance is the missing one, and agents
            writing code at machine speed make it urgent. Rhobound is built to be that gate.
          </p>
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

          <h3 className="table-title">Why today’s tools don’t close it</h3>
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

          <h3 className="table-title">How we grow</h3>
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
            <li>In-cluster profiling that replays your own traffic, which sees the contention and CPU limits an idle benchmark misses.</li>
            <li>A per-cluster history: every verified deploy calibrates the next prediction and sets its error range, and every design partner adds to the record.</li>
          </ul>
        </section>

        <section id="roadmap" className="band wrap">
          <h2>Where this goes</h2>
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
          <details className="more">
            <summary>Integrations and their status</summary>
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
            <p className="intro-note">Status refers to Rhobound’s integration, not to the project itself.</p>
          </details>
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
              <h2>Become a design partner</h2>
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
              <a href={investorHref} className="plain-link">
                For investors: start a conversation
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
            <Link href="/cli">rhobound-cli</Link>
            <a href={site.cliRepoUrl} className="foot-gh" aria-label="rhobound-cli on GitHub" {...ext}>
              <GithubIcon size={16} />
              GitHub
            </a>
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
