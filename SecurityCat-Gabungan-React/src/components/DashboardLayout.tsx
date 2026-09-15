import { Link, Outlet, useNavigate } from "react-router-dom";
import { clearSession } from "../lib/session";

// Tiruan app/dashboard/layout.tsx Modul 6: nested layout + sidebar bersama.
export default function DashboardLayout(): React.JSX.Element {
  const navigate = useNavigate();
  const link = (to: string, label: string): React.JSX.Element => (
    <Link key={to} to={to} className="side-link">
      {label}
    </Link>
  );

  function logout(): void {
    clearSession();
    navigate("/login", { replace: true });
  }

  return (
    <div className="dash">
      <aside className="dash-side">
        <p className="brand">Security Cat</p>
        <nav>
          {link("/dashboard", "Dashboard (FR-02)")}
          {link("/dashboard/analytics", "Analytics")}
          {link("/", "Landing")}
        </nav>
        <button className="btn" onClick={logout} type="button">
          Logout (hapus sesi)
        </button>
      </aside>
      <section className="dash-main">
        <Outlet />
      </section>
    </div>
  );
}
