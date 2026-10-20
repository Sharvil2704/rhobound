import type { Metadata } from "next";
import Link from "next/link";
import GithubIcon from "@/components/GithubIcon";
import Mark from "@/components/Mark";
import RevealObserver from "@/components/RevealObserver";
import ThemeToggle from "@/components/ThemeToggle";
import { site } from "@/site.config";

const repo = site.cliRepoUrl;
const blob = (f: string) => `${repo}/blob/main/${f}`;
const installCmd = "go install github.com/Sharvil2704/rhobound-cli/cmd/rhobound@latest";
const description =
  "rhobound-cli is an open-source command-line tool that reads OpenTelemetry traces, rebuilds your service graph and predicts the mean latency of every service, before and after a change. One static Go binary, Apache-2.0.";

export const metadata: Metadata = {
  title: "rhobound-cli: predict latency from OpenTelemetry traces | open source",
  description,
  alternates: { canonical: "/cli" },
  openGraph: {
    title: "rhobound-cli",
    description: "Predict what a change does to latency, from the traces you already collect. Open source, Apache-2.0.",
    type: "website",
    url: `${site.url}/cli`,
  },
  twitter: { card: "summary", title: "rhobound-cli", description: "Predict what a change does to latency, from your traces. Open source." },
};

const ldJson = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  name: "rhobound-cli",
  description,
  codeRepositoryUrl: repo,
  programmingLanguage: "Go",
  license: "https://www.apache.org/licenses/LICENSE-2.0",
  url: `${site.url}/cli`,
  author: { "@type": "Organization", name: site.name, url: site.url },
};

const chips = ["Apache-2.0", "Go 1.23+", "Single static binary", "Standard library only", "OpenTelemetry in"];

const features = [
  {
    title: "Reads the traces you already collect",
    body: "Point it at OTLP/JSON files from the OpenTelemetry Collector’s file exporter, plain or gzipped. It reads only ids, kinds, times and a few resource attributes.",
  },
  {
    title: "Rebuilds your architecture",
    body: "Which service calls which, how often, and whether calls run in turn, in parallel or in stages. For every pod it reads the worker count and the service time without the wait.",
  },
  {
    title: "Models each service as a queue",
    body: "M/G/c queues with Erlang C and the Allen-Cunneen correction. Arrival burstiness is carried through the graph, and parallel calls take the expected maximum of correlated branches.",
  },
  {
    title: "Answers what-if questions",
    body: "Say that checkout does 3 ms more work, or 10% more, and see the effect on every service above it, including the extra waiting a busier service causes.",
  },
  {
    title: "Refuses instead of guessing",
    body: "When the data or the load is outside what it can model, it stops and says why, rather than printing a number that looks right.",
  },
  {
    title: "Yours to script and extend",
    body: "Machine-readable output with --json, the inferred graph as plain topology JSON, and a model command to evaluate a topology you write or edit at any request rate.",
  },
];

const commands = [
  { cmd: "rhobound predict CAPTURE [--patch svc=+3ms,...]", what: "Infer the call graph from traces and predict the mean latency, before and after a change." },
  { cmd: "rhobound infer CAPTURE", what: "Print the inferred call graph as topology JSON." },
  { cmd: "rhobound model TOPOLOGY.json --rps N", what: "Evaluate a topology you wrote or edited, at N requests per second." },
  { cmd: "rhobound version", what: "Print the version." },
];

const steps = [
  { title: "Read", body: "The trace files are read in parallel, keeping only ids, kinds, times and a few resource attributes." },
  { title: "Infer the graph", body: "Calls, their frequency and their order. Health probes are dropped, and calls sent after the response stay off the latency path." },
  { title: "Rebuild each pod’s queue", body: "First come, first served, from the spans, to read the worker count and the service time without the wait." },
  { title: "Model", body: "Every service becomes an M/G/c queue, with arrival variability carried through the graph." },
  { title: "Predict the change", body: "Apply +N ms or +N% to a service, solve again, and read the new latency of every service above it." },
];

