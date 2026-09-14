import { useEffect, useState } from 'react';

export default function TaskTable() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const r = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
        if (!r.ok) throw new Error('HTTP ' + r.status);
        const j = await r.json();
        // Petakan ke struktur task SRS: id, title (materi FR-03), status (simulator FR-04), skor (kuis FR-10)
        if (alive) setRows(j.map((t) => ({
          id: t.id,
          materi: t.title,
          simulator: t.id % 2 ? 'Phishing (FR-04)' : 'Brute Force (FR-04)',
          kuis: t.completed ? 'Lulus (FR-10)' : 'Belum (FR-10)',
        })));
      } catch (e) {
        if (alive) setError('Gagal memuat data dummy: ' + e.message);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  return (
    <section className="card">
      <h2>Data Table <small>FR-04 · FR-10</small></h2>
      {loading && <p className="muted">Memuat data dummy…</p>}
      {error && <p className="err-text" role="alert">{error}</p>}
      {!loading && !error && (
        <table className="tbl">
          <thead><tr><th>ID</th><th>Materi</th><th>Simulator</th><th>Kuis</th></tr></thead>
          <tbody>{rows.map((r) => (
            <tr key={r.id}><td>{r.id}</td><td>{r.materi}</td><td>{r.simulator}</td><td>{r.kuis}</td></tr>
          ))}</tbody>
        </table>
      )}
    </section>
  );
}
