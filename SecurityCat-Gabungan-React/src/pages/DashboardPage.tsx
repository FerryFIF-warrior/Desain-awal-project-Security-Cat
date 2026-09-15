import { useEffect, useState } from "react";
import TaskListFetcher from "../components/TaskListFetcher";
import { useDocumentTitle } from "../lib/meta.js";

// Tiruan app/dashboard/page.tsx Modul 6: Suspense + loading fallback.
export function DashboardSkeleton() {
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="skel-grid">
        {[1, 2, 3].map((i) => (
          <div key={i} className="skel-card">
            <div className="skel-line w40" />
            <div className="skel-line w70" />
          </div>
        ))}
        <p className="mono">Memuat data dummy… (streaming)</p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  useDocumentTitle("Dashboard Tugas Mahasiswa | Security Cat");
  // Tiruan streaming Next (Suspense/loading.tsx): skeleton 800ms lalu tabel.
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 800);
    return () => clearTimeout(t);
  }, []);
  return (
    <div>
      <h1>Dashboard Progres (FR-02)</h1>
      <p className="sub">Fetch dummy bertahap: skeleton dulu lalu tabel (tiruan streaming SSR).</p>
      {ready ? <TaskListFetcher /> : <DashboardSkeleton />}
    </div>
  );
}
