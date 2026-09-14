import { useMemo, useState } from 'react';
import { useCreateTaskMutation, useTasksQuery } from '../hooks/useTasksQuery';
import { useUIStore, type SelectedCategory } from '../store/useUIStore';
import type { Task } from '../types/task';

const CATEGORIES: SelectedCategory[] = ['semua', 'aktif', 'selesai'];

function filterBy(t: Task[], c: SelectedCategory): Task[] {
  if (c === 'aktif') return t.filter((x) => !x.completed);
  if (c === 'selesai') return t.filter((x) => x.completed);
  return t;
}

export default function TaskDashboard() {
  // Selector presisi per-field: komponen hanya re-render saat field itu berubah.
  const isSidebarOpen = useUIStore((s) => s.isSidebarOpen);
  const selectedCategory = useUIStore((s) => s.selectedCategory);
  const themeMode = useUIStore((s) => s.themeMode);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const setSelectedCategory = useUIStore((s) => s.setSelectedCategory);
  const toggleTheme = useUIStore((s) => s.toggleTheme);

  const { data, error, isError, isLoading, refetch } = useTasksQuery();
  const createMut = useCreateTaskMutation();
  const [title, setTitle] = useState('');

  const tasks = useMemo(() => filterBy(data ?? [], selectedCategory), [data, selectedCategory]);
  const total = data?.length ?? 0;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const t = title.trim();
    if (t === '') return;
    createMut.mutate(
      { completed: false, title: t, userId: 1 },
      { onSuccess: () => setTitle('') },
    );
  };

  return (
    <div className="app" data-theme={themeMode}>
      <header className="topbar">
        <button className="btn" onClick={toggleSidebar} type="button">
          {isSidebarOpen ? 'Tutup' : 'Buka'} sidebar
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
                className={c === selectedCategory ? 'chip chip-on' : 'chip'}
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
          <form className="row" onSubmit={submit}>
            <input
              className="input"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Judul tugas dummy baru…"
              value={title}
            />
            <button className="btn btn-primary" disabled={createMut.isPending} type="submit">
              {createMut.isPending ? 'Menyimpan…' : 'Tambah'}
            </button>
          </form>
          {createMut.isError && (
            <div className="banner banner-err" role="alert">
              Gagal menambah: {createMut.error.message}
            </div>
          )}

          {isLoading && (
            <div aria-busy="true" aria-label="Memuat tugas">
              {Array.from({ length: 6 }).map((_, i) => (
                <div className="skeleton" key={i} />
              ))}
            </div>
          )}

          {isError && !isLoading && (
            <div className="banner banner-err" role="alert">
              Gagal memuat tugas: {(error as Error).message}{' '}
              <button className="btn" onClick={() => void refetch()} type="button">
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
                  <span className={t.completed ? 'badge badge-done' : 'badge badge-todo'}>
                    {t.completed ? 'selesai' : 'aktif'}
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
