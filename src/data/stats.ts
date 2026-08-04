/**
 * All figures derived from static analysis of the local codebase.
 * Line counts exclude node_modules, virtualenvs, and build output.
 */

export const languageUsage = [
  { name: "Python", lines: 17300, color: "#38bdf8" },
  { name: "TypeScript", lines: 6059, color: "#818cf8" },
  { name: "MATLAB", lines: 2813, color: "#34d399" },
  { name: "C#", lines: 1400, color: "#fbbf24" },
  { name: "JavaScript", lines: 1215, color: "#f472b6" },
  { name: "C++", lines: 317, color: "#fb923c" },
];

export const categoryBreakdown = [
  { name: "Trading systems", value: 22267 },
  { name: "Data & HPC", value: 3129 },
  { name: "Backend / APIs", value: 1594 },
  { name: "Mobile", value: 1400 },
  { name: "Automation", value: 419 },
  { name: "Security", value: 250 },
];

export const projectScores = [
  { project: "SA Arbitrage Engine", complexity: 9.5, architecture: 9.0, quality: 8.5, relevance: 9.0, testing: 8.5 },
  { project: "ZA Arb Terminal", complexity: 7.5, architecture: 8.5, quality: 8.0, relevance: 8.0, testing: 1.0 },
  { project: "Big-Data HPC", complexity: 7.0, architecture: 6.0, quality: 6.0, relevance: 7.0, testing: 7.0 },
  { project: "Job Automation", complexity: 5.0, architecture: 6.5, quality: 7.5, relevance: 7.5, testing: 1.0 },
  { project: "LivePoll API", complexity: 4.0, architecture: 8.5, quality: 8.5, relevance: 7.0, testing: 1.0 },
  { project: "Security Coursework", complexity: 5.5, architecture: 4.5, quality: 5.0, relevance: 8.0, testing: 1.0 },
];

export const headlineStats = [
  { label: "Lines of code analysed", value: "29,000+", detail: "Across 12 repositories and 20+ local projects" },
  { label: "Automated tests", value: "228", detail: "Async pytest suite in the arbitrage engine" },
  { label: "Exchanges integrated", value: "9", detail: "3 South African, 6 international venues" },
  { label: "Largest system", value: "16.2k lines", detail: "108 files across 12 architectural layers" },
];

export const testingCoverage = [
  { project: "SA Arbitrage Engine", tests: 228, files: 22, lines: 3603 },
  { project: "Big-Data HPC", tests: 2, files: 2, lines: 120 },
  { project: "ZA Arb Terminal", tests: 0, files: 0, lines: 0 },
  { project: "LivePoll API", tests: 0, files: 0, lines: 0 },
  { project: "Job Automation", tests: 0, files: 0, lines: 0 },
];

export const architecturePatterns = [
  "Dependency injection",
  "Adapter + registry",
  "Ports & adapters (hexagonal)",
  "Strategy",
  "Circuit breaker",
  "Bulkhead / quarantine",
  "Dead-letter queue",
  "Watchdog supervision",
  "Token-bucket rate limiting",
  "Graceful shutdown",
  "Chaos injection",
  "MVVM",
  "Repository",
  "Protocol-based structural typing",
];
