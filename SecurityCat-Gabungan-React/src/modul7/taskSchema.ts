import { z } from "zod";

// Asli dari Modul 7: src/types/task.ts (tipe TS dihapus, skema Zod sama).
export const TaskSchema = z.object({
  completed: z.boolean(),
  id: z.number().int(),
  title: z.string(),
  userId: z.number().int(),
});

export const CreateTaskSchema = z.object({
  completed: z.boolean(),
  title: z.string().min(1, "Judul wajib diisi"),
  userId: z.number().int(),
});

export type Task = z.infer<typeof TaskSchema>;
export type CreateTaskInput = z.infer<typeof CreateTaskSchema>;
