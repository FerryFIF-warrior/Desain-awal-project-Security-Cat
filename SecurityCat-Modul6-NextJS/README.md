# SecurityCat Modul 6 — Meta Framework (Next.js 15 App Router)

Tugas Modul 6: wajib Next.js dengan React Server Component, routing App Router,
`loading.tsx`/`error.tsx`, dan middleware proteksi `/dashboard/*` via cookie
`uns_session`.

## Prasyarat

- Node.js LTS (cek: `node -v`)
- Semua perintah dari folder ini (punya `package.json` sendiri).

## Menjalankan

```bash
npm install   # sekali saja / setelah pull baru
npm run dev   # dev server, buka URL yang ditampilkan (biasanya http://localhost:3000)
npm run build # build produksi (output .next/, tidak di-push)
npm run start # jalankan hasil build
```

## Isi

- `app/layout.tsx`, `app/page.tsx` — shell + landing
- `app/login/page.tsx` — login
- `app/dashboard/` — `layout.tsx`, `loading.tsx`, `error.tsx`, `page.tsx`, `analytics/page.tsx`
- `components/TaskListFetcher.tsx`, `components/TaskFormClient.tsx`
- `middleware.ts` — redirect `/dashboard/*` ke `/login?auth_error=1` bila tanpa cookie
- `docs/Matriks-SRS-Modul-6.md`
