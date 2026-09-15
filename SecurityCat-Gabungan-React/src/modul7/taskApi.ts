import { z } from "zod";
import { type CreateTaskInput, CreateTaskSchema, type Task, TaskSchema } from "./taskSchema";

// Re-export tipe agar hook bisa import dari satu pintu (taskApi).
export type { CreateTaskInput, Task };

// Asli dari Modul 7: src/services/taskApi.ts
const BASE = "https://jsonplaceholder.typicode.com/todos";

function toError(res: Response): Error {
  return new Error(`Gagal memuat (${String(res.status)})`);
}

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(`${BASE}?_limit=20`);
  if (!res.ok) throw toError(res);
  const json: unknown = await res.json();
  return z.array(TaskSchema).parse(json);
}

export async function createTask(input: CreateTaskInput): Promise<Task> {
  const body = CreateTaskSchema.parse(input);
  const res = await fetch(BASE, {
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });
  if (!res.ok) throw toError(res);
  const json: unknown = await res.json();
  return TaskSchema.parse(json);
}