const measured = [
  {
    figure: "2.0%",
    text: "Median error on entry latency across 288 simulated scenarios at 70% to 80% utilization.",
  },
  {
    figure: "46.15 ms",
    text: "Predicted entry latency on a Kubernetes (kind) demo, against 46.10 ms measured.",
  },
  {
    figure: "−0.8% to +1.4%",
    text: "Entry latency against the traces, on five captures of real Python services at 55% to 57% utilization.",
  },
];

const docs = [
  { name: "USAGE", file: "docs/USAGE.md", what: "The command line step by step: capture, infer, predict, model, flags and exit codes." },
  { name: "REQUIREMENTS", file: "docs/REQUIREMENTS.md", what: "What the traces must contain, how much data, and an example Collector configuration." },
  { name: "DEMO", file: "docs/DEMO.md", what: "What a result looks like: the example capture line by line, and the Kubernetes demo." },
  { name: "BUILD", file: "docs/BUILD.md", what: "Building, cross-compiling, installing and running the tests." },
  { name: "ACCURACY", file: "docs/ACCURACY.md", what: "The full accuracy study: method, tables and results." },
  { name: "VALIDATION", file: "docs/VALIDATION.md", what: "Every check that has been run." },
];

const sample = `$ rhobound predict testdata/capture-chain --patch b=+6ms

capture   testdata/capture-chain
window    120 s, 3099 entry requests (25.8 /s), 15495 spans
busiest   c at 26% utilization

  service   own ms   model ms   seen ms   err %   after ms   change ms   change %
      a *     7.83      45.22     43.74    +3.4      52.37       +7.15      +15.8
        b    19.94      35.40     35.91    -1.4      42.56       +7.15      +20.2
        c     9.98      13.75     14.06    -2.2      13.71       -0.04       -0.3

change applied: b +6 ms        * entry service`;

