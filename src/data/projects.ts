import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "sa-arbitrage-engine",
    name: "SA Arbitrage Engine",
    tagline:
      "Watches nine crypto exchanges and works out which price gaps are still worth taking once every fee is subtracted.",
    category: "trading-systems",
    featured: true,
    rank: 1,
    maturity: "prototype",
    period: "2026",
    stack: [
      "Python 3.13",
      "asyncio",
      "FastAPI",
      "SQLAlchemy 2.0 (async)",
      "Pydantic v2",
      "aiohttp",
      "ccxt",
      "PostgreSQL",
      "Redis",
      "Prometheus",
      "Grafana",
      "Docker Compose",
      "pytest-asyncio",
    ],
    overview:
      "South African crypto exchanges often price above international ones. This watches VALR, Luno and AltCoinTrader against Binance, Bybit, OKX, Kraken, Coinbase and Bitget, and checks whether a gap is still worth anything once you subtract trading fees, withdrawal and network fees, FX spread, bank charges, slippage and the price movement you'd expect while the coin is in transit. Most of the time it isn't. By default it trades on paper against a fake 1,000 USDT balance. Turning on real trading, withdrawals or automatic rebalancing each need their own explicit confirmation, because I didn't want a config typo moving money.",
    architecture: [
      "Layered package (core, database, models, exchanges, engines, strategies, execution, risk, monitoring, resilience) wired dependency-injection style in the FastAPI lifespan, no import-time singletons.",
      "Adapter + registry pattern for exchanges: a hand-written HMAC-SHA512-signed VALR client and Luno HTTP-Basic client alongside ccxt async adapters for the six international venues.",
      "Distributed-systems reliability layer: circuit breaker, token-bucket rate limiting, dead-letter queue, watchdog with restart accounting, graceful shutdown, and startup recovery.",
      "Observability: Prometheus metrics with a fallback registry, auto-provisioned Grafana datasource and dashboard, psutil diagnostics.",
      "Deployment: multi-stage Dockerfile running as a non-root user, docker-compose orchestrating app + Postgres 16 + Redis 7 + Prometheus + Grafana.",
    ],
    highlights: [
      "The scanner runs in two passes. The first does the rough maths on ticker prices only, which is cheap, and just the best candidates from that get a full order-book lookup. Fetching depth for every pair was too slow to be worth it.",
      "It refuses to use simulated prices when it thinks it's running for real. That check happens in two separate places, because getting fake data into a live pipeline would produce opportunities that don't exist.",
      "Real trading, withdrawals and auto-rebalancing each need their own confirmation, and withdrawals also need an address allowlist. When it refuses to do something it tells you which check failed.",
      "228 tests across 22 files. They run offline, and the test config forces mock mode before the app is even imported so a stray API key can't leak into a test run.",
      "There's a fault-injection mode with 12 failure types and a fixed seed, for testing how it behaves when exchanges misbehave. It won't switch on if live trading is enabled.",
    ],
    challenges: [
      {
        problem:
          "If you treat every positive price gap as profit, you end up reporting stale feeds, mismatched pairs and decimal errors as huge opportunities.",
        solution:
          "Anything above a configured threshold gets rejected and logged before the cost model runs. It's about three lines, and it's the difference between output I trust and output I don't.",
      },
      {
        problem:
          "If one side of a trade uses real API keys and the other is simulated, you've opened a real unhedged position while thinking you're on paper.",
        solution:
          "Before placing anything it checks both sides can genuinely trade, and refuses if only one can.",
      },
      {
        problem:
          "A background scanner that dies on one bad iteration silently stops finding opportunities.",
        solution:
          "Every scan iteration is independently guarded; failures are logged and dead-lettered for replay rather than lost, and a watchdog restarts supervised workers while recording each restart as a Prometheus counter and a persisted risk event.",
      },
    ],
    lessons: [
      "It's built like a real trading system but it has never run against a funded account, so I'd call it a working prototype rather than something proven.",
      "The checks that throw data away turned out to matter more than the logic doing the actual work.",
      "I wrote 16,000 lines of this before putting it in git, which was a mistake and something I've since fixed.",
    ],
    futureImprovements: [
      "Put the codebase under real version control with CI running the 228-test suite on every push.",
      "Add API authentication before any networked deployment. The current threat model assumes a single operator on one machine.",
      "Exercise the execution paths against a funded test account with tiny position sizes to build the operational history the architecture is ready for.",
    ],
    metrics: {
      linesOfCode: 16208,
      files: 108,
      commits: 0,
    },
    snippets: [
      {
        title: "Data-error guard: an implausible spread is a bug, not profit",
        language: "python",
        code: `if buy_px <= 0 or sell_px <= buy_px:
    return None  # no positive raw spread

qty = capital_usd / buy_px
gross = qty * (sell_px - buy_px)
spread_pct = (sell_px - buy_px) / buy_px * 100.0

# Data-error guard: a cross-venue spread wider than the configured
# bound is a wrong pair / stale feed / decimal slip, not free money.
if spread_pct > self.bundle.app.reliability.max_gross_spread_pct:
    logger.warning(
        "rejecting implausible %s spread %.1f%% (%s ask $%s -> %s bid $%s)",
        coin, spread_pct, buy_t.exchange, buy_px, sell_t.exchange, sell_px)
    return None`,
        explanation:
          "If a price gap looks enormous it's nearly always a stale feed or a decimal in the wrong place, so this throws it out before the cost calculation ever runs. Without it the scanner reports fake opportunities that look great.",
      },
      {
        title: "Circuit breaker with correct half-open semantics",
        language: "python",
        code: `def record_success(self) -> None:
    """A successful execution: clears the failure streak; a success in
    the half-open window fully closes the breaker."""
    self._consecutive_failures = 0
    if self._tripped_at is not None and not self.is_open:
        logger.info("circuit breaker closed after successful half-open trade")
        self.reset()

def record_failure(self, reason: str = "") -> None:
    """A failed execution: may trip the breaker."""
    self._consecutive_failures += 1
    if self._tripped_at is not None and not self.is_open:
        # failure during half-open -> re-trip immediately
        self.trip(f"failure during half-open window: {reason}")
        return
    if self._consecutive_failures >= self.max_failures:
        self.trip(f"{self._consecutive_failures} consecutive failures: {reason}")`,
        explanation:
          "Standard circuit breaker. The part worth pointing at is that a failure during the trial request trips it again straight away instead of waiting for the failure count to build back up. The clock is passed in so I can test the cooldown without waiting around.",
      },
    ],
  },
  {
    slug: "za-arb-terminal",
    name: "ZA Arb Terminal",
    tagline:
      "A dark trading-terminal front end for the arbitrage work, built in Next.js with components I wrote myself.",
    category: "full-stack",
    featured: true,
    rank: 2,
    maturity: "functional",
    period: "2026",
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript 5.7 (strict)",
      "Tailwind CSS",
      "Recharts",
      "Framer Motion",
      "class-variance-authority",
    ],
    overview:
      "A dark, terminal-styled front end for the same SA arbitrage thesis: nine exchanges, full after-cost profit modelling, a live-updating opportunity table, charts, alert rules, a manual trade calculator, and an admin panel. It runs standalone against a simulated market, with the integration boundary deliberately designed so real exchange adapters can be swapped in one at a time.",
    architecture: [
      "Strict layering: all business logic lives in `lib/services` as pure functions; React only orchestrates. A single market context is the heartbeat driving every view.",
      "Adapter-boundary discipline: `exchangeService` defines the one and only integration point with exchange APIs, with the real REST endpoints documented and a commented registry showing exactly how to go live.",
      "Nine App Router routes (dashboard, markets, scanner, fees, calculator, alerts, history, analytics, admin) over a from-scratch shadcn-style component system.",
    ],
    highlights: [
      "Dependency-free list virtualiser (~58 lines) with ResizeObserver-tracked viewport and overscan, keeping the DOM at ~20 rows regardless of universe size. Written from scratch instead of pulling in react-window.",
      "Resilient async aggregator: Promise.allSettled fan-out, per-request timeout, one retry with backoff, stale-cache fallback when a venue fails, and in-flight request deduplication as a rate limiter.",
      "Mean-reverting geometric random-walk market simulator with √dt volatility scaling, so 1s and 60s refresh rates behave consistently and arbitrage windows open and close over time.",
      "Shared cost model: the same `evaluatePair` function powers both the live scanner and the manual calculator. One source of truth.",
    ],
    challenges: [
      {
        problem:
          "A trading UI that only ever sees a happy path leaves its timeout, retry, and cache code completely untested.",
        solution:
          "The mock market randomly degrades and drops venues offline, and the mock adapter throws on offline. Deliberately exercising the aggregator's resilience paths for real rather than leaving them as dead code.",
      },
      {
        problem:
          "A ticking interval callback that closes over React state sees stale values, but re-subscribing the interval on every state change is wasteful and buggy.",
        solution:
          "Ref-mirroring of the fee map, settings, and alert rules so the tick callback always reads current values without re-subscribing, with memoised stats and a cancellation flag in effect cleanup.",
      },
    ],
    lessons: [
      "Designing the integration seam before there's anything to integrate paid off: going live is a data-entry change, not a rewrite.",
      "This project has zero tests despite a core of pure, trivially-testable arithmetic. An inconsistency with the Python engine's 228 tests that I'd close first.",
    ],
    futureImprovements: [
      "Add a Vitest suite for the pure service functions. The cost model and aggregator are ideal unit-test targets.",
      "Wire the documented real exchange adapters in behind a feature flag.",
      "Replace the naive daily-profit extrapolation with a proper backtest over recorded snapshots.",
    ],
    metrics: {
      linesOfCode: 6059,
      files: 69,
      commits: 2,
    },
    snippets: [
      {
        title: "Resilient aggregator with stale-cache fallback",
        language: "typescript",
        code: `const results = await Promise.allSettled(
  adapters.map((a) =>
    fetchWithRetry(a.exchangeId, () => a.fetchTickers(symbols)).then((r) => ({
      exchangeId: a.exchangeId,
      ...r,
    })),
  ),
);

for (const result of results) {
  if (result.status !== "fulfilled") continue;
  const { exchangeId, tickers: fetched, status } = result.value;
  // ...
  // Venue failed -> serve stale cache so the UI degrades gracefully.
  if (status === "offline") {
    for (const [key, cached] of tickerCache) {
      if (key.startsWith(\`\${exchangeId}:\`) && !tickers.has(key)) {
        tickers.set(key, { ...cached, status: "offline" });
      }
    }
  }
}`,
        explanation:
          "Parallel fan-out, per-request timeout, retry with backoff, and a stale-cache fallback so a single failing venue degrades the terminal gracefully instead of blanking the table. All with no external dependencies.",
      },
    ],
  },
  {
    slug: "big-data-hpc",
    name: "Parallel Big-Data Analysis (HPC)",
    tagline:
      "University project processing 250MB a day of ozone forecast data, run in parallel and benchmarked to find how many processors it needed.",
    category: "data",
    featured: true,
    rank: 3,
    maturity: "coursework",
    period: "2023",
    stack: [
      "MATLAB",
      "Parallel Computing Toolbox",
      "parfor / parpool",
      "NetCDF",
      "GanttProject",
    ],
    overview:
      "Coventry University 5011CEM coursework: analyse CAMS atmospheric ozone-forecast ensemble data (700×400×25 per model, ~250 MB/day of NetCDF) and compare sequential versus parallel processing. The deliverable extrapolates how many processors are needed to bring a ~2.5-hour-per-hour-of-data analysis under a two-hour budget for a full 25-hour day. Built on the module's instructor-provided skeleton; my contribution is the seven commits on top. The function refactor, the scaling analysis, the measured results, and the test harness.",
    architecture: [
      "Refactored flat lecture scripts into a parameterised function pipeline with a single top-level orchestrator wiring sequential → parallel → plotting → text test → NaN-log test into one runnable flow.",
      "Memory-profiling comparison of load-everything versus stream-one-hour-at-a-time using MATLAB's `whos` byte introspection.",
      "Parallel processing with `parfor` over (NumLon-4)×(NumLat-4) grid locations per hour, timed with tic/toc across 2–11 workers.",
    ],
    highlights: [
      "Fault-injection test harness: synthesises deliberately corrupt NetCDF files, asserts data-type and text correctness, scans every hour for NaN, and writes timestamped pass/fail lines to a log. Correctly catching a single injected fault at hour 12 of 25.",
      "Real measured timings drive a real conclusion: 7 processors required to meet the two-hour budget, derived from benchmark runs across three workload sizes (250 / 5,000 / 9,000 data points).",
      "Genuine data-wrangling evidence: a debugging note where NetCDF variable ordering differed from expectations and the index array had to be corrected.",
    ],
    challenges: [
      {
        problem:
          "A parallel numerical pipeline can silently produce NaN or wrong-typed results, and a scaling claim is worthless without measured evidence.",
        solution:
          "A logging test harness injects known faults and asserts they're caught, and the scaling conclusion is computed from actual benchmarked runtimes rather than asserted.",
      },
    ],
    lessons: [
      "Refactoring flat scripts into parameterised functions is the clearest software-engineering signal in an otherwise numerical task.",
      "Absolute hardcoded paths and committed autosave files hurt reproducibility, worth cleaning before showcasing.",
    ],
    futureImprovements: [
      "Replace hardcoded absolute paths with a config so the pipeline runs on any machine.",
      "Port the parallel kernel to Python + Dask to demonstrate the same result in a more portable stack.",
    ],
    metrics: {
      linesOfCode: 2813,
      files: 29,
      commits: 7,
    },
    snippets: [],
    links: [
      { label: "GitHub (BIG-DATA)", url: "https://github.com/okafors/BIG-DATA" },
    ],
  },
  {
    slug: "job-automation",
    name: "Job-Search Automation Pipeline",
    tagline:
      "A Python tool that pulls job listings from five sources, filters out the ones I can't apply for, and drafts the paperwork.",
    category: "automation",
    featured: true,
    rank: 4,
    maturity: "functional",
    period: "2026",
    stack: [
      "Python 3 (standard library only)",
      "urllib",
      "ElementTree",
      "REST + RSS ingestion",
      "Vanilla JS dashboard",
    ],
    overview:
      "A personal job-search pipeline that fetches postings from five free no-key job APIs and RSS feeds, filters by title, deduplicates against a persistent seen-set, scores against a structured candidate profile, and generates a tailored CV, cover letter, screening answers, and form-autofill JSON per qualifying job. Tracking everything in a CSV and rendering a self-contained HTML dashboard. It's a human-in-the-loop agent harness: a runbook is the operating procedure an AI agent follows, with deterministic Python scripts as its tools. It's genuinely in use. 34 scored jobs and 15 generated application packages to date.",
    architecture: [
      "One-fetcher-per-source, each returning a uniform dict and individually fault-isolated so one dead API never kills the sweep.",
      "Three-file state machine: a permanent seen-set for dedupe, an unscored queue awaiting triage, and a scored tracker CSV with status. Cleanly separating 'I have seen this' from 'I have acted on this'.",
      "Zero runtime dependencies; output is a single double-clickable HTML file with light/dark support and client-side search.",
    ],
    highlights: [
      "Runbook safety rules come first: never submit an application or enter credentials (prepare only. The human submits), and never fabricate experience (tailoring means rewording real facts from the profile). A deliberate guardrail on an autonomous agent.",
      "Word-boundary regex filtering that prevents substring false-positives (e.g. 'mit Operations' matching an 'it operations' keyword), with a blocklist running before the allowlist.",
      "TLS handled properly: attempts the certifi CA bundle, falls back to the system default. Anticipating a common macOS Python failure mode.",
    ],
    challenges: [
      {
        problem:
          "An autonomous application agent that can submit forms or invent experience is a liability, not a tool.",
        solution:
          "The runbook's first two rules forbid submission and fabrication outright; the agent prepares packages a human reviews and submits, and tailoring is constrained to rewording verified facts.",
      },
    ],
    lessons: [
      "The interesting engineering here is the system design in the runbook, not the 419 lines of Python.",
      "Anything holding this much personal data needs its PII scrubbed before it goes anywhere public.",
    ],
    futureImprovements: [
      "Add a scheduler so the daily sweep is automatic rather than agent-triggered.",
      "Add unit tests around the filtering and scoring logic.",
    ],
    metrics: {
      linesOfCode: 419,
      files: 2,
      commits: 0,
    },
    snippets: [
      {
        title: "Blocklist-before-allowlist title matching",
        language: "python",
        code: `def title_matches(title: str) -> bool:
    t = title.lower()
    if any(b in t for b in TITLE_BLOCKLIST):
        return False
    # \\b prevents substring hits like "mit Operations" matching "it operations"
    return any(re.search(rf"\\b{re.escape(k.strip())}\\b", t) for k in TITLE_KEYWORDS)`,
        explanation:
          "Six lines that separate a filter that works from one that quietly returns garbage: seniority terms are excluded first, then keywords are matched on word boundaries so they can't hit inside unrelated words.",
      },
    ],
  },
  {
    slug: "livepoll",
    name: "LivePoll API",
    tagline:
      "A small FastAPI voting service, built as the first step of a backend learning plan I wrote for myself.",
    category: "backend",
    featured: true,
    rank: 5,
    maturity: "prototype",
    period: "2026",
    stack: ["Python 3.10", "FastAPI", "Pydantic v2", "Uvicorn"],
    overview:
      "A poll-creation and voting API built as the first stage of a deliberate 4-week backend and cloud-engineering learning plan. Only two direct dependencies, but the layering is a clean ports-and-adapters design where every file documents why its layer exists and what it deliberately doesn't know. The accompanying learning plan maps a coherent progression from REST to WebSockets, Postgres, Redis pub/sub, work queues, Docker, and Kubernetes. With a rule that no tool may be added until you can say what breaks without it.",
    architecture: [
      "Ports-and-adapters layering: app → handler (routes) → rules (service) → store (repository) → contract (Pydantic models), wired via dependency injection.",
      "A transport-agnostic service layer that raises domain exceptions (PollNotFound, PollClosed, InvalidOption); the route layer translates those to HTTP status codes.",
      "An in-memory repository with an explicit no-op save(), written so the interface matches a real database and the service layer won't change when Postgres arrives.",
    ],
    highlights: [
      "Precise HTTP semantics: 201 on create, 404 for missing, 409 for voting on a closed poll, 422 for an invalid option. Each with a documented rationale.",
      "Architectural articulation better than most junior code: 'not found is a domain fact; 404 is an HTTP opinion about that fact.'",
      "A learning plan whose golden rule, add a tool only when its absence breaks something. Is itself evidence of engineering judgement.",
    ],
    challenges: [
      {
        problem:
          "Small APIs usually tangle transport, rules, and storage together, so they can't grow without a rewrite.",
        solution:
          "Each concern is isolated behind an interface with a documented boundary, so the exact same service could power a CLI, a gRPC server, or a background worker, and swapping the in-memory store for Postgres touches nothing above the repository.",
      },
    ],
    lessons: [
      "Documenting the deliberate boundaries of each layer forces you to actually understand them.",
      "It's stage zero of twelve, clean, correct, and honest about how far it goes.",
    ],
    futureImprovements: [
      "Continue the plan: WebSocket live results, then a Postgres-backed repository behind the same interface.",
      "Add a pytest suite and a Dockerfile.",
    ],
    metrics: {
      linesOfCode: 379,
      files: 7,
      commits: 0,
    },
    snippets: [
      {
        title: "Domain rules, applied in order",
        language: "python",
        code: `def vote(self, poll_id: str, option: str) -> PollRecord:
    # 1. The poll must exist.
    poll = self.get_poll(poll_id)  # reuse the rule above (raises PollNotFound)

    # 2. The poll must be open.
    if not poll.is_open:
        raise PollClosed(poll_id)

    # 3. The option must be on the ballot.
    if option not in poll.tallies:
        raise InvalidOption(option)

    # All rules passed - mutate and persist via the repository.
    poll.tallies[option] += 1
    return self._repo.save(poll)`,
        explanation:
          "The service layer knows nothing about HTTP. It enforces three domain rules in order and raises domain exceptions; the route layer decides those become 404, 409, and 422. That separation is the whole point of the design.",
      },
    ],
  },
  {
    slug: "security-coursework",
    name: "Applied Security & Authentication",
    tagline:
      "Security coursework: port scanners in Python, a Docker lab to scan against, and a login system rebuilt from plaintext up to JWT and roles.",
    category: "cybersecurity",
    featured: true,
    rank: 6,
    maturity: "coursework",
    period: "2023",
    stack: [
      "Python (sockets)",
      "Flask",
      "SQLAlchemy",
      "bcrypt / passlib",
      "JWT",
      "Docker Compose",
      "Wireshark / Nmap (labs)",
    ],
    overview:
      "Coventry applied-security coursework combining hands-on network reconnaissance with a clear authentication progression. The port scanners implement TCP connect-scanning with banner grabbing and reserved-port sweeps; a docker-compose file provisions a deliberately-vulnerable target lab. The authentication assignment walks from insecure to secure: plaintext comparison → bcrypt hashing → Flask-Login sessions → JWT with expiry handling → role-based access control with a permission matrix and correct 401-versus-403 semantics.",
    architecture: [
      "Python socket scanners: connect-scan with connect_ex return-code interpretation, banner grabbing via recv, reserved-port sweeps, and socket timeouts with try/finally cleanup.",
      "A docker-compose target lab exposing SSH, HTTP, FTP, and SMTP services for scanning practice against a self-hosted range.",
      "An authentication progression across files: bcrypt with generated salts, Flask-Login session management, a JWT verifier handling ExpiredSignatureError and DecodeError, and an @authorize decorator factory enforcing a role/permission matrix.",
    ],
    highlights: [
      "Correct HTTP auth semantics: 401 Unauthorized for missing/invalid identity versus 403 Forbidden for an authenticated user lacking permission. A distinction many developers get wrong.",
      "Role-based access control via a custom decorator factory that reads a role, checks its permission set, and gates routes accordingly.",
      "Evidence of the full defensive toolkit: password hashing with salts, session auth, JWT with expiry, and RBAC, the concepts a secure system actually needs.",
    ],
    challenges: [
      {
        problem:
          "Understanding authentication means understanding what's wrong with the naive version, not just copying a library call.",
        solution:
          "The work deliberately starts from plaintext password comparison and iterates through each fix, making the security rationale for bcrypt, sessions, JWT expiry, and RBAC explicit at each step.",
      },
    ],
    lessons: [
      "These are learning-stage lab exercises: conceptually sound, individually buggy, and not integrated into one application. Which is the honest framing.",
      "The written vulnerability assessment (against a deliberately-insecure Flask shop with SQL injection and IDOR flaws) is as valuable as the code.",
    ],
    futureImprovements: [
      "Fix the scanner bugs (platform-specific ECONNREFUSED codes, argument passing) and integrate the auth experiments into one coherent secured service.",
      "Add automated tests that assert the 401/403 behaviour.",
    ],
    metrics: {
      linesOfCode: 250,
      files: 12,
    },
    snippets: [],
  },
  {
    slug: "credit-risk-ml",
    name: "Credit-Risk Default Classifier",
    tagline:
      "Predicting loan defaults on 32,581 records, comparing logistic regression, a decision tree and XGBoost.",
    category: "ai-ml",
    featured: false,
    rank: 7,
    maturity: "coursework",
    period: "2023",
    stack: [
      "Python",
      "pandas",
      "scikit-learn",
      "XGBoost",
      "matplotlib",
      "seaborn",
    ],
    overview:
      "A supervised binary-classification pipeline predicting loan default on a 32,581-row credit dataset (11 features). It compares Logistic Regression, Decision Tree, and XGBoost with a full evaluation suite. Accuracy, precision, recall, F1, confusion matrices, ROC curves with AUC, and precision-recall curves. Plus GridSearchCV and RandomizedSearchCV hyperparameter tuning. Choosing threshold-independent metrics for an imbalanced credit problem is the right instinct.",
    architecture: [
      "Preprocessing: dtype-based numeric/categorical split, median and mode imputation, one-hot encoding, 80/20 split.",
      "Three model families trained and compared, then re-fit on tuned hyperparameters.",
      "Evaluation via ROC-AUC and precision-recall curves rather than accuracy alone, plus XGBoost feature-importance ranking.",
    ],
    highlights: [
      "Threshold-independent evaluation (ROC-AUC, PR curves) chosen deliberately for class imbalance.",
      "Hyperparameter search across all three model families with both grid and randomised strategies.",
      "The visible iteration history traces real debugging. Including catching and fixing a target-leakage bug where the label was one-hot encoded with the features.",
    ],
    challenges: [
      {
        problem:
          "Accuracy is misleading on an imbalanced default-prediction problem where most loans don't default.",
        solution:
          "The pipeline reports ROC-AUC and precision-recall curves across all three models, which measure ranking quality independent of a fixed decision threshold.",
      },
    ],
    lessons: [
      "Trailing plotting code copied from a different dataset caused crashes. A reminder to keep visualisation tied to the actual columns.",
      "Twelve near-duplicate iteration files should have been git commits.",
    ],
    futureImprovements: [
      "Consolidate the duplicates into one clean, version-controlled script.",
      "Add class-imbalance handling (scale_pos_weight) and a proper train/validation/test split.",
    ],
    metrics: {
      linesOfCode: 316,
      files: 1,
    },
    snippets: [],
  },
  {
    slug: "todo-maui",
    name: "TodoApp (.NET MAUI)",
    tagline:
      "A to-do app for iOS and Android with Firebase login, subtasks and a calendar view.",
    category: "mobile",
    featured: false,
    rank: 8,
    maturity: "functional",
    period: "2024",
    stack: [".NET MAUI", "C#", "Firebase Auth", "Firebase Realtime Database", "MVVM"],
    overview:
      "A cross-platform task-management mobile app built with .NET MAUI, integrating Firebase for authentication and data persistence and demonstrating MVVM with dependency injection. Features include user login/registration, a todo list with subtasks, and a calendar view. Structured with a data-access layer, services (DatabaseService, AuthService), view models, and XAML pages.",
    architecture: [
      "MVVM with dependency-injected services registered in MauiProgram.",
      "Firebase Auth for registration/login and Firebase Realtime Database for CRUD persistence.",
      "XAML views (LoginPage, TodoListPage, CalendarPage) bound to view models (BaseViewModel, TodoItemViewModel, CalendarViewModel).",
    ],
    highlights: [
      "Real backend integration: Firebase authentication and Realtime Database rather than local-only storage.",
      "Clean MVVM separation with a shared BaseViewModel and dependency injection.",
      "Calendar and subtask features beyond a basic todo list.",
    ],
    challenges: [
      {
        problem:
          "A mobile app that stores tasks only on-device can't support real accounts or sync.",
        solution:
          "Firebase Auth plus Realtime Database provide account-scoped, synced persistence, wired through injected services so the view models stay backend-agnostic.",
      },
    ],
    lessons: [
      "MVVM plus dependency injection keeps XAML views thin and the logic testable.",
    ],
    futureImprovements: [
      "Add offline caching and conflict resolution for intermittent connectivity.",
      "Add unit tests around the view models.",
    ],
    metrics: {
      commits: 10,
    },
    snippets: [],
    links: [
      {
        label: "GitHub (TodoApp)",
        url: "https://github.com/okafors/Mobile-APP-Okafor-Somtochuckwu-",
      },
    ],
  },
  {
    slug: "social-feed-mern",
    name: "Social Feed (MERN). Feature Contribution",
    tagline:
      "The feed, image uploads and like/comment endpoints, which were my part of a shared MERN project.",
    category: "full-stack",
    featured: false,
    rank: 9,
    maturity: "coursework",
    period: "2024",
    stack: ["React 18", "Express", "MongoDB / Mongoose", "JWT", "Cloudinary"],
    overview:
      "A social-media application built on a collaborative/coursework MERN codebase. My contribution was a substantive feature commit: the social feed UI, a post-creation form with direct-to-Cloudinary image upload, and the like/unlike/comment API endpoints. Presented honestly as feature work on a shared codebase rather than a solo build. The scaffold and other commits belong to collaborators.",
    architecture: [
      "Express REST API with versioned /api/v1 routes and nested resources (POST /posts/:id/like, /:id/comment).",
      "Mongoose schemas mixing referenced relations (author, likes) with embedded comment subdocuments.",
      "React 18 client with routing, animated with Framer Motion.",
    ],
    highlights: [
      "Idempotent like/unlike endpoints: double-likes and unliking-what-was-never-liked are both rejected with correct status codes.",
      "Direct-to-Cloudinary unsigned upload via FormData with a loading state that disables submit until the image URL returns.",
      "A compact Mongoose schema making a real modelling decision, refs for authors and likes, embedded docs for comments.",
    ],
    challenges: [
      {
        problem:
          "Like and unlike are easy to implement in a way that lets a user like the same post twice or corrupt the count.",
        solution:
          "The endpoints explicitly check current state and reject invalid transitions, keeping the like array consistent.",
      },
    ],
    lessons: [
      "The original scaffold shipped hardcoded database credentials and a client-verifiable JWT secret. A lasting lesson in why secrets belong in environment variables and verification belongs on the server.",
    ],
    futureImprovements: [
      "Move all secrets to environment variables and rotate the leaked ones.",
      "Move JWT verification fully server-side and add authorisation checks to destructive endpoints.",
    ],
    metrics: {
      linesOfCode: 1215,
      commits: 2,
    },
    snippets: [],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
