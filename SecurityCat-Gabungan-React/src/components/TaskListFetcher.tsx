interface StaticTask {
  id: number;
  title: string;
  progress: number;
}

// Asli dari Modul 6: components/TaskListFetcher.tsx (data statis, tanpa fetch).
const TASKS: StaticTask[] = [
  { id: 1, title: "Modul 1: Pengenalan Phishing (FR-03)", progress: 100 },
  { id: 2, title: "Simulator 1: Jejak Digital (FR-04)", progress: 60 },
  { id: 3, title: "Kuis 1: Password Aman (FR-10)", progress: 20 },
];

export default function TaskListFetcher(): React.JSX.Element {
  return (
    <table className="tbl">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tugas (FR-04/FR-10)</th>
          <th>Progres</th>
        </tr>
      </thead>
      <tbody>
        {TASKS.map((t) => (
          <tr key={t.id}>
            <td>{t.id}</td>
            <td>{t.title}</td>
            <td className="green">{t.progress}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