const installSample = `# install
${installCmd}

# or build from source
git clone ${repo}.git
cd rhobound-cli && go build -o bin/rhobound ./cmd/rhobound

# try the example capture that ships in the repository
rhobound predict testdata/capture-chain --patch b=+6ms`;

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function CliPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }} />
      <a href="#main" className="skip">
        Skip to content
      </a>
      <header className="top wrap">
        <Link href="/cli" className="brand" aria-label="rhobound-cli home">
          <Mark />
          <span>
            rhobound<span className="brand-cli">-cli</span>
          </span>
        </Link>
        <nav aria-label="Primary">
          <a href="#install" className="hide-sm">
            Install
          </a>
          <a href="#how" className="hide-sm">
            How it works
          </a>
          <a href="#docs" className="hide-sm">
            Docs
          </a>
          <Link href="/" className="hide-sm">
            Rhobound
          </Link>
          <a href={repo} className="icon-link" aria-label="rhobound-cli on GitHub" {...ext}>
            <GithubIcon />
          </a>
          <ThemeToggle />
        </nav>
      </header>

      <main id="main">
        <section className="hero wrap cli-hero">
          <h1>Predict what a change does to latency, from the traces you already collect.</h1>
          <p className="lede">
            rhobound-cli reads OpenTelemetry traces, rebuilds your service graph and predicts the mean latency of every
            service, before and after a change. One static Go binary, open source under Apache-2.0.
          </p>
          <div className="cta-row">
            <a href={repo} className="btn gh-btn" {...ext}>
              <GithubIcon size={18} />
              View on GitHub
            </a>
            <a href="#install" className="btn btn-ghost">
              Install
            </a>
          </div>
          <ul className="chips" aria-label="At a glance">
            {chips.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <figure className="report cli-terminal">
            <figcaption>The example capture in the repository: +6 ms of work in b, and what it does to every service</figcaption>
            <pre tabIndex={0}>
              <code>{sample}</code>
            </pre>
          </figure>
          <p className="cli-after">
            +6 ms of work in <code>b</code> makes the entry service 7.15 ms slower, because <code>b</code> also queues more.
            That extra waiting is what a model of the whole graph captures and a per-service benchmark doesn’t.
          </p>
        </section>

        <section id="what" className="band wrap">
          <h2>What it does</h2>
          <div className="cards">
            {features.map((f) => (
              <div key={f.title} className="card">
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="install" className="band wrap">
          <h2>Install and run</h2>
          <div className="split split-wide">
            <figure className="report wrap-lines">
              <figcaption>You need Go 1.23 or later</figcaption>
              <pre tabIndex={0}>
                <code>{installSample}</code>
              </pre>
            </figure>
            <div>
              <h3 className="table-title tight">Commands</h3>
              <ul className="questions">
                {commands.map((c) => (
                  <li key={c.cmd}>
                    <code className="cmd">{c.cmd}</code>
                    <p>{c.what}</p>
                  </li>
                ))}
              </ul>
              <p className="cli-note">
                Common flags: <code>--workers</code>, <code>--kept-share</code>, <code>--max-rho</code>, <code>--plain</code>,{" "}
                <code>--json</code>, <code>--out</code>. Every flag is in{" "}
                <a href={blob("docs/USAGE.md")} {...ext}>
                  USAGE.md
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section id="inputs" className="band wrap">
          <h2>What you give it</h2>
          <p className="intro">Traces, and nothing else. No metrics, no logs, no access to your cluster.</p>
          <ul className="ticks ticks-wide">
            <li>SERVER spans, and CLIENT spans for outgoing calls, with W3C trace context across services.</li>
            <li>
              <code>service.name</code> and <code>k8s.pod.name</code> (or <code>service.instance.id</code>) on each span’s
              resource.
            </li>
            <li>
              Every request, or a known head-sampling share with <code>--kept-share</code>.
            </li>
            <li>One steady window of at least 100 entry requests. A few minutes at 20 or more requests per second is a good start.</li>
            <li>OTLP/JSON files in <code>CAPTURE/traces/</code>, as the Collector’s file exporter writes them.</li>
          </ul>
          <p className="cli-note">
            <a href={blob("docs/REQUIREMENTS.md")} {...ext}>
              REQUIREMENTS.md
            </a>{" "}
            has an example Collector configuration.
          </p>
        </section>

        <section id="how" className="band wrap">
          <h2>How it works</h2>
          <ol className="steps reveal">
            {steps.map((s) => (
              <li key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="measured" className="band wrap">
          <h2>Measured</h2>
          <ul className="proof-strip">
            {measured.map((m) => (
              <li key={m.figure}>
                <strong>{m.figure}</strong>
                <span>{m.text}</span>
              </li>
            ))}
          </ul>
          <p className="cli-note">
            Measured on simulated systems, a Kubernetes demo and real Python services. Method and every table are in{" "}
            <a href={blob("docs/ACCURACY.md")} {...ext}>
              ACCURACY.md
            </a>
            .
          </p>
        </section>

        <section id="docs" className="band wrap">
          <h2>Documentation</h2>
          <div className="cards cards-docs">
            {docs.map((d) => (
              <a key={d.name} href={blob(d.file)} className="card card-link" {...ext}>
                <h3>{d.name}</h3>
                <p>{d.what}</p>
              </a>
            ))}
          </div>
        </section>

        <section id="license" className="band wrap">
          <div className="partner">
            <div>
              <h2>Open source, Apache-2.0</h2>
              <p>
                Free to use, modify and distribute, commercially included, under the Apache License 2.0. It has no
                third-party code: the Go standard library is its only dependency. See{" "}
                <a href={blob("LICENSE")} {...ext}>
                  LICENSE
                </a>{" "}
                and{" "}
                <a href={blob("NOTICE")} {...ext}>
                  NOTICE
                </a>
                .
              </p>
            </div>
            <div className="partner-cta">
              <a href={repo} className="btn gh-btn" {...ext}>
                <GithubIcon size={18} />
                View on GitHub
              </a>
              <a href={`${repo}/issues`} className="plain-link" {...ext}>
                Open an issue
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
            <span>
              rhobound<span className="brand-cli">-cli</span>
            </span>
          </div>
          <p>
            rhobound-cli is open source under the Apache License 2.0. It comes from{" "}
            <Link href="/">Rhobound</Link>.
          </p>
          <p className="foot-links">
            <a href={repo} {...ext}>
              GitHub
            </a>
            <a href={`${repo}/issues`} {...ext}>
              Issues
            </a>
            <a href={blob("LICENSE")} {...ext}>
              License
            </a>
            <Link href="/privacy">Privacy</Link>
          </p>
        </div>
      </footer>
    </>
  );
}
