# Matriks SRS vs Front-End — Modul 3-4 (Strict TS + Zod + CVA)

Proyek: Security Cat. Folder: `C:/laragon/www/Desain-Awal-Project-Security-Cat`
`tsconfig`: `strict: true`, `noUncheckedIndexedAccess: true`, tanpa `any` (terverifikasi `tsc --noEmit`, exit 0).

| Syarat Modul 3-4 | File | Bukti |
|---|---|---|
| 3 komponen CVA ownership | `src/components/badge.ts`, `button.ts`, `card.ts` | `cva()` + varian + defaultVariants |
| Strict TS + branded types | `src/schemas/taskSchema.ts`, `tsconfig.json` | `TaskId`, `CourseId`, tanpa `any` |
| Discriminated unions | `src/schemas/taskSchema.ts` | `FetchTasksState`: idle/loading/success/error |
| Zod runtime + z.infer | `src/schemas/taskSchema.ts`, `src/services/apiService.ts` | `CreateTaskSchema.parse`, `TaskSchema.parse`, `z.infer` |
| Async + event delegation | `src/app.ts` | `async/await try/catch`, delegation `data-info` |
| Halaman demo | `tugas-typesafe.html` | Form `taskForm34` + list `taskList34`, bundle `assets/dist-modul34/app.js` |

| ID SRS | File TS |
|---|---|
| FR-02 dashboard | `src/app.ts` (`renderUI`, `loadTasks`) |
| FR-03 form entry | `CreateTaskSchema` + `createTaskApi` |
| FR-04/FR-10 tabel | `TaskSchema`, `fetchTasksApi` |
| FR-12/FR-14 | `renderBadge` + field `priority`/`dueDate` |

Build demo: `esbuild src/app.ts --bundle --format=esm --platform=browser --outfile=assets/dist-modul34/app.js` (sukses, ~806 KB dev bundle, belum minify).
