import tasksJson from "@/data/tasks.generated.json";
import benchesJson from "@/data/benches.json";
import leaderboardJson from "@/data/leaderboard.json";
import type {
  Bench,
  BenchData,
  LeaderboardData,
  LeaderboardRow,
  Task,
  TasksData,
} from "./types";

const tasksData = tasksJson as TasksData;
const benchData = benchesJson as BenchData;
const leaderboardData = leaderboardJson as LeaderboardData;

export function getAllTasks(): Task[] {
  return tasksData.tasks;
}

export function getTasksByBench(benchId: string): Task[] {
  return tasksData.tasks.filter((t) => t.bench === benchId);
}

export function getTask(benchId: string, slug: string): Task | undefined {
  return tasksData.tasks.find((t) => t.bench === benchId && t.slug === slug);
}

export function getTaskCount(benchId?: string): number {
  return benchId ? getTasksByBench(benchId).length : tasksData.count;
}

export function getCategories(benchId?: string): { name: string; count: number }[] {
  const tasks = benchId ? getTasksByBench(benchId) : getAllTasks();
  const map = new Map<string, number>();
  for (const t of tasks) map.set(t.category, (map.get(t.category) ?? 0) + 1);
  return [...map.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getDifficulties(benchId?: string): { name: string; count: number }[] {
  const tasks = benchId ? getTasksByBench(benchId) : getAllTasks();
  const order = ["easy", "medium", "hard"];
  const map = new Map<string, number>();
  for (const t of tasks) map.set(t.difficulty, (map.get(t.difficulty) ?? 0) + 1);
  return [...map.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));
}

export function getAllTags(benchId?: string): string[] {
  const tasks = benchId ? getTasksByBench(benchId) : getAllTasks();
  const set = new Set<string>();
  for (const t of tasks) for (const tag of t.tags) set.add(tag);
  return [...set].sort();
}

export function getBenchData(): BenchData {
  return benchData;
}

export function getBenches(): Bench[] {
  return benchData.benches;
}

export function getBench(id: string): Bench | undefined {
  return benchData.benches.find((b) => b.id === id);
}

export function getLeaderboard(): LeaderboardData {
  return leaderboardData;
}

export function getTopRows(n: number): LeaderboardRow[] {
  return [...leaderboardData.rows].sort((a, b) => b.overall - a.overall).slice(0, n);
}

export function getOrg(model: string): string {
  return leaderboardData.orgs[model] ?? "";
}
