# Matriks SRS — Modul 5 (React 19)

| ID SRS | Kebutuhan | File komponen | Bukti implementasi |
|---|---|---|---|
| FR-02 | Dashboard progress | `src/components/TaskDashboardReact19.jsx`, `src/App.jsx` | `doneCount/tasks.length`, progress + XP |
| FR-03 | Course/module materi (form entry) | `src/components/TaskForm.jsx`, `TaskDashboardReact19.handleAddTask` | `handleAddTask`, validasi input kosong + feedback `role=alert` |
| FR-04–FR-07 | Simulator (phishing/brute force/SQLi/auth) | `src/components/TaskTable.jsx` | Kolom simulator dummy (Phishing/Brute Force), data dummy jsonplaceholder |
| FR-10 | Quiz | `src/components/TaskTable.jsx` | Kolom kuis Lulus/Belum (dummy) |
| FR-12 | Gamifikasi XP/badge | `TaskDashboardReact19.jsx` | `xp` = sum XP task selesai |
| FR-14 | Difficulty | `TaskDashboardReact19.jsx` | Label difficulty Pemula |
| FR-09 | Security log | — (di luar skop Modul 5) | Tidak diimplementasi; saran: komponen log read-only berikutnya |

Catatan React 19: filter inline tanpa `useMemo` manual — React Compiler auto-memoize (lihat komentar di `TaskDashboardReact19.jsx`).
