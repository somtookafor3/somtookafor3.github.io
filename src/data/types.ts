export type ProjectCategory =
  | "trading-systems"
  | "full-stack"
  | "backend"
  | "ai-ml"
  | "mobile"
  | "data"
  | "automation"
  | "cybersecurity";

export type Maturity = "production" | "functional" | "prototype" | "coursework";

export interface CodeSnippet {
  title: string;
  language: string;
  code: string;
  explanation: string;
}

export interface ProjectMetrics {
  linesOfCode?: number;
  commits?: number;
  firstCommit?: string;
  lastCommit?: string;
  files?: number;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  category: ProjectCategory;
  featured: boolean;
  rank: number;
  maturity: Maturity;
  period: string;
  stack: string[];
  overview: string;
  architecture: string[];
  highlights: string[];
  challenges: { problem: string; solution: string }[];
  lessons: string[];
  futureImprovements: string[];
  metrics: ProjectMetrics;
  snippets: CodeSnippet[];
  links?: { label: string; url: string }[];
}

export interface Skill {
  name: string;
  category: string;
  level: "advanced" | "proficient" | "working" | "familiar";
  evidence: string;
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  type: "education" | "work" | "project" | "certification";
}
