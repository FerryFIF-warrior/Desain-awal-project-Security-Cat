'use client';

export default function DashboardError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{ background: '#1c1f2a', padding: 24, borderRadius: 12 }}>
      <h1>Dashboard gagal dimuat</h1>
      <p style={{ color: '#89ceff' }}>{error.message}</p>
      <button
        onClick={() => reset()}
        style={{ background: '#00f0ff', color: '#0f131d', padding: '10px 18px', borderRadius: 8, fontWeight: 700, border: 0 }}
      >
        Coba lagi
      </button>
    </div>
  );
}
