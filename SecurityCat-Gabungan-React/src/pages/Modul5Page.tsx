import { Link } from "react-router-dom";
import { useDocumentTitle } from "../lib/meta.js";
import TaskDashboardReact19 from "../modul5/TaskDashboardReact19";
import TaskTable from "../modul5/TaskTable";

// Halaman demo Modul 5: isi asli folder SecurityCat-Modul5-Frameworks.
export default function Modul5Page() {
  useDocumentTitle("Modul 5 — Framework Modern UI (React 19) | Security Cat");
  return (
    <div className="page">
      <header className="hero">
        <p className="kicker">Security Cat / CyberAttack Simulator Edu — Modul 5</p>
        <h1>
          Framework Modern UI <span>· React 19</span>
        </h1>
        <p className="sub">
          Dashboard (FR-02/FR-12) · Form Entry (FR-03) · Data Table (FR-04/FR-10). Semua data dummy.
        </p>
        <div className="actions">
          <Link className="btn" to="/">
            ← Landing
          </Link>
        </div>
      </header>
      <main className="grid2">
        <TaskDashboardReact19 />
        <TaskTable />
      </main>
      <footer className="foot">
        UNS Vokasi D3 TI Madiun · React 19 + Vite · tanpa Tailwind agar bundle kecil
      </footer>
    </div>
  );
}
