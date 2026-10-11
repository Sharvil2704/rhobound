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

export const pillars: { title: string; line: string; facts: Fact[] }[] = [
  {
    title: "Change is accelerating",
    line: "Vulnerabilities are found, and fixed images built, faster every year. One rebuilt base image reaches every service at once.",
    facts: [velocityFacts[0], velocityFacts[1]],
  },
  {
    title: "Agents write the change",
    line: "Coding agents now open pull requests on their own, and the tasks they finish keep getting longer.",
    facts: [agentFacts[0], agentFacts[1]],
  },
  {
    title: "Nobody checks what it costs",
    line: "Tests say a change is correct. Nothing says what it does to latency at production load, so teams guess, and pad.",
    facts: [costFacts[0], costFacts[2]],
  },
];

export const keyResults: { level: Level; figure: string; text: string }[] = [
  {
    level: "Kubernetes cluster",
    figure: "0.1%",
    text: "Gap between the profiled change and production’s on Online Boutique, after replaying production’s own traffic in the profile.",
  },
  {
    level: "Kubernetes cluster",
    figure: "9 of 9",
    text: "Criteria passed with only 10% to 25% of requests traced. The sampled share is found from the trace IDs.",
  },
  {
    level: "Kubernetes cluster",
    figure: "18 of 18",
    text: "Fresh Online Boutique deploys with composed p95 within 20% of what happened.",
  },
  {
    level: "Kubernetes cluster",
    figure: "70 of 70",
    text: "Worker-pool sizes inferred correctly from traces alone, across every service capture.",
  },
];

export type Level = "Kubernetes cluster" | "Public data" | "Simulation";

export const proofStrip: { level: Level | "Record"; figure: string; text: string }[] = [
  {
    level: "Kubernetes cluster",
    figure: "1.1%",
    text: "Largest entry-point error after a real change on a 10-service Kubernetes benchmark, predicted from traces alone. On Online Boutique the truth itself moves up to 13.6% between windows.",
  },
  {
    level: "Simulation",
    figure: "4.3%",
    text: "Mean error on the predicted entry-point p99, across 114 fresh architectures it had never seen.",
  },
  {
    level: "Record",
    figure: "115 rounds",
    text: "Of experiments with criteria declared in advance, 396 automated tests, and the failures published next to the successes.",
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
    body: "A few minutes of OpenTelemetry traces from your cluster: every request, or a head-sampled share, which Rhobound reads from the trace IDs. No code changes and no switches describing your system.",
  },
  {
    title: "Infer the architecture",
    body: "Calls and their order, parallel fan-outs, replicas and routing, and per pod the worker count and own time, rebuilt from the spans.",
  },
  {
    title: "Profile the change in your cluster",
    body: "The new image runs against the old one among live traffic, replaying your own arrivals with the pod’s own CPU request and placement, so CPU limits and contention show up in the profile.",
  },
  {
    title: "Predict",
    body: "Latency change at every service, an SLO verdict, p99 before and after, lost headroom, and a certified breach when a service would pass 100% busy.",
  },
  {
    title: "Verify",
    body: "After the deploy, the prediction is judged against the new traces, criterion by criterion. Each verified deploy calibrates the next prediction and sets its error range.",
  },
];

