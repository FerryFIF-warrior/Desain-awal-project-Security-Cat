import type { Metadata } from 'next';

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<{ range?: string }>;
}): Promise<Metadata> {
  const range = (await searchParams)?.range ?? '7d';
  return {
    title: `Analytics ${range} | Security Cat`,
    description: `Ringkasan progres belajar dummy rentang ${range} (FR-02, FR-12, FR-14).`,
  };
}

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams?: Promise<{ range?: string }>;
}) {
  const range = (await searchParams)?.range ?? '7d';
  return (
    <div>
      <h1>Analytics Dummy</h1>
      <p style={{ color: '#89ceff' }}>
        Metadata dinamis via generateMetadata. Rentang aktif: <b style={{ color: '#6ffbbe' }}>{range}</b>
      </p>
      <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
        {['7d', '30d', '90d'].map((r) => (
          <a
            key={r}
            href={`/dashboard/analytics?range=${r}`}
            style={{ background: '#1c1f2a', border: '1px solid #262a35', color: '#00f0ff', padding: '8px 14px', borderRadius: 8 }}
          >
            {r}
          </a>
        ))}
      </div>
    </div>
  );
}
