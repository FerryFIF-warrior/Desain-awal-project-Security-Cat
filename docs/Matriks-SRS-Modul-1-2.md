# Matriks Alignment SRS vs Front-End — Modul 1-2

Proyek: Security Cat / CyberAttack Simulator Edu (UNS Vokasi D3 TI Madiun).
File: `C:/laragon/www/Desain-Awal-Project-Security-Cat`

| ID SRS | Kebutuhan | File front-end | Bukti |
|---|---|---|---|
| FR-02 | Dashboard progress | `tugas-dashboard.html`, `assets/tasks-store.js` | `stat-total`, `task-count` + `aria-live`, toggle status |
| FR-03 | Course/module (form entry) | `tugas-form.html`, `assets/tasks-store.js` | `task-form`, validasi min 3 + `role=alert`, simpan localStorage |
| FR-04–FR-07 | Simulator | `tugas-list.html` (kolom dummy), Modul 5 `TaskTable.jsx` | Data dummy jsonplaceholder dipetakan ke struktur SRS |
| FR-09 | Security log | `tugas-dashboard.html` (`status-feedback`) | `role=status aria-live` read-only |
| FR-10 | Quiz | `tugas-list.html` + Modul 5 | Kolom status Lulus/Belum dummy |
| FR-12 | Gamifikasi XP/badge | `tugas-dashboard.html`, `assets/ui.js` | `badgeClass`, XP = task selesai |
| FR-14 | Difficulty | `tugas-form.html` (`task-difficulty`) | Beginner/Intermediate/Advanced |
| NFR usability | Semantik + ARIA + responsif | Ketiga page | header/nav/main/section/aside/footer, Tailwind v4 grid, keyboard OK |

CVA ownership: `assets/ui.js` (`buttonClass`, `badgeClass`, `cardClass`) — tanpa NPM.
Async: `fetchMockTasks()` + loading/error di dashboard + list.
