import { Capsule } from '../../../common/domain';

export enum TaskGraphNodeStatus {
  Ended,
  Error,
  InProgress,
  NotStarted,
}

export interface TaskGraphNode<TId, TOutput> {
  readonly dependsOn: Iterable<TId>;
  readonly id: TId;
  readonly status: TaskGraphNodeStatus;

  getOutput(): Capsule<TOutput> | null;
  perform(): Promise<void>;
}
