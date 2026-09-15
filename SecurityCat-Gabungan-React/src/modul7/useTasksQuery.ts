import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type CreateTaskInput, createTask, fetchTasks, type Task } from "./taskApi";

// Asli dari Modul 7: src/hooks/useTasksQuery.ts
export const TASK_QUERY_KEY = ["tasks"] as const;

export function useTasksQuery() {
  return useQuery<Task[], Error>({
    gcTime: 15 * 60 * 1000,
    queryFn: fetchTasks,
    queryKey: TASK_QUERY_KEY,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateTaskMutation() {
  const qc = useQueryClient();
  return useMutation<Task, Error, CreateTaskInput>({
    mutationFn: createTask,
    onSuccess: (created) => {
      // JSONPlaceholder fake: POST tidak tersimpan di server, jadi selipkan
      // item baru ke cache agar langsung tampil paling atas tanpa refetch.
      qc.setQueryData<Task[]>(TASK_QUERY_KEY, (old) =>
        Array.isArray(old) ? [created, ...old] : [created],
      );
    },
  });
}
