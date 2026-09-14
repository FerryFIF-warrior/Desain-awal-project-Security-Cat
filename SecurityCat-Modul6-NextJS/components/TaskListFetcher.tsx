// Server Component: fetch dummy + delay (simulasi streaming)
const TASKS = [
  { id: 1, title: 'Modul 1: Pengenalan Phishing (FR-03)', progress: 100 },
  { id: 2, title: 'Simulator 1: Jejak Digital (FR-04)', progress: 60 },
  { id: 3, title: 'Kuis 1: Password Aman (FR-10)', progress: 20 },
];

export default async function TaskListFetcher() {
  await new Promise((r) => setTimeout(r, 800)); // delay dummy agar loading.tsx terlihat
  return (
    <table style={{ width: '100%', marginTop: 16, borderCollapse: 'collapse', background: '#1c1f2a', borderRadius: 12, overflow: 'hidden' }}>
      <thead>
        <tr style={{ textAlign: 'left', color: '#00f0ff', fontFamily: 'JetBrains Mono, monospace' }}>
          <th style={{ padding: 12 }}>ID</th>
          <th style={{ padding: 12 }}>Tugas (FR-04/FR-10)</th>
          <th style={{ padding: 12 }}>Progres</th>
        </tr>
      </thead>
      <tbody>
        {TASKS.map((t) => (
          <tr key={t.id} style={{ borderTop: '1px solid #262a35' }}>
            <td style={{ padding: 12 }}>{t.id}</td>
            <td style={{ padding: 12 }}>{t.title}</td>
            <td style={{ padding: 12, color: '#6ffbbe' }}>{t.progress}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
