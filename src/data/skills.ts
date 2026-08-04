import type { Skill, TimelineEvent } from "./types";

export const skills: Skill[] = [
  // Languages
  { name: "Python", category: "Languages", level: "advanced", evidence: "16k-line async arbitrage engine, ML pipelines, automation, security scanners" },
  { name: "TypeScript", category: "Languages", level: "proficient", evidence: "6k-line strict-mode Next.js terminal with a from-scratch design system" },
  { name: "JavaScript", category: "Languages", level: "proficient", evidence: "React clients, dependency-free dashboards" },
  { name: "C#", category: "Languages", level: "working", evidence: ".NET MAUI TodoApp with Firebase; C++/C# coursework" },
  { name: "MATLAB", category: "Languages", level: "working", evidence: "Parallel HPC big-data analysis with fault-injection testing" },
  { name: "SQL", category: "Languages", level: "working", evidence: "SQLAlchemy models, database normalisation coursework" },
  { name: "C++", category: "Languages", level: "familiar", evidence: "Data-structures coursework (BST, Dijkstra, graphs)" },

  // Backend
  { name: "FastAPI", category: "Backend", level: "advanced", evidence: "Arbitrage engine API + LivePoll, dependency-injection wiring" },
  { name: "asyncio", category: "Backend", level: "advanced", evidence: "Fully async engine: gather fan-out, rate limiting, retries" },
  { name: "SQLAlchemy 2.0", category: "Backend", level: "proficient", evidence: "Async ORM, 9-table schema in the arbitrage engine" },
  { name: "Express / Node", category: "Backend", level: "working", evidence: "REST API with versioned nested resources" },
  { name: "Flask", category: "Backend", level: "working", evidence: "Auth progression: bcrypt, sessions, JWT, RBAC" },
  { name: "REST API design", category: "Backend", level: "advanced", evidence: "Versioned resources, precise HTTP status semantics (409/422)" },
  { name: "Pydantic", category: "Backend", level: "proficient", evidence: "Request/response schemas, custom validators, settings" },

  // Frontend
  { name: "React", category: "Frontend", level: "proficient", evidence: "React 19 terminal, context + custom hooks, virtualisation" },
  { name: "Next.js", category: "Frontend", level: "proficient", evidence: "App Router terminal (9 routes) and this portfolio" },
  { name: "Tailwind CSS", category: "Frontend", level: "proficient", evidence: "Design system for the trading terminal and this site" },
  { name: "Framer Motion", category: "Frontend", level: "working", evidence: "Animations across the terminal and React clients" },
  { name: "Recharts", category: "Frontend", level: "working", evidence: "Charts in the arbitrage terminal" },

  // Data & ML
  { name: "pandas / NumPy", category: "Data & ML", level: "proficient", evidence: "Credit-risk pipeline on 32k records, data cleaning" },
  { name: "scikit-learn", category: "Data & ML", level: "proficient", evidence: "Three-model comparison with hyperparameter search" },
  { name: "XGBoost", category: "Data & ML", level: "working", evidence: "Tuned gradient boosting, feature-importance analysis" },
  { name: "Parallel computing", category: "Data & ML", level: "working", evidence: "MATLAB parfor scaling analysis, measured 7-processor conclusion" },
  { name: "ROC-AUC / PR evaluation", category: "Data & ML", level: "proficient", evidence: "Threshold-independent metrics for imbalanced classification" },

  // Infrastructure
  { name: "Docker", category: "Infrastructure", level: "proficient", evidence: "Multi-service compose: app + Postgres + Redis + Prometheus + Grafana" },
  { name: "Prometheus / Grafana", category: "Infrastructure", level: "working", evidence: "Metrics with fallback registry, auto-provisioned dashboards" },
  { name: "PostgreSQL / Redis", category: "Infrastructure", level: "working", evidence: "Async Postgres option, Redis with in-memory fallback" },
  { name: "Git", category: "Infrastructure", level: "working", evidence: "Version control across coursework repos (a focus area to deepen)" },
  { name: "Firebase", category: "Infrastructure", level: "working", evidence: "Auth + Realtime Database in the MAUI TodoApp" },

  // Security
  { name: "Authentication (bcrypt/JWT)", category: "Security", level: "proficient", evidence: "Full progression from plaintext to bcrypt to JWT to RBAC" },
  { name: "HMAC request signing", category: "Security", level: "working", evidence: "Hand-written HMAC-SHA512 VALR client, HMAC-SHA256 for MEXC" },
  { name: "Network reconnaissance", category: "Security", level: "working", evidence: "TCP connect scanners, banner grabbing, Dockerised target lab" },
  { name: "Secure design", category: "Security", level: "proficient", evidence: "Layered confirmation gates, log redaction, Fernet vault" },

  // Practices
  { name: "Distributed reliability", category: "Practices", level: "proficient", evidence: "Circuit breaker, DLQ, watchdog, graceful shutdown, chaos testing" },
  { name: "Automated testing", category: "Practices", level: "working", evidence: "228 async tests in the arbitrage engine (bimodal across projects)" },
  { name: "Dependency injection", category: "Practices", level: "proficient", evidence: "Lifespan-wired services, no import-time singletons" },
  { name: "Technical writing", category: "Practices", level: "advanced", evidence: "Comments that name the failure they prevent; honest READMEs" },
];

export const skillCategories = [
  "Languages",
  "Backend",
  "Frontend",
  "Data & ML",
  "Infrastructure",
  "Security",
  "Practices",
];

export const timeline: TimelineEvent[] = [
  { date: "Sep 2019", title: "Started BTEC IT Diploma", description: "UTC Swindon — foundation in IT, networking, and software.", type: "education" },
  { date: "Sep 2021", title: "Began BSc Computer Science", description: "Coventry University.", type: "education" },
  { date: "Mar 2023", title: "Parallel HPC big-data project", description: "MATLAB parallel analysis of atmospheric forecast data with a fault-injection test harness.", type: "project" },
  { date: "Jul 2023", title: "First ML experiment", description: "An LSTM text-generator tutorial I didn't yet understand — the honest starting point.", type: "project" },
  { date: "Aug 2023", title: "Shipped a chatbot with real users", description: "Botpress booking/FAQ assistant: 18 sessions, 49 messages in its first launch.", type: "project" },
  { date: "Oct 2023", title: "Applied security coursework", description: "Port scanners, a Dockerised pentest lab, and an auth progression to JWT + RBAC.", type: "project" },
  { date: "Dec 2023", title: "Director, Custom AI", description: "Building AI assistants and digital solutions for small-business clients.", type: "work" },
  { date: "2024", title: ".NET MAUI TodoApp", description: "Cross-platform mobile app with Firebase auth and Realtime Database.", type: "project" },
  { date: "Jun 2024", title: "Graduated BSc Computer Science", description: "Coventry University.", type: "education" },
  { date: "2024", title: "CompTIA certifications", description: "IT Fundamentals+, Network+, Cloud+ (A+ in progress).", type: "certification" },
  { date: "2026", title: "SA Arbitrage Engine + Terminal", description: "16k-line async trading platform with 228 tests, chaos testing, and a companion TypeScript terminal.", type: "project" },
  { date: "2026", title: "LivePoll + job automation", description: "A hexagonal FastAPI service and a dependency-free agent harness — both safety-first by design.", type: "project" },
];
