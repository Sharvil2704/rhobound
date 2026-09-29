export type Status = "available" | "preview" | "roadmap" | "vision";

export const STATUS_LABEL: Record<Status, string> = {
  available: "Available",
  preview: "Preview",
  roadmap: "Roadmap",
  vision: "Vision",
};

export type Fact = { figure: string; text: string; source: string; href: string };

// Every figure below was checked against the linked page.
export const velocityFacts: Fact[] = [
  {
    figure: "48,185",
    text: "CVEs published in 2025, up 20.6% on 2024. That is about 130 a day.",
    source: "Jerry Gamblin, 2025 CVE Data Review",
    href: "https://jerrygamblin.com/2026/01/01/2025-cve-data-review/",
  },
  {
    figure: "5 days",
    text: "Average time from disclosure to exploitation in 2023, down from 63 days in 2018–19.",
    source: "Google Cloud / Mandiant",
    href: "https://cloud.google.com/blog/topics/threat-intelligence/time-to-exploit-trends-2023",
  },
  {
    figure: "12 of 12",
    text: "OpenSSL vulnerabilities in the January 2026 release that were found by an AI system.",
    source: "AISLE",
    href: "https://aisle.com/blog/aisle-discovered-12-out-of-12-openssl-vulnerabilities",
  },
  {
    figure: "32 days",
    text: "Median time to fix known-exploited edge-device vulnerabilities, and only 54% were fully fixed.",
    source: "Verizon 2025 DBIR, via GreyNoise",
    href: "https://www.greynoise.io/blog/verizon-dbir-2025-edge-kevs-increasingly-left-unpatched-exploited",
  },
];

export const costFacts: Fact[] = [
  {
    figure: "$300k+",
    text: "Cost of one hour of downtime for over 90% of mid-size and large enterprises.",
    source: "ITIC 2024 Hourly Cost of Downtime",
    href: "https://itic-corp.com/itic-2024-hourly-cost-of-downtime-report/",
  },
  {
    figure: "8.4%",
    text: "Lift in retail conversions from a 0.1 s mobile speed improvement. Latency costs money well before it becomes an outage.",
    source: "Deloitte, Milliseconds Make Millions",
    href: "https://deloitte.com/ie/en/services/consulting/research/milliseconds-make-millions.html",
  },
  {
    figure: "83%",
    text: "Share of container costs that go to idle resources: over-provisioned clusters and oversized requests.",
    source: "Datadog, State of Cloud Costs 2024",
    href: "https://www.datadoghq.com/state-of-cloud-costs/",
  },
  {
    figure: "8%",
    text: "Average CPU utilization across production Kubernetes clusters. CPU overprovisioning rose from 40% to 69% in a year.",
    source: "Cast AI, 2026 Kubernetes Optimization Report",
    href: "https://cast.ai/blog/2026-state-of-kubernetes-resource-optimization-cpu-at-8-memory-at-20-and-getting-worse/",
  },
];

export const options = [
  { option: "Ship the fix blind", problem: "Latency incidents and SLO breaches after rollout." },
  { option: "Hold the fix for a load test", problem: "The vulnerability stays open while the queue clears." },
  {
    option: "Full-scale load test every patch",
    problem: "Slow and expensive. It needs a production-like environment and realistic traffic across the whole graph.",
  },
  {
    option: "Canary release",
    problem:
      "Measures the direct cost well but misses queueing amplification, which only appears once all traffic runs the new image. In simulation a 5% canary missed 29–97% of the full-rollout impact.",
  },
  {
    option: "CVE scanner alone",
    problem:
      "Says which images contain the package, not which services execute it or what the fix costs. It flags services that ship the library but never call it.",
  },
];

export const steps = [
  {
    title: "A vulnerability lands",
    body: "In a base image such as distroless, Debian, Ubuntu or your own, or in a library like OpenSSL, glibc or zlib.",
  },
  {
    title: "A fixed image is built",
    body: "By your security team, a dependency bot or an AI coding agent, through your normal CI.",
  },
  {
    title: "Old and new are benchmarked side by side",
    body: "Only the changed code paths, on the same CPU type and core count as production, so hardware can't skew the numbers.",
  },
  {
    title: "Your architecture is rebuilt from telemetry you already have",
    body: "Kubernetes objects, mesh metrics, traces, eBPF, SBOMs and SLOs become one model: services, calls, fan-outs, replicas, load and which services call the changed code.",
  },
  {
    title: "The impact is predicted in milliseconds",
    body: "Latency change per service, an SLO verdict, lost headroom and a breach certificate. Each new candidate image is just a new benchmark, and the model re-runs instantly.",
  },
];

