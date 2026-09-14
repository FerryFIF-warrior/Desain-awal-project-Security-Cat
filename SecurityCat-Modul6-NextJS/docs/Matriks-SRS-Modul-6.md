# Matriks SRS — Modul 6 (Next.js App Router)

Proyek: Security Cat / CyberAttack Simulator Edu (UNS Vokasi D3 TI Madiun).
Semua data/simulasi DUMMY, tanpa kode serangan nyata.
FR: FR-02 dashboard progres, FR-03 course/modul materi, FR-04–07 simulator, FR-10 quiz, FR-12 gamifikasi, FR-14 difficulty.

| # | Komponen arsitektur | File | FR terkait |
|---|---|---|---|
| a | Root layout + metadata statis + font | `app/layout.tsx` | FR-02, FR-03 |
| b | Halaman + nested layout + loading/streaming + error boundary | `app/page.tsx`, `app/dashboard/layout.tsx`, `app/dashboard/loading.tsx`, `app/dashboard/error.tsx`, `app/dashboard/page.tsx` | FR-02 |
| c | Server Component async + Suspense (RSC) | `app/dashboard/page.tsx`, `components/TaskListFetcher.tsx` | FR-04/FR-10 |
| d | Client Component + validasi (Zod) | `components/TaskFormClient.tsx` | FR-03, FR-14 |
| e | Metadata dinamis (generateMetadata) | `app/dashboard/analytics/page.tsx` | FR-02, FR-12 |
| f | Middleware proteksi rute (cookie) | `middleware.ts` | FR-02 |
| g | Form login dummy | `app/login/page.tsx` | FR-02 |