export const deliverables: { title: string; body: string; status: Status }[] = [
  { title: "One impact level", body: "None, low, moderate, high or critical, with one line per entry point.", status: "available" },
  { title: "Per-service impact", body: "Mean latency before and after for every service, including ones the change never touched, with an input-noise band.", status: "available" },
  { title: "Percentiles", body: "p50 to p99 before and after, and a planning bound: the modelled p99 after the change × 1.10.", status: "available" },
  { title: "Capacity", body: "The load at which the busiest service saturates, before and after, and a sweep from 0.5× to 1.5× today’s load. After a CPU-bound change, a range that allows for bursts.", status: "available" },
  { title: "Error ranges", body: "A range drawn from this cluster’s own past deploys, and a running check of whether earlier ranges held. It needs a few verified deploys first.", status: "preview" },
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
    level: "Kubernetes cluster",
    test: "Entry latency after a real change, 10-service benchmark, traces only",
    result: "Storefront 78.28 ms predicted, 78.46 observed (−0.2%). Checkout 110.07 vs 111.32 (−1.1%). Every service within 6.6%",
  },
  {
    level: "Kubernetes cluster",
    test: "Profile of the changed image, taken in the cluster",
    result: "Within 1.6% of the deployed change (+3.06 ms profiled, +3.01 ms deployed). The p99 planning bound held",
  },
  {
    level: "Kubernetes cluster",
    test: "Architecture inferred from traces alone",
    result: "Replicas, routing, calls, parallel fan-out and conditional share all matched. Worker counts right on 70 of 70 service-captures",
  },
  {
    level: "Kubernetes cluster",
    test: "Online Boutique, a real open-source benchmark in five languages, under CPU limits",
    result: "Endpoints within 0.3% to 6.4% before the change. Replaying production’s arrivals put the profiled change within 0.1% of production’s and the product and cart pages within 1.1%",
  },
  {
    level: "Kubernetes cluster",
    test: "Sampled traces: 10% of requests on kshop, 25% on Online Boutique",
    result: "The kept share found from the trace IDs. 9 of 9 criteria: entries within 4.4%, and within 0.6 to 3.3 ms of the full capture",
  },
  {
    level: "Kubernetes cluster",
    test: "Calibration by the cluster’s own past deploys, and error ranges",
    result: "Each calibrated deploy within 10%, median 3.2% (uncalibrated 10.0%). Early: 89% and 94% of ranges held on fresh deploys, against 80% and 90% stated",
  },
  {
    level: "Kubernetes cluster",
    test: "A change that waits (a lock), and a service with two replicas sharing the load",
    result: "Lock: every criterion 3 of 3 on fresh deploys, the catalog within 1.3%. Two replicas: browse mean within 1.9%, composed p95 within 2.8%",
  },
  {
    level: "Kubernetes cluster",
    test: "Composed p95 on Online Boutique pages, fresh deploys",
    result: "Within 20% on 18 of 18, running 5% to 7% high. Real-cluster p99 is not claimed: the truth’s own noise floor is 46%",
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
    test: "p99 on 114 fresh cases, and the planning bound",
    result: "Entry p99 mean error 4.3%. The ×1.10 bound held on 95% to 100% of fresh rows",
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
  "A change that grows response size is under-predicted by 79% to 92%, because the callers’ decoding is not measured. Rhobound detects it and states every result as a lower bound.",
  "The first deploy on a new cluster reads low, about 0.8 times. Calibration and error ranges need a few verified deploys before they apply.",
  "The truth is noisy. On Online Boutique, windows with nothing changed differ by up to 13.6% in the mean and 45.7% at p99, and a near-quota service varies about ±20% between deploys. Real-cluster p99 is not claimed.",
  "Capacity after a CPU-bound change is a range, and the ceiling a CPU limit leaves is marked unvalidated in the report.",
  "No production telemetry has been used yet. Every real-cluster result comes from benchmark applications on a Kubernetes test cluster.",
];

export const integrationGroups: { name: string; items: { name: string; role: string; status: Status }[] }[] = [
  {
    name: "What you give it",
    items: [
      { name: "OpenTelemetry traces", role: "The main input: OTLP/JSON from the Collector’s file exporter", status: "available" },
      { name: "kubectl", role: "Deployments, services and pods, for profiling and placement", status: "available" },
      { name: "Zipkin and B3 traces", role: "Read as calls, alongside OTLP", status: "available" },
      { name: "Per-pod CPU counters", role: "Optional: rhobound cpu-sample reads the kubelet’s counters into the capture", status: "available" },
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
      "Backtests on partners’ real rollouts, with predicted against deployed quoted",
      "A better first prediction on a new cluster, and the answer-size case: measuring what callers spend decoding a bigger response",
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
    a: "On Kubernetes benchmark applications, where entry latency after a real change was predicted from traces alone within 1.1% on a 10-service deployment and the product and cart pages of Online Boutique within 1.1%; on public data from real systems; and against independent simulation. A customer’s production system is the design-partner milestone, and we say so wherever a number appears.",
  },
  {
    q: "Does it predict p99?",
    a: "Yes. It predicts p50 to p99 before and after each change, and gives a planning bound: the modelled p99 after the change × 1.10, which held on 95% to 100% of fresh simulated cases. On real clusters we claim p95, within 20% on 18 of 18 fresh deploys. Real-cluster p99 is not claimed because the truth’s own noise floor is 46%. The change of p99 itself is not validated, so plan against the bound.",
  },
  {
    q: "What do we have to change?",
    a: "Nothing in your code. Rhobound reads standard OpenTelemetry or Zipkin traces, every request or a head-sampled share, plus kubectl output to profile the changed image. Optionally it takes per-pod CPU counters and a sample request body for routes that read one.",
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
