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

export const agentFacts: Fact[] = [
  {
    figure: "1M+",
    text: "Pull requests created by GitHub’s Copilot coding agent in its first five months, May to September 2025.",
    source: "GitHub Octoverse 2025",
    href: "https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/",
  },
  {
    figure: "~7 months",
    text: "Doubling time, over six years, of the length of task AI agents can complete on their own at 50% reliability.",
    source: "METR",
    href: "https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/",
  },
  {
    figure: "84%",
    text: "Developers using or planning to use AI tools in their development process, up from 76% a year earlier.",
    source: "Stack Overflow Developer Survey 2025",
    href: "https://survey.stackoverflow.co/2025/ai",
  },
  {
    figure: "3.12×",
    text: "Average execution time of GPT-4’s code relative to expert human solutions on 1,000 efficiency-critical coding problems. Correct is not the same as fast.",
    source: "EffiBench, NeurIPS 2024",
    href: "https://arxiv.org/abs/2402.02037",
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

export type Level = "Live cluster" | "Public data" | "Simulation";

export const proofStrip: { level: Level | "Record"; figure: string; text: string }[] = [
  {
    level: "Live cluster",
    figure: "1.1%",
    text: "Largest error on entry-point latency after a real change to a live Kubernetes deployment, predicted from traces alone.",
  },
  {
    level: "Simulation",
    figure: "4.3%",
    text: "Mean error on the predicted entry-point p99, across 114 fresh architectures it had never seen.",
  },
  {
    level: "Record",
    figure: "27 rounds",
    text: "Of experiments with criteria declared before each run, 276 automated tests, and the failures published next to the successes.",
  },
];

export const marketFacts: Fact[] = [
  {
    figure: "82%",
    text: "Of container users run Kubernetes in production. Rhobound’s customers already run the platform it reads.",
    source: "CNCF Annual Cloud Native Survey 2025",
    href: "https://www.cncf.io/announcements/2026/01/20/kubernetes-established-as-the-de-facto-operating-system-for-ai-as-production-use-hits-82-in-2025-cncf-annual-cloud-native-survey/",
  },
  {
    figure: "41%",
    text: "Of observability teams use OpenTelemetry in production, extensively or exclusively. Its traces are all Rhobound needs.",
    source: "Grafana Observability Survey 2025",
    href: "https://grafana.com/observability-survey/2025/",
  },
];

export const buyers = [
  {
    who: "Platform engineering and SRE",
    why: "Own the latency objectives and the capacity bill. Rhobound tells them what a change does to both before rollout.",
  },
  {
    who: "Security and vulnerability management",
    why: "Own the patch rollout. A verdict per service lets safe fixes ship now instead of waiting for a performance review.",
  },
  {
    who: "Engineering leadership",
    why: "Carry the trade-off between security speed and reliability. They get an evidence-based answer per change.",
  },
];

export const position = [
  { tool: "Vulnerability scanners", answers: "Which images contain the package", rhobound: "Which services execute it, and what the fix costs" },
  { tool: "CI: build and tests", answers: "Does it build and pass", rhobound: "Does it keep the latency objectives at real load" },
  { tool: "Load testing", answers: "What happens under synthetic load", rhobound: "A small targeted benchmark, extended to the whole graph at real traffic" },
  { tool: "Canary analysis", answers: "Does the new version look fine on a slice", rhobound: "What a full rollout does, including the amplification a canary cannot see" },
  { tool: "Observability and APM", answers: "What happened after we shipped", rhobound: "What will happen, from the same telemetry" },
  { tool: "Black-box ML predictors", answers: "A number, with no reason", rhobound: "Deterministic and explainable, and it refuses outside its validated range" },
];

export const path = [
  {
    title: "Design partners",
    body: "We backtest your last patch rollouts and incidents and show what Rhobound would have predicted. Each partner adds a measured record of predicted against deployed.",
  },
  {
    title: "The pipeline",
    body: "A check in CI and a pre-rollout gate for progressive delivery, so every change gets a verdict without anyone asking for one.",
  },
  {
    title: "The agents’ check",
    body: "A tool that coding agents call inside their loop. Clear results let cheaper models keep iterating; borderline ones escalate.",
  },
];

export const steps = [
  {
    title: "Capture traces",
    body: "A few minutes of OpenTelemetry traces from your cluster, as the Collector’s file exporter writes them. No code changes and no switches describing your system.",
  },
  {
    title: "Infer the architecture",
    body: "Calls and their order, parallel fan-outs, replicas and routing, and per pod the worker count and own time, rebuilt from the spans.",
  },
  {
    title: "Profile the change in your cluster",
    body: "The new image runs against the old one among live traffic, with the pod’s own CPU request and placement, so CPU-bound code meets real contention.",
  },
  {
    title: "Predict",
    body: "Latency change at every service, an SLO verdict, p99 before and after, lost headroom, and a certified breach when a service would pass 100% busy.",
  },
  {
    title: "Verify",
    body: "After the deploy, the prediction is judged against the new traces, criterion by criterion. Every report adds to the record.",
  },
];

export const deliverables: { title: string; body: string; status: Status }[] = [
  { title: "One impact level", body: "None, low, moderate, high or critical, with one line per entry point.", status: "available" },
  { title: "Per-service impact", body: "Mean latency before and after for every service, including ones the change never touched, with an input-noise band.", status: "available" },
  { title: "Percentiles", body: "p50 to p99 before and after, and a planning bound: the modelled p99 after the change × 1.10.", status: "available" },
  { title: "Capacity", body: "The load at which the busiest service saturates, before and after, and a sweep from 0.5× to 1.5× today’s load.", status: "available" },
  { title: "Risks", body: "A certified breach, thin headroom, and own-time bursts large enough to saturate a service after the change.", status: "available" },
  { title: "Verification", body: "After the deploy, the report against what the new traces show.", status: "available" },
  { title: "Latency budget", body: "The most slowdown a change may add per call before an objective breaks, handed back to the fixer, human or agent.", status: "roadmap" },
];

export const principles = [
  { title: "Deterministic and explainable", body: "Closed-form queueing mathematics, not a black box. Same inputs, same answer, and every number traces to an input." },
  { title: "Refuses instead of guessing", body: "Contradictory data or inputs outside the validated range return a reason, not a number." },
  { title: "Runs in your environment", body: "A command-line tool that works on your traces and your cluster. Nothing has to leave it." },
  { title: "Milliseconds for means", body: "Mean predictions take milliseconds. Percentiles take seconds to minutes at high load." },
];

export const reportSample = `IMPACT    MODERATE
  checkout    93.5 -> 110.1 ms  (+17.8%)  p99 207 -> 239
  storefront  71.8 ->  78.3 ms   (+9.0%)  p99 206 -> 214
  capacity    180 -> 156 rps (-13%), bottleneck pricing -> auth

PER SERVICE      util          mean ms         change
  payments *     44% -> 55%    23.1 -> 33.3    +10.2 ms
  auth *         48% -> 64%    11.9 -> 18.3     +6.4 ms
  catalog        40% -> 40%    27.1 -> 27.1     +0.0 ms
  * changed image

Headroom over today's load: 81% -> 57%
Inferred from 686,104 spans: 10 services, 11 pods,
2 entry points. Nothing else was given.`;

export const results: { level: Level; test: string; result: string }[] = [
  {
    level: "Live cluster",
    test: "Entry latency after a real change, 10-service Kubernetes deployment, traces only",
    result: "Storefront 78.28 ms predicted, 78.46 observed (−0.2%). Checkout 110.07 vs 111.32 (−1.1%). Every service within 6.6%",
  },
  {
    level: "Live cluster",
    test: "Profile of the changed image, taken in the cluster",
    result: "Within 1.6% of the deployed change (+3.06 ms profiled, +3.01 ms deployed). The p99 planning bound held",
  },
  {
    level: "Live cluster",
    test: "Architecture inferred from traces alone",
    result: "Replicas, routing, calls, parallel fan-out and conditional share all matched. Worker counts right on 70 of 70 service-captures",
  },
  {
    level: "Live cluster",
    test: "Online Boutique, a real open-source benchmark in five languages",
    result: "Structure inferred and the model before the change within 0.3% to 6.4% at the endpoints",
  },
  {
    level: "Public data",
    test: "66 real fault-injection cases on Online Boutique",
    result: "Front-end latency change within 9.1% median, at light load",
  },
  {
    level: "Public data",
    test: "A real call-center queue at high load",
    result: "Measured wait matched within 0.94 to 1.06× from 70% utilization to saturation",
  },
  {
    level: "Simulation",
    test: "Reference 12-service system, 48% to 93% utilization",
    result: "Entry impact within ±1.8% at every load",
  },
  {
    level: "Simulation",
    test: "155 fresh random architectures",
    result: "Entry error median 5.1%, worst 48%",
  },
  {
    level: "Simulation",
    test: "Architectures without reconverging fan-outs",
    result: "Median error 1.6% below 75% utilization, 3.7% from 75% to 90%",
  },
  {
    level: "Simulation",
    test: "p99 on 114 fresh cases, and the planning bound",
    result: "Entry p99 mean error 4.3%. The ×1.10 bound held on 97% to 100% of fresh rows",
  },
  {
    level: "Simulation",
    test: "Retry-driven meltdown onset, 26 fresh cases",
    result: "Within 5% everywhere",
  },
  {
    level: "Simulation",
    test: "Naive approach: add up the direct costs",
    result: "Under-estimates by a median 60% to 94%, every time",
  },
];

export const amplification = [
  { rps: 55, rho: "48%", predicted: "13.8", simulated: "13.5" },
  { rps: 75, rho: "66%", predicted: "22.3", simulated: "22.8" },
  { rps: 90, rho: "79%", predicted: "38.0", simulated: "37.6" },
  { rps: 100, rho: "88%", predicted: "67.0", simulated: "64.2" },
  { rps: 106, rho: "93%", predicted: "120.7", simulated: "127.5" },
];

export const boundaries = [
  "CPU limits under bursty demand. The first thing we are closing: on Online Boutique a container limit throttled the changed service and the change was under-predicted. Next is replaying production’s arrival times in the profile and reading limits into the model.",
  "Short own-time bursts from machine-level CPU shortage are measured and reported as a risk. The queue a burst builds is not predicted yet.",
  "Bursty arrivals over-predict on complex fan-outs. Near saturation with bursty traffic, use a canary or simulation for go/no-go.",
  "The change of p99 is not validated. Plan against the modelled p99 after the change × 1.10.",
];

export const integrationGroups: { name: string; items: { name: string; role: string; status: Status }[] }[] = [
  {
    name: "What you give it",
    items: [
      { name: "OpenTelemetry traces", role: "The main input: OTLP/JSON from the Collector’s file exporter", status: "available" },
      { name: "kubectl", role: "Deployments, services and pods, for profiling and placement", status: "available" },
      { name: "Kubernetes and Docker", role: "Where the new image is profiled: in the cluster, or on one machine", status: "available" },
      { name: "Istio metrics", role: "Traffic, call counts and per-edge latency", status: "available" },
      { name: "CycloneDX SBOMs", role: "Base-image lineage; some tools need a small adapter", status: "preview" },
      { name: "Google Benchmark, bpftrace, OpenSLO", role: "Cost per call, per-request service time, objectives", status: "available" },
      { name: "CloudFront logs", role: "CDN edge traffic", status: "available" },
      { name: "Linkerd, Envoy, Parca, Pyroscope", role: "More meshes and continuous profiles", status: "roadmap" },
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
      { name: "GitHub Actions, GitLab CI", role: "The verdict as a check or PR comment", status: "roadmap" },
      { name: "Argo Rollouts, Flagger", role: "Pre-rollout gate on the verdict", status: "roadmap" },
      { name: "k6, wrk2, GoReplay", role: "Replay and service-level A/B", status: "roadmap" },
      { name: "Model Context Protocol", role: "Tools coding agents call: verify a change, fetch a latency budget", status: "roadmap" },
      { name: "Sigstore, OPA, Kyverno", role: "Signed verdicts and admission policy", status: "vision" },
    ],
  },
];

export const roadmap = [
  {
    phase: "Now",
    title: "MVP with design partners",
    items: [
      "The rhobound command: profile, predict, verify",
      "CPU-limit modelling: replay production’s arrival times in the profile, read container limits into a risk rule and the model",
      "Backtests on partners’ real rollouts, with predicted against deployed quoted",
      "Onboarding without custom hooks",
    ],
  },
  {
    phase: "Next",
    title: "The pipeline",
    items: [
      "CI check for GitHub and GitLab, and a rollout gate for Argo Rollouts and Flagger",
      "Latency budget per call and per service",
      "Validated change of p99, and burstiness measured from real traffic",
      "Event-driven consumer lag and autoscaling",
    ],
  },
  {
    phase: "Then",
    title: "The platform",
    items: [
      "MCP server so coding agents call Rhobound inside their loop",
      "Versioned architecture store with every change and its measured impact",
      "Signed performance attestations next to image provenance",
      "Admission policy: no rollout without a passing verdict",
    ],
  },
];

export const faqs = [
  {
    q: "Is it validated?",
    a: "On a live Kubernetes deployment, where entry latency after a real change was predicted from traces alone within 1.1%; on public data from real systems; and against independent simulation. A customer’s production system is the design-partner milestone, and we say so wherever a number appears.",
  },
  {
    q: "Does it predict p99?",
    a: "Yes. It predicts p50 to p99 before and after each change, and gives a planning bound: the modelled p99 after the change × 1.10, which held on 97% to 100% of fresh cases. The change of p99 itself is not validated, so plan against the bound.",
  },
  {
    q: "What do we have to change?",
    a: "Nothing in your code. Rhobound reads standard OpenTelemetry traces, plus kubectl output to profile the changed image.",
  },
  {
    q: "Where does our data go?",
    a: "Rhobound is a command-line tool that runs in your environment on your traces and your cluster. Nothing has to leave it.",
  },
  {
    q: "Is it machine learning?",
    a: "No. The core is closed-form queueing mathematics. It is deterministic and explainable, every number traces to an input, and it refuses to answer outside the range it has been validated for.",
  },
  {
    q: "Does it replace load testing and canaries?",
    a: "It replaces most full-scale load testing for a change, and complements canaries. A canary measures a change’s direct cost well but misses the amplification that appears only at full rollout. Rhobound predicts that part.",
  },
  {
    q: "What does it support?",
    a: "Synchronous request-response microservices: parallel fan-outs, shared databases and caches, replicas with different routing policies, conditional calls, CDN edges, network hops, third-party APIs, timeouts and retries. Also serverless functions. Event-driven consumer lag is on the roadmap.",
  },
];
