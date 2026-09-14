# SecurityCat Modul 7 — State Management (Zustand + TanStack Query)

Tugas Modul 7: pisahkan client state vs server state.
Client state: Zustand (`src/store/useUIStore.ts` — `isSidebarOpen`,
`selectedCategory`, `themeMode` + toggle/setter).
Server state: TanStack Query (`src/hooks/useTasksQuery.ts`, key `['tasks']`,
`staleTime` 5 menit, `gcTime` 15 menit + invalidate).

## Prasyarat

- Node.js LTS (cek: `node -v`)
- Semua perintah dari folder ini (punya `package.json` sendiri).

## Menjalankan

```bash
npm install     # sekali saja / setelah pull baru
npm run dev     # server dev, buka URL yang ditampilkan (biasanya http://localhost:5173)
npm run build   # tsc --noEmit + vite build -> folder dist/ (tidak di-push)
npm run preview # pratinjau hasil build
```

Fetch data contoh butuh internet (mock JSONPlaceholder).

## Isi

- `src/main.tsx`, `src/types/task.ts`
- `src/store/useUIStore.ts` — client state
- `src/services/taskApi.ts`, `src/hooks/useTasksQuery.ts` — server state
- `src/components/TaskDashboard.tsx`
- `docs/Matriks-Pemisahan-State.md`
