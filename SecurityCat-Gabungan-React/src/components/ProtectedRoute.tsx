import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getSession } from "../lib/session";

// Tiruan middleware.ts Modul 6: tanpa sesi -> /login?auth_error=1
export default function ProtectedRoute(): React.JSX.Element {
  const location = useLocation();
  if (!getSession()) {
    return <Navigate to="/login?auth_error=1" replace state={{ from: location.pathname }} />;
  }
  return <Outlet />;
}
