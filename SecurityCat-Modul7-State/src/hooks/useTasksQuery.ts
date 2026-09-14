import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createTask, fetchTasks } from '../services/taskApi';

export const TASK_QUERY_KEY = ['tasks'] as const;

export function useTasksQuery() {
  return useQuery({
    gcTime: 15 * 60 * 1000,
    queryFn: fetchTasks,
    queryKey: TASK_QUERY_KEY,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateTaskMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: TASK_QUERY_KEY });
    },
  });
}
