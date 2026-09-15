# SecurityCat Gabungan React — Modul 5 + 6 + 7 dalam satu framework Vite + React 19

Satu folder jalan (`npm run dev`, port 5175). Isi tiap modul diambil dari folder aslinya,
bukan ditulis ulang. Yang berubah hanya lapisan yang tidak bisa hidup di SPA Vite.

## Peta asal file

Modul 5 (dari `SecurityCat-Modul5-Frameworks`, JS asli, tanpa ubah logika):
- `src/modul5/TaskDashboardReact19.jsx` <- `src/components/TaskDashboardReact19.jsx`
- `src/modul5/TaskForm.jsx` <- `src/components/TaskForm.jsx`
- `src/modul5/TaskTable.jsx` <- `src/components/TaskTable.jsx`
- Demo: `src/pages/Modul5Page.jsx` (pengganti `src/App.jsx` lama)

Modul 6 (dari `SecurityCat-Modul6-NextJS`, pola Next -> padanan SPA):
- `app/layout.tsx` + `app/page.tsx` -> `src/pages/LandingPage.jsx`
- `app/login/page.tsx` -> `src/pages/LoginPage.jsx`
- `app/dashboard/layout.tsx` -> `src/components/DashboardLayout.jsx`
- `app/dashboard/page.tsx` + `TaskListFetcher` -> `src/pages/DashboardPage.jsx` + `src/components/TaskListFetcher.jsx`
- `app/dashboard/analytics/page.tsx` -> `src/pages/AnalyticsPage.jsx`
- `app/dashboard/loading.tsx` -> `DashboardSkeleton` (fallback `<Suspense>`)
- `app/dashboard/error.tsx` -> `src/components/ErrorBoundary.jsx`
- `middleware.ts` (cookie guard) -> `src/components/ProtectedRoute.jsx` + `src/lib/session.js`
- `generateMetadata` -> `src/lib/meta.js` (`useDocumentTitle`)
- `components/TaskFormClient.tsx` -> `src/components/TaskFormClient.jsx`

Modul 7 (dari `SecurityCat-Modul7-State`, TSX -> JSX, Zod + Query sama):
- `src/types/task.ts` -> `src/modul7/taskSchema.js`
- `src/services/taskApi.ts` -> `src/modul7/taskApi.js`
- `src/store/useUIStore.ts` -> `src/modul7/useUIStore.js`
- `src/hooks/useTasksQuery.ts` -> `src/modul7/useTasksQuery.js`
- `src/components/TaskDashboard.tsx` -> `src/modul7/TaskDashboard.jsx`
- Demo: `src/pages/Modul7Page.jsx`

## Yang tidak ikut pindah (alasan)

- RSC / SSR Next (Modul 6): tidak ada server di Vite; semua jadi client component.
- Cookie `uns_session` server: diganti `localStorage` sesi dummy.
- Tipe TypeScript: dihapus, validasi runtime Zod tetap jalan.
- `dist/`, `node_modules/`, `.next/`: build artifact, install ulang via `npm install`.

## Menjalankan

```bash
cd SecurityCat-Gabungan-React
npm install
npm run dev     # http://localhost:5175
npm run build
npm run preview
```

Rute: `/` landing, `/login`, `/dashboard` (guard), `/dashboard/analytics?range=7d|30d|90d`,
`/modul5`, `/modul7`.

## Catatan jujur buat dosen

Dokumen matriks SRS asli tiap modul tetap di folder masing-masing.
Folder ini showcase gabungan fungsi, bukan pengganti bukti arsitektur Modul 6 (RSC/middleware server)
dan Modul 7 (pemisahan state) — penilai modul tetap lihat folder asli.
