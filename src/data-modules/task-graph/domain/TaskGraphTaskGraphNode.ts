import { BaseTaskGraphNode } from './BaseTaskGraphNode';
import { PerformTasksResult, TaskGraph } from './TaskGraph';

export class TaskGraphTaskGraphNode<TId> extends BaseTaskGraphNode<TId, void> {
  constructor(
    private readonly graph: TaskGraph<TId>,
    public readonly dependsOn: Iterable<TId>,
    public readonly id: TId,
  ) {
    super(dependsOn, id);
  }

  protected async innerPerform(): Promise<void> {
    const result: PerformTasksResult = await this.graph.performTasks();

    if (!result.success) {
      throw new Error(result.error);
    }
  }
}
