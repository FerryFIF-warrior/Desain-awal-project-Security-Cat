import { z } from 'zod';

// Bentuk mentah JSONPlaceholder /todos (data DUMMY untuk tugas).
export const TaskSchema = z.object({
  completed: z.boolean(),
  id: z.number().int(),
  title: z.string(),
  userId: z.number().int(),
});

export type Task = z.infer<typeof TaskSchema>;

export const CreateTaskSchema = z.object({
  completed: z.boolean(),
  title: z.string().min(1, 'Judul wajib diisi'),
  userId: z.number().int(),
});

export type CreateTaskInput = z.infer<typeof CreateTaskSchema>;
