import { useEffect, useState } from "react";
import { z } from "zod";

// Skema respons JSONPlaceholder untuk TaskTable (strict, bukan any).
const TodoSchema = z.object({
  completed: z.boolean(),
  id: z.number().int(),
  title: z.string(),
});

interface TaskRow {
  id: number;
  materi: string;
  simulator: string;
  kuis: string;
}

// Asli dari Modul 5: src/components/TaskTable.jsx
export default function TaskTable(): React.JSX.Element {
  const [rows, setRows] = useState<TaskRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const r = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const raw: unknown = await r.json();
        const todos = z.array(TodoSchema).parse(raw);
        // Petakan ke struktur task SRS: id, title (materi FR-03), status (simulator FR-04), skor (kuis FR-10)
        if (alive)
          setRows(
            todos.map((t) => ({
              id: t.id,
              materi: t.title,
              simulator: t.id % 2 ? "Phishing (FR-04)" : "Brute Force (FR-04)",
              kuis: t.completed ? "Lulus (FR-10)" : "Belum (FR-10)",
            })),
          );
      } catch (e) {
        if (alive)
          setError(`Gagal memuat data dummy: ${e instanceof Error ? e.message : String(e)}`);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section className="card">
      <h2>
        Data Table <small>FR-04 · FR-10</small>
      </h2>
      {loading && <p className="muted">Memuat data dummy…</p>}
      {error && (
        <p className="err" role="alert">
          {error}
        </p>
      )}
      {!loading && !error && (
        <table className="tbl">
          <thead>
            <tr>
              <th>ID</th>
              <th>Materi</th>
              <th>Simulator</th>
              <th>Kuis</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.materi}</td>
                <td>{r.simulator}</td>
                <td>{r.kuis}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
