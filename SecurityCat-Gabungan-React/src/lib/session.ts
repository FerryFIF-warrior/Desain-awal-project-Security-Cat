// Modul 6 middleware.ts (cookie uns_session) versi klien untuk SPA Vite.
// Server Next mencegat request; di sini ProtectedRoute mencegat render.
const KEY = "uns_session";

export function getSession(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function setSession(value?: string): void {
  try {
    localStorage.setItem(KEY, value ?? "dummy-session");
  } catch {
    /* abaikan */
  }
}

export function clearSession(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* abaikan */
  }
}
