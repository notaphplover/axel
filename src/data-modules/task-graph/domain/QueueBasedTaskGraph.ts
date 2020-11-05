import { PerformTasksResult, TaskGraph } from './TaskGraph';
import { TaskGraphNode, TaskGraphNodeStatus } from './TaskGraphNode';

interface TaskGraphNodeWithDependencies<TId> {
  node: TaskGraphNode<TId, unknown>;
  dependencies: Set<TId>;
}

interface TaskGraphNodeSchedulingState<TId> {
  nodesByDependentNodeMap: Map<TId, TaskGraphNodeWithDependencies<TId>[]>;
  nodesWithNoDependency: TaskGraphNodeWithDependencies<TId>[];
}

export class QueueBasedTaskGraph<TId> implements TaskGraph<TId> {
  protected readonly taskGraphNodesMap: Map<TId, TaskGraphNode<TId, unknown>>;

  constructor(
    taskGraphNodes?: Iterable<TaskGraphNode<TId, unknown>> | undefined,
  ) {
    this.taskGraphNodesMap = new Map<TId, TaskGraphNode<TId, unknown>>();

    if (taskGraphNodes !== undefined) {
      this.addTasks(taskGraphNodes);
    }
  }

  public getNode<TOutput>(id: TId): TaskGraphNode<TId, TOutput> | undefined {
    return this.taskGraphNodesMap.get(id) as
      | TaskGraphNode<TId, TOutput>
      | undefined;
  }

  public async performTasks(): Promise<PerformTasksResult> {
    try {
      const tasksSchedule: TaskGraphNode<
        TId,
        unknown
      >[][] = this.buildTasksSchedule();

      await this.processTaskSchedule(tasksSchedule);

      return {
        success: true,
      };
    } catch (err) {
      return {
        error: (err as Error).message,
        success: false,
      };
    }
  }

  public addTasks(taskGraphNodes: Iterable<TaskGraphNode<TId, unknown>>): void {
    for (const taskGraphNode of taskGraphNodes) {
      this.taskGraphNodesMap.set(taskGraphNode.id, taskGraphNode);
    }
  }

  private buildInitialTaskGraphNodeSchedulingState(): TaskGraphNodeSchedulingState<
    TId
  > {
    const nodesByDependentNodeMap: Map<
      TId,
      TaskGraphNodeWithDependencies<TId>[]
    > = new Map<TId, TaskGraphNodeWithDependencies<TId>[]>();
    const nodesWithNoDependency: TaskGraphNodeWithDependencies<TId>[] = [];

    for (const taskGraphNode of this.taskGraphNodesMap.values()) {
      const taskGraphNodeWithDependencies: TaskGraphNodeWithDependencies<TId> = {
        node: taskGraphNode,
        dependencies: new Set(taskGraphNode.dependsOn),
      };

      switch (taskGraphNode.status) {
        case TaskGraphNodeStatus.NotStarted:
          if (taskGraphNodeWithDependencies.dependencies.size === 0) {
            nodesWithNoDependency.push(taskGraphNodeWithDependencies);
          } else {
            for (const taskGraphNodeDependency of taskGraphNodeWithDependencies.dependencies) {
              let nodesByDependentNode:
                | TaskGraphNodeWithDependencies<TId>[]
                | undefined = nodesByDependentNodeMap.get(
                taskGraphNodeDependency,
              );

              if (nodesByDependentNode === undefined) {
                nodesByDependentNode = [];
                nodesByDependentNodeMap.set(
                  taskGraphNodeDependency,
                  nodesByDependentNode,
                );
              }

              nodesByDependentNode.push(taskGraphNodeWithDependencies);
            }
          }
          break;
        case TaskGraphNodeStatus.InProgress:
        case TaskGraphNodeStatus.Ended:
          nodesWithNoDependency.push(taskGraphNodeWithDependencies);
          break;
        case TaskGraphNodeStatus.Error:
          throw new Error(
            'A task is initially in an error state, no tasks will be accomplished',
          );
      }
    }

    return {
      nodesByDependentNodeMap,
      nodesWithNoDependency,
    };
  }

