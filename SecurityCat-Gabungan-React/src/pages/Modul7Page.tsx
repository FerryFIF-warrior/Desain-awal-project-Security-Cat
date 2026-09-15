import { Link } from "react-router-dom";
import { useDocumentTitle } from "../lib/meta.js";
import TaskDashboard from "../modul7/TaskDashboard";

// Halaman demo Modul 7: isi asli folder SecurityCat-Modul7-State (JS, bukan TSX).
export default function Modul7Page() {
  useDocumentTitle("Modul 7 — State Management | Security Cat");
  return (
    <div className="page full">
      <div className="actions">
        <Link className="btn" to="/">
          ← Landing
        </Link>
      </div>
      <TaskDashboard />
    </div>
  );
}
