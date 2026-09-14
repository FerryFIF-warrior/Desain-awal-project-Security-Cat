# Matriks Pemisahan State — Modul 7 (SecurityCat)

Aturan tegas: **data API TIDAK BOLEH di Zustand**, hanya di TanStack Query.
Zustand = state UI sinkron milik klien. TanStack Query = state server asinkron (cache + revalidasi).

| Variabel state | Pemilik | Alasan |
|---|---|---|
| `isSidebarOpen` | Zustand (`useUIStore`) | UI lokal sinkron, tidak dari server, tidak perlu cache/retry |
| `selectedCategory` (`semua`/`aktif`/`selesai`) | Zustand (`useUIStore`) | Filter tampilan milik klien; server tetap sumber data mentah |
| `themeMode` (`dark`/`light`) | Zustand (`useUIStore`) | Preferensi tampilan lokal, sinkron, tanpa fetch |
| `title` input form tambah | `useState` lokal komponen | State ephemeral form; naik ke Zustand hanya jika dipakai lintas komponen |
| Daftar tugas (`Task[]`) | TanStack Query (`useTasksQuery`, key `['tasks']`) | Data API asinkron: butuh `staleTime` 5 mnt, `gcTime` 15 mnt, loading/error/retry, invalidasi |
| Mutasi tambah tugas | TanStack Query (`useCreateTaskMutation` + `invalidateQueries(['tasks'])`) | Mutasi server: butuh status pending/error + revalidasi cache, bukan set manual ke store |
| Status fetch (`isLoading`, `isError`, `error`, `refetch`) | TanStack Query (return `useQuery`) | Turunan dari cache query; menduplikasinya ke Zustand bikin sumber ganda |

## Anti-pola yang dihindari
- Menyimpan hasil `fetchTasks()` di Zustand → sumber ganda, cache basi, tanpa dedup/retry.
- `setTasks()` manual setelah POST → diganti `invalidateQueries` agar server tetap sumber benar.
- Selector `useUIStore(s => s)` utuh → diganti selector per-field agar re-render presisi.