  private async processTaskSchedule(
    tasksSchedule: TaskGraphNode<TId, unknown>[][],
  ): Promise<void> {
    if (tasksSchedule.length === 0) {
      return;
    }

    const tasksPerformPromiseMap: Map<TId, Promise<void>> = new Map<
      TId,
      Promise<void>
    >();

    for (const tasks of tasksSchedule) {
      for (const task of tasks) {
        const taskDependencies: Promise<void>[] = [];
        for (const dependentTaskId of task.dependsOn) {
          taskDependencies.push(
            tasksPerformPromiseMap.get(dependentTaskId) as Promise<void>,
          );
        }

        const performTaskPromise: Promise<void> = (async (): Promise<void> => {
          await Promise.all(taskDependencies);
          await task.perform();

          switch (task.status) {
            case TaskGraphNodeStatus.Ended:
              return;
            case TaskGraphNodeStatus.Error:
              throw new Error('Task failed');
            case TaskGraphNodeStatus.NotStarted:
            case TaskGraphNodeStatus.InProgress:
              throw new Error(
                'Unexpected status: expected task to be ended or in error',
              );
          }
        })();

        tasksPerformPromiseMap.set(task.id, performTaskPromise);
      }
    }

    const lastTaskBatch: TaskGraphNode<TId, unknown>[] =
      tasksSchedule[tasksSchedule.length - 1];
    const lastTaskBatchCompletedPromise: Promise<void[]> = Promise.all(
      lastTaskBatch.map(
        async (task: TaskGraphNode<TId, unknown>): Promise<void> =>
          tasksPerformPromiseMap.get(task.id) as Promise<void>,
      ),
    );

    await lastTaskBatchCompletedPromise;
  }

  private transformTaskGraphNodeSchedulingState(
    taskGraphNodeSchedulingState: TaskGraphNodeSchedulingState<TId>,
  ): void {
    const newNodesWithNoDependency: TaskGraphNodeWithDependencies<TId>[] = [];

    for (const nodeWithDependencies of taskGraphNodeSchedulingState.nodesWithNoDependency) {
      const dependentNodes:
        | TaskGraphNodeWithDependencies<TId>[]
        | undefined = taskGraphNodeSchedulingState.nodesByDependentNodeMap.get(
        nodeWithDependencies.node.id,
      );

      if (dependentNodes !== undefined) {
        for (const dependentNode of dependentNodes) {
          dependentNode.dependencies.delete(nodeWithDependencies.node.id);
          if (dependentNode.dependencies.size === 0) {
            newNodesWithNoDependency.push(dependentNode);
          }
        }

        taskGraphNodeSchedulingState.nodesByDependentNodeMap.delete(
          nodeWithDependencies.node.id,
        );
      }
    }

    taskGraphNodeSchedulingState.nodesWithNoDependency = newNodesWithNoDependency;
  }

  private buildTasksSchedule(): TaskGraphNode<TId, unknown>[][] {
    const taskGraphNodeSchedulingState: TaskGraphNodeSchedulingState<TId> = this.buildInitialTaskGraphNodeSchedulingState();

    const tasksSchedule: TaskGraphNode<TId, unknown>[][] = [];

    let scheduledTasks: number = 0;

    while (scheduledTasks < this.taskGraphNodesMap.size) {
      if (taskGraphNodeSchedulingState.nodesWithNoDependency.length === 0) {
        throw new Error(
          'The task graph provided has circular dependencies, no task will be performed.',
        );
      }

      const nodesWithNoDependency: TaskGraphNode<
        TId,
        unknown
      >[] = taskGraphNodeSchedulingState.nodesWithNoDependency.map(
        (nodeWithDependency: TaskGraphNodeWithDependencies<TId>) =>
          nodeWithDependency.node,
      );

      tasksSchedule.push(nodesWithNoDependency);

      scheduledTasks += nodesWithNoDependency.length;

      this.transformTaskGraphNodeSchedulingState(taskGraphNodeSchedulingState);
    }

    return tasksSchedule;
  }
}
