// assets/tasks-store.js — state klien + fetch mock (Modul 1-2)
// ponytail: localStorage saja; upgrade ke backend API saat backend FastAPI siap.
(() => {
  'use strict';

  const KEY = 'sc_tasks_v1';

  const seed = [
    { id: 1, title: 'Pelajari modul Phishing & header spoofing', category: 'Pemrograman Web', priority: 'Tinggi', status: 'Aktif', createdAt: '09:00' },
    { id: 2, title: 'Simulasi Brute Force + rate limiting', category: 'Rekayasa Perangkat Lunak', priority: 'Sedang', status: 'Aktif', createdAt: '10:30' },
    { id: 3, title: 'Kuis SQL Injection mode Protected', category: 'Basis Data', priority: 'Rendah', status: 'Selesai', createdAt: '13:15' }
  ];

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) { localStorage.setItem(KEY, JSON.stringify(seed)); return [...seed]; }
      const data = JSON.parse(raw);
      return Array.isArray(data) ? data : [...seed];
    } catch { return [...seed]; }
  }

  function save(tasks) {
    try { localStorage.setItem(KEY, JSON.stringify(tasks)); } catch { /* abaikan */ }
  }

  function addTask({ title, category, priority }) {
    const tasks = load();
    const t = {
      id: Date.now(),
      title: String(title).trim(),
      category, priority, status: 'Aktif',
      createdAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };
    tasks.unshift(t);
    save(tasks);
    return t;
  }

  function deleteTask(id) {
    const tasks = load().filter((t) => t.id !== id);
    save(tasks);
    return tasks;
  }

  function toggleStatus(id) {
    const tasks = load().map((t) => (t.id === id ? { ...t, status: t.status === 'Selesai' ? 'Aktif' : 'Selesai' } : t));
    save(tasks);
    return tasks;
  }

  // Fetch mock -> struktur tugas SRS (FR-03 materi / FR-10 kuis)
  async function fetchMockTasks(limit = 3) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    const data = await res.json();
    return data.map((item) => ({
      id: Date.now() + item.id,
      title: item.title,
      category: 'Pemrograman Web',
      priority: item.completed ? 'Rendah' : 'Tinggi',
      status: item.completed ? 'Selesai' : 'Aktif',
      createdAt: 'API Fetch'
    }));
  }

  function mergeMock(tasks, fetched) {
    const merged = [...fetched, ...tasks];
    save(merged);
    return merged;
  }

  window.SecurityCatTasks = { load, save, addTask, deleteTask, toggleStatus, fetchMockTasks, mergeMock };
})();
