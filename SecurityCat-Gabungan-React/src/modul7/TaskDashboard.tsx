import { type FormEvent, useEffect, useMemo, useState } from "react";
import type { Task } from "./taskApi";
import { useCreateTaskMutation, useTasksQuery } from "./useTasksQuery";
import type { Category, UIState } from "./useUIStore";
import { useUIStore } from "./useUIStore";

// Asli dari Modul 7: src/components/TaskDashboard.tsx
const CATEGORIES: Category[] = ["semua", "aktif", "selesai"];

function filterBy(tasks: Task[], category: Category): Task[] {
  if (category === "aktif") return tasks.filter((x) => !x.completed);
  if (category === "selesai") return tasks.filter((x) => x.completed);
  return tasks;
}

export default function TaskDashboard(): React.JSX.Element {
  // Selector presisi per-field: komponen hanya re-render saat field itu berubah.
  const isSidebarOpen = useUIStore((s: UIState) => s.isSidebarOpen);
  const selectedCategory = useUIStore((s: UIState) => s.selectedCategory);
  const themeMode = useUIStore((s: UIState) => s.themeMode);
  const toggleSidebar = useUIStore((s: UIState) => s.toggleSidebar);
  const setSelectedCategory = useUIStore((s: UIState) => s.setSelectedCategory);
  const toggleTheme = useUIStore((s: UIState) => s.toggleTheme);

  const { data, error, isError, isLoading, refetch } = useTasksQuery();
  const createMut = useCreateTaskMutation();
  const [title, setTitle] = useState<string>("");

  const tasks = useMemo(() => filterBy(data ?? [], selectedCategory), [data, selectedCategory]);
  const total = data?.length ?? 0;

  // Tema global: tempel di <html> agar body + seluruh halaman ikut terang/gelap,
  // bukan cuma panel modul7.
  useEffect(() => {
    document.documentElement.dataset.theme = themeMode;
  }, [themeMode]);

  const submit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const t = title.trim();
    if (t === "") return;
    createMut.mutate({ completed: false, title: t, userId: 1 }, { onSuccess: () => setTitle("") });
  };

  return (
    <div className="modul7-scope" data-theme={themeMode}>
      <header className="topbar">
        <button className="btn" onClick={toggleSidebar} type="button">
          {isSidebarOpen ? "Tutup" : "Buka"} sidebar
        </button>
        <div className="brand">
          <span className="brand-dot" />
          SecurityCat · Modul 7 · <span className="mono">Zustand × TanStack Query</span>
        </div>
        <button className="btn" onClick={toggleTheme} type="button">
          Tema: {themeMode}
        </button>
      </header>

      <div className="layout">
        {isSidebarOpen && (
          <aside className="sidebar">
            <p className="side-title">Kategori (Zustand)</p>
            {CATEGORIES.map((c) => (
              <button
                className={c === selectedCategory ? "chip chip-on" : "chip"}
                key={c}
                onClick={() => setSelectedCategory(c)}
                type="button"
              >
                {c}
              </button>
            ))}
            <p className="side-note">Total dari server: {total}</p>
          </aside>
        )}

        <main className="content">
          <form className="form-row" onSubmit={submit}>
            <input
              className="input"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Judul tugas dummy baru…"
              value={title}
            />
            <button className="btn primary" disabled={createMut.isPending} type="submit">
              {createMut.isPending ? "Menyimpan…" : "Tambah"}
            </button>
          </form>
          {createMut.isError && (
            <div className="banner" role="alert">
              Gagal menambah: {createMut.error?.message}
            </div>
          )}

          {isLoading && (
            <div role="status" aria-label="Memuat tugas">
              {Array.from({ length: 6 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton statis, urutan tidak berubah
                <div className="skeleton" key={i} />
              ))}
            </div>
          )}

          {isError && !isLoading && (
            <div className="banner" role="alert">
              Gagal memuat tugas: {error?.message}{" "}
              <button className="btn" onClick={() => refetch()} type="button">
                Coba lagi
              </button>
            </div>
          )}

          {!isLoading && !isError && tasks.length === 0 && (
            <div className="empty">
              <p className="empty-title">Tidak ada tugas pada kategori “{selectedCategory}”.</p>
              <p className="empty-sub">Ubah filter kategori atau tambah tugas dummy baru.</p>
            </div>
          )}

          {!isLoading && !isError && tasks.length > 0 && (
            <ul className="list">
              {tasks.map((t) => (
                <li className="card" key={t.id}>
                  <span className={t.completed ? "badge badge-done" : "badge badge-todo"}>
                    {t.completed ? "selesai" : "aktif"}
                  </span>
                  <span className="task-title">{t.title}</span>
                  <span className="mono task-id">#{t.id}</span>
                </li>
              ))}
            </ul>
          )}
        </main>
      </div>
    </div>
  );
}
