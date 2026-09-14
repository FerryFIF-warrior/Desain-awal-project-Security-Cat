import { TaskSchema, type StudentTask, type CreateTaskInput, CreateTaskSchema } from "../schemas/taskSchema";

// Database simulasi sisi klien (dummy, bukan serangan nyata)
const taskDatabase: StudentTask[] = [
  {
    id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
    title: "Mengerjakan Modul 4 Front-End Engineering",
    courseName: "Pemrograman Web",
    priority: "HIGH",
    dueDate: "2026-09-15",
    isCompleted: false,
    createdAt: new Date().toISOString(),
  },
];

export async function fetchTasksApi(): Promise<StudentTask[]> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return taskDatabase.map((item) => TaskSchema.parse(item));
}

export async function createTaskApi(input: unknown): Promise<StudentTask> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const validatedInput: CreateTaskInput = CreateTaskSchema.parse(input);
  const newTask: StudentTask = {
    ...validatedInput,
    id: crypto.randomUUID(),
    isCompleted: false,
    createdAt: new Date().toISOString(),
  };
  taskDatabase.push(newTask);
  return newTask;
}
