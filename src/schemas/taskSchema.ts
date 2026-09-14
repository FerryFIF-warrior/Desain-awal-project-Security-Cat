import { z } from "zod";

// Branded types untuk integritas domain (Modul 3-4)
type Brand<T, B> = T & { readonly __brand: B };
export type TaskId = Brand<string, "TaskId">;
export type CourseId = Brand<string, "CourseId">;

export const TaskPriorityEnum = z.enum(["LOW", "MEDIUM", "HIGH"]);

export const CreateTaskSchema = z.object({
  title: z.string().min(3, "Judul tugas minimal 3 karakter").max(80, "Judul maksimal 80 karakter"),
  courseName: z.string().min(2, "Nama mata kuliah wajib diisi"),
  priority: TaskPriorityEnum,
  dueDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Format tanggal tidak valid (YYYY-MM-DD)",
  }),
});

export const TaskSchema = CreateTaskSchema.extend({
  id: z.string().uuid(),
  isCompleted: z.boolean().default(false),
  createdAt: z.string().datetime(),
});

export type CreateTaskInput = z.infer<typeof CreateTaskSchema>;
export type StudentTask = z.infer<typeof TaskSchema>;

// Status async dengan Discriminated Unions (idle/loading/success/error)
export type FetchTasksState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: StudentTask[] }
  | { status: "error"; message: string };
