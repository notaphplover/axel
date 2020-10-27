import { PerformTasksResult, TaskGraph } from "./TaskGraph";
import { TaskGraphNode } from "./TaskGraphNode";

interface TaskGraphNodeWithDependencies<TId> {
  node: TaskGraphNode<TId, unknown>;
  dependencies: Set<TId>;
};

interface TaskGraphNodeSchedulingState<TId> {
  nodesByDependentNodeMap: Map<TId, TaskGraphNodeWithDependencies<TId>[]>;
  nodesWithNoDependency: TaskGraphNodeWithDependencies<TId>[];
}

export class QueueBasedTaskGraph<TId> implements TaskGraph<TId> {
  protected readonly taskGraphNodesMap: Map<TId, TaskGraphNode<TId, unknown>>;

  constructor(taskGraphNodes: Iterable<TaskGraphNode<TId, unknown>>) {
    this.taskGraphNodesMap = new Map<TId, TaskGraphNode<TId, unknown>>();

    for (const taskGraphNode of taskGraphNodes) {
      this.taskGraphNodesMap.set(taskGraphNode.id, taskGraphNode);
    }
  }

  public getNode<TOutput>(id: TId): TaskGraphNode<TId, TOutput> | undefined {
    return this.taskGraphNodesMap.get(id) as TaskGraphNode<TId, TOutput> | undefined;
  }

  public async performTasks(): Promise<PerformTasksResult> {
    const tasksSchedule: TaskGraphNode<TId, unknown>[][] = this.buildTasksSchedule();

    try {
      await this.processTaskSchedule(tasksSchedule);
      return {
        success: true,
      }
    } catch (err) {
      return {
        success: false,
      }
    }
  }

  private buildInitialTaskGraphNodeSchedulingState(): TaskGraphNodeSchedulingState<TId> {
    const nodesByDependentNodeMap: Map<TId, TaskGraphNodeWithDependencies<TId>[]> = new Map<TId, TaskGraphNodeWithDependencies<TId>[]>();
    const nodesWithNoDependency: TaskGraphNodeWithDependencies<TId>[] = [];

    for (const taskGraphNode of this.taskGraphNodesMap.values()) {
      const taskGraphNodeWithDependencies: TaskGraphNodeWithDependencies<TId> = {
        node: taskGraphNode,
        dependencies: new Set(taskGraphNode.dependsOn),
      };

      if (taskGraphNodeWithDependencies.dependencies.size === 0) {
        nodesWithNoDependency.push(taskGraphNodeWithDependencies);
      } else {
        for (const taskGraphNodeDependency of taskGraphNodeWithDependencies.dependencies) {
          let nodesByDependentNode: TaskGraphNodeWithDependencies<TId>[] | undefined = nodesByDependentNodeMap.get(taskGraphNodeDependency);

          if (nodesByDependentNode === undefined) {
            nodesByDependentNode = [];
            nodesByDependentNodeMap.set(taskGraphNodeDependency, nodesByDependentNode);
          }

          nodesByDependentNode.push(taskGraphNodeWithDependencies);
        }
      }
    }

    return {
      nodesByDependentNodeMap,
      nodesWithNoDependency,
    };
  }

  private async processTaskSchedule(tasksSchedule: TaskGraphNode<TId, unknown>[][]): Promise<void> {
    if (tasksSchedule.length === 0) {
      return;
    }

    const tasksPerformPromiseMap: Map<TId, Promise<void>> = new Map<TId, Promise<void>>();

    for (const tasks of tasksSchedule) {
      for (const task of tasks) {
        const taskDependencies: Promise<void>[] = [];
        for (const dependentTaskId of task.dependsOn) {
          taskDependencies.push(tasksPerformPromiseMap.get(dependentTaskId) as Promise<void>);
        }

        const performTaskPromise: Promise<void> = (async(): Promise<void> => {
          await Promise.all(taskDependencies);
          await task.perform();
        })();

        tasksPerformPromiseMap.set(task.id, performTaskPromise);
      }
    }

    const lastTaskBatch: TaskGraphNode<TId, unknown>[] = tasksSchedule[tasksSchedule.length - 1];
    const lastTaskBatchCompletedPromise: Promise<void[]> = Promise.all(lastTaskBatch.map(
      async (task: TaskGraphNode<TId, unknown>): Promise<void> => tasksPerformPromiseMap.get(task.id) as Promise<void>),
    );

    await lastTaskBatchCompletedPromise;
  }

  private transformTaskGraphNodeSchedulingState(taskGraphNodeSchedulingState: TaskGraphNodeSchedulingState<TId>): void {
    const newNodesWithNoDependency: TaskGraphNodeWithDependencies<TId>[] = [];

    for (const nodeWithDependencies of taskGraphNodeSchedulingState.nodesWithNoDependency) {
      const dependentNodes: TaskGraphNodeWithDependencies<TId>[] | undefined = taskGraphNodeSchedulingState.nodesByDependentNodeMap.get(nodeWithDependencies.node.id);

      if (dependentNodes !== undefined) {
        for (const dependentNode of dependentNodes) {
          dependentNode.dependencies.delete(nodeWithDependencies.node.id);
          if (dependentNode.dependencies.size === 0) {
            newNodesWithNoDependency.push(dependentNode);
          }
        }

        taskGraphNodeSchedulingState.nodesByDependentNodeMap.delete(nodeWithDependencies.node.id);
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
        throw new Error('The task graph provided has circular dependencies, no task will be performed.');
      }

      const nodesWithNoDependency: TaskGraphNode<TId, unknown>[] = taskGraphNodeSchedulingState.nodesWithNoDependency.map((nodeWithDependency: TaskGraphNodeWithDependencies<TId>) => nodeWithDependency.node);

      tasksSchedule.push(nodesWithNoDependency);

      scheduledTasks += nodesWithNoDependency.length;

      this.transformTaskGraphNodeSchedulingState(taskGraphNodeSchedulingState);
    }

    return tasksSchedule;
  }
}
