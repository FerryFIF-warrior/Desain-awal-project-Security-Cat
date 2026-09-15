import { Link, useSearchParams } from "react-router-dom";
import { useDocumentTitle } from "../lib/meta.js";

// Tiruan app/dashboard/analytics/page.tsx Modul 6: metadata dinamis via query ?range=.
export default function AnalyticsPage() {
  const [searchParams] = useSearchParams();
  const range = searchParams.get("range") ?? "7d";
  useDocumentTitle(`Analytics ${range} | Security Cat`);

  return (
    <div>
      <h1>Analytics Dummy</h1>
      <p className="sub">
        Rentang aktif: <b className="green">{range}</b>
      </p>
      <div className="actions">
        {["7d", "30d", "90d"].map((r) => (
          <Link key={r} className="btn" to={`/dashboard/analytics?range=${r}`}>
            {r}
          </Link>
        ))}
      </div>
    </div>
  );
}
