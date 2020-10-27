import { TaskGraphNode } from './TaskGraphNode';

export interface PerformTasksResult {
  success: boolean;
}

export interface TaskGraph<TId> {
  getNode<TOutput>(id: TId): TaskGraphNode<TId, TOutput> | undefined;
  performTasks(): Promise<PerformTasksResult>;
}
