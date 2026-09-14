import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const link = (href: string, label: string) => (
    <Link
      key={href}
      href={href}
      style={{ display: 'block', padding: '10px 14px', borderRadius: 8, background: '#262a35', color: '#e8ecf4', marginBottom: 8 }}
    >
      {label}
    </Link>
  );
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{ width: 220, background: '#1c1f2a', padding: 20 }}>
        <p style={{ color: '#00f0ff', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>Security Cat</p>
        <nav style={{ marginTop: 16 }}>
          {link('/dashboard', 'Dashboard (FR-02)')}
          {link('/dashboard/analytics', 'Analytics')}
          {link('/', 'Landing')}
        </nav>
      </aside>
      <section style={{ flex: 1, padding: 32 }}>{children}</section>
    </div>
  );
}
