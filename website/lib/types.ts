export type BenchStatus = "active" | "coming-soon";

export interface Bench {
  id: string;
  stage: number;
  code: string;
  name: string;
  status: BenchStatus;
  short: string;
  description: string;
  arxiv?: string;
  arxivUrl?: string;
  repoUrl?: string;
  datasetUrl?: string;
  focusAreas: string[];
}

export interface BenchData {
  series: { name: string; full: string; tagline: string };
  benches: Bench[];
}

export interface TaskEnv {
  cpus: number | null;
  memoryMb: number | null;
  gpus: number | null;
  allowInternet: boolean | null;
}

export interface Task {
  bench: string;
  slug: string;
  taskId: string | null;
  summary: string;
  motivation: string;
  difficulty: string;
  category: string;
  tags: string[];
  author: string | null;
  instruction: string;
  env: TaskEnv;
}

export interface TasksData {
  generatedAt: string;
  count: number;
  tasks: Task[];
}

export interface LeaderboardCategory {
  key: string;
  label: string;
}

export interface LeaderboardRow {
  harness: string;
  model: string;
  context: number;
  mindset: number;
  interaction: number;
  handsOn: number;
  overall: number;
}

export interface LeaderboardData {
  metric: string;
  note: string;
  categories: LeaderboardCategory[];
  orgs: Record<string, string>;
  rows: LeaderboardRow[];
}