export const questions: { q: string; a: string; status: Status }[] = [
  {
    q: "Who is actually affected?",
    a: "SBOM lineage shows which images get the fixed base. eBPF shows which services actually call the changed library and how often. Services that ship it but never call it are separated out.",
    status: "available",
  },
  {
    q: "What does the change cost per call?",
    a: "Old and new versions are microbenchmarked on the same hardware.",
    status: "available",
  },
  {
    q: "How does that spread through the architecture?",
    a: "A queueing model of your service graph predicts the latency change at every service, including ones the patch never touched.",
    status: "available",
  },
  {
    q: "Do our SLOs still hold, and how much capacity do we lose?",
    a: "An SLO verdict per service, the change in saturation point, and a hard certificate when a service would be pushed past 100%. Mean-latency SLOs today.",
    status: "available",
  },
  {
    q: "How much slowdown can we afford?",
    a: "A latency budget, for example “this fix may add at most 0.8 ms per TLS call”, handed back to whoever builds the fix, human or agent.",
    status: "roadmap",
  },
];

export const results = [
  {
    test: "Reference 12-service system, 48% to 93% utilization",
    result: "Within ±1.8% of the simulated impact at every load",
  },
  {
    test: "155 fresh random architectures",
    result: "Median error 5.1%. 9 in 10 within 23%, worst 48%",
  },
  { test: "Architectures without re-joining fan-outs, steady traffic", result: "Median error 2–4%" },
  { test: "Naive approach: add up the direct costs", result: "Under-estimates by a median 60–94%, every time" },
  {
    test: "Architecture rebuilt from raw telemetry, 10 systems up to 37 nodes",
    result: "Structure recovered exactly in 10 of 10. The pipeline adds a median 1.0% error",
  },
  { test: "Global shop, 5 entry points, 75% utilization", result: "−1.9% to +9.4%. 5 of 5 SLO verdicts right" },
  {
    test: "Same system at 85% utilization",
    result: "−13.4% to +9.6%. 4 of 5 SLO verdicts right, one false alarm",
  },
  {
    test: "Reachability: which services really call the changed library",
    result: "Exact set every time. Scanner alone over-flagged 5–7 services per case",
  },
];

export const amplification = [
  { rps: 55, rho: "48%", predicted: "13.8", simulated: "13.5" },
  { rps: 75, rho: "66%", predicted: "22.3", simulated: "22.8" },
  { rps: 90, rho: "79%", predicted: "38.0", simulated: "37.6" },
  { rps: 100, rho: "88%", predicted: "67.0", simulated: "64.2" },
  { rps: 106, rho: "93%", predicted: "120.7", simulated: "127.5" },
];

export const weaker = [
  "Bursty traffic: ignoring bursts raises median error to 22–37%. A burstiness input cuts the reference error from 19% to 5%, but over-predicts on complex fan-outs.",
  "Heavy load (85% busy or more) with bursty traffic: median error 27%. Near saturation a 3% input error moves the answer a lot. That is queueing, not only the model.",
  "Retries: the retry-storm warning fires about 15–20% too late.",
  "Mean latency only. p95 and p99 prediction is on the roadmap.",
];

