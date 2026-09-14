import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | Security Cat',
  description: 'Halaman login dummy Security Cat. Cookie uns_session dipakai middleware untuk proteksi /dashboard.',
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ auth_error?: string }>;
}) {
  const params = await searchParams;
  return (
    <main style={{ maxWidth: 480, margin: '0 auto', padding: '64px 20px' }}>
      <h1>Login Dummy</h1>
      <p style={{ color: '#89ceff' }}>Isi form apa saja. Data tidak dikirim ke mana pun (dummy).</p>
      {params?.auth_error === '1' && (
        <p style={{ background: '#262a35', border: '1px solid #00f0ff', padding: 12, borderRadius: 8 }}>
          Akses dashboard butuh sesi. Silakan login dulu (dummy).
        </p>
      )}
      <form
        style={{ display: 'grid', gap: 12, background: '#1c1f2a', padding: 20, borderRadius: 12, marginTop: 16 }}
      >
        <label>
          NIM / Email
          <input
            name="user"
            placeholder="cth: 230101001"
            style={{ display: 'block', width: '100%', marginTop: 6, padding: 10, borderRadius: 8, border: '1px solid #262a35', background: '#0f131d', color: '#e8ecf4' }}
          />
        </label>
        <label>
          Kata sandi (dummy)
          <input
            type="password"
            name="pass"
            placeholder="••••••"
            style={{ display: 'block', width: '100%', marginTop: 6, padding: 10, borderRadius: 8, border: '1px solid #262a35', background: '#0f131d', color: '#e8ecf4' }}
          />
        </label>
        <button
          type="submit"
          formAction="/dashboard"
          style={{ background: '#00f0ff', color: '#0f131d', padding: 12, borderRadius: 8, fontWeight: 700, border: 0 }}
        >
          Masuk (dummy)
        </button>
      </form>
    </main>
  );
}
