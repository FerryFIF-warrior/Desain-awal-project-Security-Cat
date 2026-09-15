import { type FormEvent, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDocumentTitle } from "../lib/meta";
import { setSession } from "../lib/session";

// Tiruan app/login/page.tsx Modul 6: login dummy -> set sesi -> /dashboard.
export default function LoginPage(): React.JSX.Element {
  useDocumentTitle("Login | Security Cat");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<string>("");
  const authError = searchParams.get("auth_error") === "1";

  function submit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    setSession(user.trim() || "dummy-session");
    navigate("/dashboard", { replace: true });
  }

  return (
    <main className="page narrow">
      <h1>Login Dummy</h1>
      <p className="sub">Isi form apa saja. Data tidak dikirim ke mana pun (dummy).</p>
      {authError && (
        <p className="banner">Akses dashboard butuh sesi. Silakan login dulu (dummy).</p>
      )}
      <form className="card form-col" onSubmit={submit}>
        <label>
          NIM / Email
          <input
            className="input"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="cth: 230101001"
          />
        </label>
        <label>
          Kata sandi (dummy)
          <input className="input" type="password" placeholder="••••••" />
        </label>
        <button className="btn primary" type="submit">
          Masuk (dummy)
        </button>
      </form>
    </main>
  );
}
