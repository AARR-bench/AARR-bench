// Generates website/data/tasks.generated.json from the AARRI-bench task folders.
// Reads task.toml + instruction.md only. Never touches solution/ or tests/.
import { readFileSync, readdirSync, statSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseToml } from "smol-toml";

const __dirname = dirname(fileURLToPath(import.meta.url));
const websiteRoot = resolve(__dirname, "..");
const repoRoot = resolve(websiteRoot, "..");

// Map each bench id to its tasks directory. Add AARRA/AARRS here when they exist.
const BENCHES = [
  { id: "aarri", tasksDir: resolve(repoRoot, "AARRI-bench", "tasks") },
];

function safeRead(path) {
  try {
    return readFileSync(path, "utf8");
  } catch {
    return null;
  }
}

function isDir(path) {
  try {
    return statSync(path).isDirectory();
  } catch {
    return false;
  }
}

function collectTasks(bench) {
  if (!isDir(bench.tasksDir)) {
    console.warn(`[generate-tasks] tasks dir not found for ${bench.id}: ${bench.tasksDir}`);
    return [];
  }

  const entries = readdirSync(bench.tasksDir).filter((name) =>
    isDir(join(bench.tasksDir, name)),
  );

  const tasks = [];
  for (const slug of entries) {
    const taskDir = join(bench.tasksDir, slug);
    const tomlRaw = safeRead(join(taskDir, "task.toml"));
    if (!tomlRaw) continue;

    let meta = {};
    try {
      const parsed = parseToml(tomlRaw);
      meta = parsed.metadata ?? {};
      var environment = parsed.environment ?? {};
    } catch (err) {
      console.warn(`[generate-tasks] failed to parse ${slug}/task.toml: ${err.message}`);
      continue;
    }

    const instruction = safeRead(join(taskDir, "instruction.md")) ?? "";

    tasks.push({
      bench: bench.id,
      slug,
      taskId: meta.task_id ?? null,
      summary: meta.summary ?? "",
      motivation: meta.motivation ?? "",
      difficulty: (meta.difficulty ?? "unknown").toLowerCase(),
      category: meta.category ?? "uncategorized",
      tags: Array.isArray(meta.tags) ? meta.tags : [],
      author: meta.author_name ?? null,
      instruction,
      env: {
        cpus: environment.cpus ?? null,
        memoryMb: environment.memory_mb ?? null,
        gpus: environment.gpus ?? null,
        allowInternet: environment.allow_internet ?? null,
      },
    });
  }

  tasks.sort((a, b) => a.slug.localeCompare(b.slug));
  return tasks;
}

const allTasks = [];
for (const bench of BENCHES) {
  allTasks.push(...collectTasks(bench));
}

const dataDir = join(websiteRoot, "data");
mkdirSync(dataDir, { recursive: true });

// Resilience: if no tasks were found (e.g. the benchmark content is not present
// in this checkout) but a previously generated file exists, keep it rather than
// overwriting the site with an empty registry.
const outFile = join(dataDir, "tasks.generated.json");
if (allTasks.length === 0) {
  const existing = safeRead(outFile);
  if (existing) {
    console.warn(
      "[generate-tasks] no tasks found; keeping existing tasks.generated.json",
    );
    process.exit(0);
  }
}

const output = {
  generatedAt: new Date().toISOString(),
  count: allTasks.length,
  tasks: allTasks,
};

writeFileSync(
  outFile,
  JSON.stringify(output, null, 2),
  "utf8",
);

console.log(`[generate-tasks] wrote ${allTasks.length} tasks to data/tasks.generated.json`);
