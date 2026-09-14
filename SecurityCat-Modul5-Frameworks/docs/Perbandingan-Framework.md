# Perbandingan Framework — React 19 vs Vue 3 vs Svelte 5

| Aspek | React 19 | Vue 3 | Svelte 5 |
|---|---|---|---|
| Reaktivitas | `useState`, Actions/hooks; Compiler auto-memoize | `ref`/`reactive` + Proxy, computed | Runes (`$state`, `$derived`), sinyal fine-grained |
| Render engine | Virtual DOM + Fiber, RSC/SSR | Virtual DOM + compiler-optimized blocks | Tanpa VDOM, DOM update terkompilasi |
| Bundle (kasar) | react+react-dom ±140 KB mentah (±45 KB gzip); Vite build modul ini jauh lebih kecil karena tanpa Tailwind | runtime ±100 KB, lebih kecil bila compiler-only | Paling kecil, runtime nyaris nol |
| Kapan pilih | Ekosistem besar, tim sudah React, butuh RSC/Next.js | Butuh cepat produktif, SFC rapi, kurva landai | Bundle minimal, performa tinggi, tim kecil |

Pilihan Modul 5: **React 19** — sesuai brief tugas; Compiler hilangkan `useMemo` manual; Vite build cepat; cukup untuk Dashboard/Form/Table dummy.
