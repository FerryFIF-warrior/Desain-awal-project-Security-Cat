import TaskDashboardReact19 from './components/TaskDashboardReact19.jsx';
import TaskTable from './components/TaskTable.jsx';

export default function App() {
  return (
    <div className="page">
      <header className="hero">
        <p className="kicker">Security Cat / CyberAttack Simulator Edu — Modul 5</p>
        <h1>Framework Modern UI <span>· React 19</span></h1>
        <p className="sub">Dashboard (FR-02/FR-12) · Form Entry (FR-03) · Data Table (FR-04/FR-10). Semua data dummy.</p>
      </header>
      <main className="grid">
        <TaskDashboardReact19 />
        <TaskTable />
      </main>
      <footer className="foot">UNS Vokasi D3 TI Madiun · React 19 + Vite · tanpa Tailwind agar bundle kecil</footer>
    </div>
  );
}
