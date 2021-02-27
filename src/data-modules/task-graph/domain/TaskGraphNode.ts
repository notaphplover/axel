/**
 * Represents the status of a task node
 */
export enum TaskGraphNodeStatus {
  /**
   * The task is successfully accomplished with no errors.
   */
  Ended,
  /**
   * The task could not be accomplished due to some errors.
   */
  Error,
  /**
   * The task is being accomplished.
   */
  InProgress,
  /**
   * The task is not started.
   */
  NotStarted,
}

/**
 * Repreesnts a task node of a task graph
 */
export interface TaskGraphNode<TId, TOutput> {
  /**
   * Id of the tasks which must be completed before this task can be accomplished.
   */
  readonly dependsOn: Iterable<TId>;
  /**
   * Task id
   */
  readonly id: TId;
  /**
   * Task status
   */
  readonly status: TaskGraphNodeStatus;
  /**
   * Gets the task result.
   *
   * - If the status of this task is not Ended, this method must throw an Error.
   * - If the status of this task is Ended, this method must return the output of the task.
   */
  getOutput(): TOutput;
  /**
   * Performs the task.
   *
   * If the task is not started, starts the task.
   * If the task is started, returns a Promise of the task being accomplished without starting it again.
   *
   * This method should never throw an error.
   */
  perform(): Promise<void>;
}
