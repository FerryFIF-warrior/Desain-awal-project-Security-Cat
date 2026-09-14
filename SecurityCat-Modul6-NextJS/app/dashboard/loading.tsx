export default function DashboardLoading() {
  return (
    <div>
      <h1>Dashboard</h1>
      <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ background: '#1c1f2a', borderRadius: 12, padding: 20 }}>
            <div style={{ height: 16, width: '40%', background: '#262a35', borderRadius: 6 }} />
            <div style={{ height: 12, width: '70%', background: '#262a35', borderRadius: 6, marginTop: 10 }} />
          </div>
        ))}
        <p style={{ color: '#89ceff', fontFamily: 'JetBrains Mono, monospace' }}>Memuat data dummy… (streaming)</p>
      </div>
    </div>
  );
}
