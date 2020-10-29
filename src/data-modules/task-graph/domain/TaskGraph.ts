import { TaskGraphNode } from './TaskGraphNode';

export type PerformTasksResult =
  | PerformTasksFailureResult
  | PerformTasksSuccessResult;

export interface PerformTasksFailureResult {
  error: string;
  success: false;
}

export interface PerformTasksSuccessResult {
  success: true;
}

export interface TaskGraph<TId> {
  getNode<TOutput>(id: TId): TaskGraphNode<TId, TOutput> | undefined;
  performTasks(): Promise<PerformTasksResult>;
}
