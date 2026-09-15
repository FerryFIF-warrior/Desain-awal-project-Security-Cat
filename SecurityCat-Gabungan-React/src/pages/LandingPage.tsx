import { Link } from "react-router-dom";
import TaskFormClient from "../components/TaskFormClient";
import { useDocumentTitle } from "../lib/meta.js";

// Tiruan app/page.tsx Modul 6: landing + form entry client component.
export default function LandingPage() {
  useDocumentTitle("Security Cat | CyberAttack Simulator Edu");
  return (
    <main className="page narrow">
      <p className="kicker">UNS Vokasi D3 TI Madiun</p>
      <h1>
        Security Cat <span>CyberAttack Simulator Edu</span>
      </h1>
      <p className="sub">
        Belajar keamanan siber lewat simulasi dummy: dashboard progres, modul materi, dan kuis.
        Tanpa kode serangan nyata.
      </p>
      <div className="actions">
        <Link className="btn primary" to="/dashboard">
          Buka Dashboard
        </Link>
        <Link className="btn" to="/login">
          Login Dummy
        </Link>
        <Link className="btn" to="/modul5">
          Demo Modul 5
        </Link>
        <Link className="btn" to="/modul7">
          Demo Modul 7
        </Link>
      </div>
      <section className="card">
        <h2>Form Entry (FR-03) — Client Component + Zod</h2>
        <TaskFormClient />
      </section>
    </main>
  );
}