export const integrationGroups: { name: string; items: { name: string; role: string; status: Status }[] }[] = [
  {
    name: "Telemetry it reads",
    items: [
      { name: "Kubernetes", role: "Services, replicas, load-balancing rules", status: "available" },
      { name: "Istio", role: "Traffic, call counts, per-edge latency", status: "available" },
      { name: "OpenTelemetry", role: "Traces for call order and parallelism", status: "available" },
      { name: "Prometheus", role: "Metrics scrapes (Istio format)", status: "available" },
      { name: "bpftrace (eBPF)", role: "Per-request service time and code-path usage", status: "available" },
      { name: "OpenSLO", role: "Mean-latency objectives", status: "available" },
      { name: "Google Benchmark", role: "Old vs. new cost per call", status: "available" },
      { name: "Syft, cdxgen (CycloneDX)", role: "SBOMs and base-image lineage", status: "preview" },
      { name: "Linkerd, Envoy, Beyla", role: "More meshes and zero-code eBPF", status: "roadmap" },
      { name: "Parca, Pyroscope", role: "Find changed functions from profiles", status: "roadmap" },
    ],
  },
  {
    name: "Upstream: find and fix",
    items: [
      { name: "Trivy, Grype, OSV", role: "Which CVE, which package, which function", status: "roadmap" },
      { name: "EPSS, CISA KEV", role: "Exploit likelihood for ship-or-defer decisions", status: "roadmap" },
      { name: "Copacetic", role: "Patched images to check", status: "roadmap" },
      { name: "Renovate, Dependabot", role: "Every update PR gets a verdict", status: "roadmap" },
      { name: "OpenVEX", role: "Export reachability as VEX statements", status: "vision" },
    ],
  },
  {
    name: "Downstream: ship",
    items: [
      { name: "GitHub Actions, GitLab CI", role: "Verdict as a check or PR comment", status: "roadmap" },
      { name: "Argo Rollouts, Flagger", role: "Pre-rollout gate on the verdict", status: "roadmap" },
      { name: "k6, wrk2, GoReplay", role: "Service-level A/B and replay", status: "roadmap" },
      { name: "Model Context Protocol", role: "verify_change and latency_budget tools for agents", status: "roadmap" },
      { name: "Sigstore, OPA, Kyverno", role: "Signed verdicts and admission policy", status: "vision" },
    ],
  },
];

export const roadmap = [
  {
    phase: "Now",
    title: "Prototype for design partners",
    items: [
      "Pass / fail / inconclusive verdicts that combine SLO margin with both uncertainty bands",
      "Latency budget per call and per service",
      "Onboarding without custom hooks: service time from traces or CPU usage",
      "First real-system validation: an open-source microservices app, a real base-image fix, predicted vs. measured",
    ],
  },
  {
    phase: "Next",
    title: "Production coverage",
    items: [
      "p95 / p99 prediction and percentile SLOs",
      "Burstiness measured from real traffic",
      "Event-driven architectures and consumer lag",
      "Autoscaling: latency turning into replicas and cost",
    ],
  },
  {
    phase: "Then",
    title: "Platform",
    items: [
      "CI/CD checks and a rollout gate for Argo Rollouts and Flagger",
      "MCP server for coding agents",
      "Versioned architecture store with every change and its measured impact",
      "Signed performance attestations next to image provenance",
    ],
  },
];

export const faqs = [
  {
    q: "Is Rhobound validated on production systems?",
    a: "Not yet. Every result so far is against an independent discrete-event simulator of each architecture that shares none of the model's equations. Production validation with design partners is the current priority.",
  },
  {
    q: "Does it replace load testing or canaries?",
    a: "It replaces most full-scale load testing for a change, and complements canaries. A canary measures a change's direct cost well but misses the amplification that appears only at full rollout. Rhobound predicts that part, and the canary confirms the input.",
  },
  {
    q: "Is it a machine-learning model?",
    a: "No. The core is closed-form queueing mathematics. It is deterministic and explainable, every number traces back to an input, and a prediction takes milliseconds.",
  },
  {
    q: "Does it predict p99 latency?",
    a: "Not yet. It predicts mean latency today. Percentiles are on the roadmap.",
  },
  {
    q: "Do we need to change our code?",
    a: "No. Rhobound reads Kubernetes objects, SBOMs, metrics, traces and eBPF data. The most precise service-time measurement uses an eBPF hook, and lighter fallbacks are on the roadmap.",
  },
  {
    q: "Where does our data go?",
    a: "A self-hosted option that keeps telemetry and SBOMs inside your environment is planned. Deployment options are still being decided with design partners.",
  },
  {
    q: "What architectures does it support?",
    a: "Synchronous microservices, including parallel fan-outs, shared databases and caches, replicated services with different load-balancing policies, cache misses, CDN edges, network hops and third-party APIs. It also supports serverless functions. Event-driven (Kafka) support is on the roadmap.",
  },
];
