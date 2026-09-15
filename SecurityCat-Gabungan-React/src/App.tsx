import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./components/ProtectedRoute";
import AnalyticsPage from "./pages/AnalyticsPage";
import DashboardPage from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import Modul5Page from "./pages/Modul5Page";
import Modul7Page from "./pages/Modul7Page";

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/modul5" element={<Modul5Page />} />
        <Route path="/modul7" element={<Modul7Page />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
          </Route>
        </Route>
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </ErrorBoundary>
  );
}
