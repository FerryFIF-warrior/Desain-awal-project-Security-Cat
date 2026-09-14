import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import TaskDashboard from './components/TaskDashboard';
import './index.css';

const queryClient = new QueryClient();

const el = document.getElementById('root');
if (el === null) throw new Error('#root tidak ditemukan');

createRoot(el).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <TaskDashboard />
    </QueryClientProvider>
  </StrictMode>,
);
