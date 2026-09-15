import { useState } from "react";
import TaskForm from "./TaskForm";

// Asli dari Modul 5: src/components/TaskDashboardReact19.jsx
interface LocalTask {
  id: number;
  title: string;
  done: boolean;
  xp: number;
}

type Filter = "all" | "todo" | "done";

const seed: LocalTask[] = [
  { id: 1, title: "Selesaikan modul Phishing (FR-03)", done: true, xp: 50 },
  { id: 2, title: "Latihan simulasi Brute Force (FR-04)", done: false, xp: 40 },
  { id: 3, title: "Kuis keamanan sesi 1 (FR-10)", done: false, xp: 30 },
];

const FILTERS: Array<[Filter, string]> = [
  ["all", "Semua"],
  ["todo", "Belum"],
  ["done", "Selesai"],
];

export default function TaskDashboardReact19(): React.JSX.Element {
  const [tasks, setTasks] = useState<LocalTask[]>(seed);
  const [filter, setFilter] = useState<Filter>("all");
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");

  // React Compiler auto-memoize: filter inline di render, tanpa useMemo manual.
  const visible = tasks.filter((t) =>
    filter === "done" ? t.done : filter === "todo" ? !t.done : true,
  );
  const doneCount = tasks.filter((t) => t.done).length;
  const xp = tasks.filter((t) => t.done).reduce((s, t) => s + t.xp, 0); // FR-12 gamifikasi

  function handleAddTask(title: string): boolean {
    const name = (title ?? newTaskTitle).trim();
    if (!name) return false;
    setTasks((p) => [...p, { id: Date.now(), title: name, done: false, xp: 20 }]);
    setNewTaskTitle("");
    return true;
  }

  function toggleTask(id: number): void {
    setTasks((p) => p.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  return (
    <section className="card">
      <h2>
        Dashboard & Form Entry <small>FR-02 · FR-03 · FR-12</small>
      </h2>
      <p className="stat">
        Progress {doneCount}/{tasks.length} · XP {xp} · Difficulty (FR-14): Pemula
      </p>
      <TaskForm value={newTaskTitle} onChange={setNewTaskTitle} onSubmit={handleAddTask} />
      <div className="actions">
        {FILTERS.map(([v, l]) => (
          <button
            key={v}
            className={filter === v ? "btn primary" : "btn"}
            onClick={() => setFilter(v)}
            type="button"
          >
            {l}
          </button>
        ))}
      </div>
      <ul className="tasks">
        {visible.map((t) => (
          <li key={t.id} className={t.done ? "task done" : "task"}>
            <label>
              <input type="checkbox" checked={t.done} onChange={() => toggleTask(t.id)} /> {t.title}
            </label>
            <span className="xp">+{t.xp} XP</span>
          </li>
        ))}
      </ul>
      {visible.length === 0 && <p className="muted">Tidak ada tugas pada filter ini.</p>}
    </section>
  );
}
