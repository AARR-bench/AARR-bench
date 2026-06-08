import type { Metadata } from "next";
import { TaskBrowser } from "@/components/TaskBrowser";
import { getCategories, getDifficulties, getTasksByBench } from "@/lib/data";

export const metadata: Metadata = {
  title: "Tasks",
  description:
    "Browse the AARRI-Bench task registry. Filter by category, difficulty, and tags.",
};

export default function TasksPage() {
  const tasks = getTasksByBench("aarri");
  const categories = getCategories("aarri");
  const difficulties = getDifficulties("aarri");

  return (
    <div className="container-px py-16">
      <div className="max-w-2xl">
        <p className="section-label">AARRI-Bench</p>
        <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
          Task Registry
        </h1>
        <p className="mt-4 text-lg text-slate-400">
          {tasks.length} containerized tasks targeting the cognitive gaps between
          AI agents and human researchers. Each task gives the agent only an
          instruction and its environment.
        </p>
      </div>

      <div className="mt-10">
        <TaskBrowser
          tasks={tasks}
          categories={categories}
          difficulties={difficulties}
        />
      </div>
    </div>
  );
}
