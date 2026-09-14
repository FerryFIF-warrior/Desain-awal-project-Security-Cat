import Link from 'next/link';
import TaskFormClient from '../components/TaskFormClient';

export default function Home() {
  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '48px 20px' }}>
      <p style={{ color: '#00f0ff', fontFamily: 'JetBrains Mono, monospace' }}>UNS Vokasi D3 TI Madiun</p>
      <h1 style={{ fontSize: 40, margin: '8px 0' }}>
        Security Cat <span style={{ color: '#6ffbbe' }}>CyberAttack Simulator Edu</span>
      </h1>
      <p style={{ color: '#89ceff' }}>
        Belajar keamanan siber lewat simulasi dummy: dashboard progres, modul materi, dan kuis. Tanpa
        kode serangan nyata.
      </p>
      <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
        <Link
          href="/dashboard"
          style={{ background: '#00f0ff', color: '#0f131d', padding: '10px 18px', borderRadius: 8, fontWeight: 700 }}
        >
          Buka Dashboard
        </Link>
        <Link
          href="/login"
          style={{ border: '1px solid #262a35', background: '#1c1f2a', color: '#e8ecf4', padding: '10px 18px', borderRadius: 8 }}
        >
          Login Dummy
        </Link>
      </div>
      <section style={{ marginTop: 40, background: '#1c1f2a', borderRadius: 12, padding: 20 }}>
        <h2>Form Entry (FR-03) — Client Component + Zod</h2>
        <TaskFormClient />
      </section>
    </main>
  );
}
