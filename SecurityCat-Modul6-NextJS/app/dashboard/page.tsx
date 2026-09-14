import { Suspense } from 'react';
import TaskListFetcher from '../../components/TaskListFetcher';

export default async function DashboardPage() {
  return (
    <div>
      <h1>Dashboard Progres (FR-02)</h1>
      <p style={{ color: '#89ceff' }}>RSC async + streaming: daftar tugas dummy dimuat via Suspense.</p>
      <Suspense fallback={<p style={{ color: '#00f0ff' }}>Streaming daftar tugas…</p>}>
        <TaskListFetcher />
      </Suspense>
    </div>
  );
}
